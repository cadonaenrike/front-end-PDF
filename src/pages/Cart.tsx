import React, { useState, useEffect } from "react";
import { ProductData } from "@/interfaces/ProductData";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Pusher from "pusher-js";
import { payment, paymentOK } from "./api/cartApi";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductData[]>([]);
  const [billingType, setBillingType] = useState("PIX");
  const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
  }, []);

  // Função para conectar ao Pusher e escutar os eventos de pagamento confirmados
  const connectPusher = () => {
    console.log("Iniciando a conexão com o Pusher...");

    const pusher = new Pusher("24965af3729f79c3ae48", {
      cluster: "sa1",
    });

    // Verifica se a conexão está aberta
    pusher.connection.bind("connected", () => {
      console.log("Conectado ao Pusher com sucesso!");
    });

    // Captura qualquer erro durante a conexão
    pusher.connection.bind("error", (err: any) => {
      console.error("Erro na conexão com o Pusher:", err);
    });

    // Inscrever-se no canal 'payments-channel'
    const channel = pusher.subscribe("payments-channel");

    // Verifica se a inscrição no canal foi bem-sucedida
    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Inscrito com sucesso no canal payments-channel");
    });

    // Verifica se há erros na inscrição no canal
    channel.bind("pusher:subscription_error", (status: any) => {
      console.error("Erro na inscrição no canal payments-channel:", status);
    });

    // Ouvir o evento 'payment-confirmed'
    channel.bind("payment-confirmed", async (data: any) => {
      console.log("Evento payment-confirmed recebido:", data);

      // Enviar os IDs dos produtos para o backend
      const jwtToken = sessionStorage.getItem("jwt");
      if (!jwtToken) {
        alert("Usuário não autenticado!");
        return;
      }

      // Extrair o ID do usuário a partir do JWT
      const decodedToken = JSON.parse(atob(jwtToken.split(".")[1])); // Decodifica a parte útil do token JWT
      const userId = decodedToken.usuario.id;
      try {
        await paymentOK({
          productIds: cartItems.map((item) => item.id),
          clientId: userId,
          paymentId: data.paymentId,
        });

        // Atualize o status do pagamento com os dados recebidos
        setPaymentStatus("CONFIRMED");
        alert(
          `Pagamento confirmado! Cliente: ${data.clientId}, Pagamento: ${data.paymentId}, Valor: ${data.value}`
        );

        // Limpar o carrinho
        setCartItems([]);
        sessionStorage.removeItem("cart");
      } catch (error) {
        console.error("Erro ao enviar IDs dos produtos para o backend:", error);
      }
    });

    // Bind para qualquer problema de desconexão
    pusher.connection.bind("disconnected", () => {
      console.log("Pusher desconectado.");
    });
  };

  const removeItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePayment = async () => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (!jwtToken) {
      alert("Usuário não autenticado!");
      return;
    }

    // Extrair o ID do usuário a partir do JWT
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1])); // Decodifica a parte útil do token JWT
    const userId = decodedToken.usuario.id;

    // Preparar os dados do pagamento
    const data = {
      billingType,
      value: totalAmount,
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Um dia após a data atual
      description: "Pagamento de produtos",
      idProduto: cartItems.map((item) => item.id), // IDs dos produtos
      idUsuario: userId, // ID do usuário
    };

    try {
      const response = await payment(decodedToken.usuario.cpf, data);
      if (response && response.resultado && response.resultado.invoiceUrl) {
        // Abrir o link da fatura em uma nova aba
        window.open(response.resultado.invoiceUrl, "_blank");

        // Conecta ao Pusher para escutar a confirmação do pagamento
        connectPusher();
        console.log("Pagamento realizado com sucesso:", response);
      } else {
        alert("Erro ao obter o link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      alert("Erro ao processar o pagamento!");
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-8">Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
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
                  Escolha a sua forma de entrega
                </h2>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="email"
                      name="billingType"
                      value="PIX"
                      checked={billingType === "PIX"}
                      onChange={() => setBillingType("PIX")}
                      className="mr-2"
                    />
                    <label htmlFor="email">Pagamento via PIX</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="plataforma"
                      name="billingType"
                      value="CREDIT_CARD"
                      checked={billingType === "CREDIT_CARD"}
                      onChange={() => setBillingType("CREDIT_CARD")}
                      className="mr-2"
                    />
                    <label htmlFor="plataforma">
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

          {/* Exibe o status do pagamento */}
          <div className="mt-4">
            <p>Status do pagamento: {paymentStatus}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
