import { useState } from "react";
import { FaEdit, FaSpinner } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductAdmin } from "@/interfaces/ProductData";
import { updateProduct } from "@/pages/api/adminProducts";
import { toast } from "react-toastify";

interface EditProductModalProps {
  product: ProductAdmin;
  triggerUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  triggerUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nomeProduto, setNomeProduto] = useState(product.nome_produto);
  const [descricao, setDescricao] = useState(product.descricao);
  const [categoria, setCategoria] = useState(product.categoria);
  const [nivelEnsino, setNivelEnsino] = useState(product.nivel_ensino);
  const [valor, setValor] = useState(
    `R$ ${parseFloat(product.valor).toFixed(2).replace(".", ",")}`
  );
  const [componenteCurricular, setComponenteCurricular] = useState(
    product.componente_curricular
  );
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fotoFiles, setFotoFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const categorias = [
    "Novo Ensino Médio",
    "Alfabetização",
    "Arte",
    "Biologia",
    "Ciências",
    "Datas comemorativas e Apostila das cores",
    "Educação Física",
    "Ensino Religioso",
    "Filosofia",
    "Física",
    "Geografia",
    "História",
    "Humanidade e Ciências Sociais",
    "Inglês",
    "Língua Portuguesa",
    "Matemática",
    "Metodologia Ativas",
    "Projeto de vida",
    "Química",
    "Sociologia",
  ];

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(e.target.files ? e.target.files[0] : null);
  };

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFotoFiles(e.target.files);
  };

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, ""); // Remove tudo que não for dígito
    const formattedValue = (Number(cleanValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatCurrency(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nome_produto", nomeProduto);
    formData.append("descricao", descricao);
    formData.append("categoria", categoria);
    formData.append("nivel_ensino", nivelEnsino);
    formData.append("valor", valor.replace("R$", "").trim());
    formData.append("componente_curricular", componenteCurricular);

    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    if (fotoFiles) {
      Array.from(fotoFiles).forEach((file) => {
        formData.append("fotos", file);
      });
    }

    try {
      await updateProduct(product.id, formData);
      toast.success("Produto atualizado com sucesso!");
      triggerUpdate();
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Erro ao atualizar produto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-800 hover:text-gray-400"
        >
          <FaEdit />
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Produto
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para editar o produto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="nomeProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Produto
            </label>
            <input
              type="text"
              id="nomeProduto"
              name="nomeProduto"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="valor"
              className="block text-sm font-medium text-gray-700"
            >
              Valor
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              value={valor}
              onChange={handleValorChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="uploadProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Upload do produto (PDF)
            </label>
            <input
              type="file"
              id="uploadProduto"
              name="uploadProduto"
              onChange={handlePdfChange}
              accept="application/pdf"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="componenteCurricular"
              className="block text-sm font-medium text-gray-700"
            >
              Componente Curricular
            </label>
            <input
              type="text"
              id="componenteCurricular"
              name="componenteCurricular"
              value={componenteCurricular}
              onChange={(e) => setComponenteCurricular(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nivelEnsino"
              className="block text-sm font-medium text-gray-700"
            >
              Nível de Ensino
            </label>
            <select
              id="nivelEnsino"
              name="nivelEnsino"
              value={nivelEnsino}
              onChange={(e) => setNivelEnsino(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Selecione o nível de ensino
              </option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Eletivas">Eletivas</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="fotosProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Fotos do produto
            </label>
            <input
              type="file"
              id="fotosProduto"
              name="fotosProduto"
              onChange={handleFotosChange}
              accept="image/*"
              multiple
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <DialogFooter className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Atualizar Produto"
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
