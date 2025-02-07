import React, { useState, useEffect } from "react";
import { ProductData } from "@/interfaces/ProductData";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { payment } from "./api/cartApi"; // API de pagamento
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductData[]>([]);
  const [billingType, setBillingType] = useState("PIX");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);

    if (!token) {
      window.location.href = "Login";
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const removeItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handlePayment = async () => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (!jwtToken) {
      toast.error("Usuário não autenticado!");
      return;
    }

    // Extrair o ID do usuário a partir do JWT
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
    const userId = decodedToken.usuario.id;

    // Preparar os dados do pagamento
    const data = {
      billingType,
      value: totalAmount,
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      description: "Pagamento de produtos",
      idProduto: cartItems.map((item) => item.id),
      idUsuario: userId,
    };

    // Salvar os dados do pagamento no sessionStorage
    sessionStorage.setItem(
      "paymentData",
      JSON.stringify({
        productIds: cartItems.map((item) => item.id),
        clientId: userId,
      })
    );

    try {
      const response = await payment(decodedToken.usuario.cpf, data);
      if (response && response.resultado && response.resultado.invoiceUrl) {
        // Abrir o link da fatura em uma nova aba
        window.open(response.resultado.invoiceUrl, "_blank");
      } else {
        toast.error("Erro ao obter o link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      toast.error("Erro ao processar o pagamento!");
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-8">Carrinho</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FiBookOpen className="text-blue-600 w-40 h-40 mb-8" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Seu carrinho está vazio!
          </h2>
          <p className="text-gray-500 text-center text-lg mt-2">
            Parece que você ainda não adicionou nenhum eBook ao seu carrinho.
          </p>
          <button
            onClick={() => router.push("/categories")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Explorar eBooks
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2">Produto</th>
                    <th className="py-2">Valor</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div className="ml-4">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              Código: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">R${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-4">
              <div className="border p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">
                  Escolha a sua forma de pagamento
                </h2>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="pix"
                      name="billingType"
                      value="PIX"
                      checked={billingType === "PIX"}
                      onChange={() => setBillingType("PIX")}
                      className="mr-2"
                    />
                    <label htmlFor="pix">Pagamento via PIX</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="creditCard"
                      name="billingType"
                      value="CREDIT_CARD"
                      checked={billingType === "CREDIT_CARD"}
                      onChange={() => setBillingType("CREDIT_CARD")}
                      className="mr-2"
                    />
                    <label htmlFor="creditCard">
                      Pagamento via Cartão de Crédito
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <p>Subtotal: R${totalAmount.toFixed(2)}</p>
                  <p className="font-semibold">
                    Total: R${totalAmount.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Pagar Agora
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
