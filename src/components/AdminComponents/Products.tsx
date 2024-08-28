import { useState, useEffect } from "react";
import AddProductModal from "./modals/AddProductModal";
import { getProducts } from "@/pages/api/adminProducts";
import { ProductAdmin } from "@/interfaces/ProductData";
import EditProductModal from "./modals/EditProductModal";
import ConfirmDeleteModal from "./modals/DeleteProductModal";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const triggerUpdate = () => {
    setLoading(true);
    const fetchUpdatedProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao atualizar produtos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdatedProducts();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.nome_produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <input
          type="text"
          placeholder="Buscar produto por nome ou categoria "
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md bg-gray-200 text-black p-2 w-1/3"
        />
      </div>
      <div className="w-full  flex justify-end my-4">
        <AddProductModal triggerUpdate={triggerUpdate} />
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center p-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="mt-2 text-gray-500">Carregando produtos...</p>
          </div>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm font-medium text-gray-900">
                      {product.nome_produto}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm text-gray-500">
                      {product.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm text-gray-500">{`R$ ${parseFloat(
                      product.valor
                    )
                      .toFixed(2)
                      .replace(".", ",")}`}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <div className="flex space-x-4">
                      <EditProductModal
                        product={product}
                        triggerUpdate={triggerUpdate}
                      />
                      <ConfirmDeleteModal
                        productId={product.id}
                        productName={product.nome_produto}
                        triggerUpdate={triggerUpdate}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;