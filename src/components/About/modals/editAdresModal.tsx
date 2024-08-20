import { useEffect, useState } from "react";
import { AccountData } from "@/interfaces/aboutType";
import decryptJwt from "@/components/decripted/decript";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { DecodedToken } from "@/interfaces/decodeType";

const Account = () => {
  const [accountData, setAccountData] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        const data = decryptJwt(); // Chama o serviço para decodificar o JWT
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (formData: FormData) => {
    // Função de exemplo para salvar os dados
    console.log("Dados do formulário:", formData);
    toast.success("Login realizado com sucesso!");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Conta</h2>
      <div className="border-2 rounded-xl py-5">
        {loading ? (
          <div className="text-center text-2xl text-black font-bold">
            Loading...
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">{/* Ícone SVG */}</span>
                Dados Cadastrais
              </h3>
              <p>
                <strong>Nome:</strong> {accountData?.usuario.nome}
              </p>
              <p>
                <strong>Sexo:</strong> {accountData?.usuario.sexo}
              </p>
              <p>
                <strong>Data de nascimento:</strong>{" "}
                {accountData?.usuario.datanascimento}
              </p>
              <p>
                <strong>Email:</strong> {accountData?.usuario.email}
              </p>
              <p>
                <strong>Telefone celular:</strong>{" "}
                {accountData?.usuario.telefonecelular}
              </p>
              <div className="mt-4 flex gap-2">
                <DialogModal
                  title="Alterar Senha"
                  triggerText="Alterar Senha"
                  inputs={[
                    {
                      label: "Senha Atual",
                      name: "currentPassword",
                      type: "password",
                    },
                    {
                      label: "Nova Senha",
                      name: "newPassword",
                      type: "password",
                    },
                    {
                      label: "Confirmar Nova Senha",
                      name: "confirmPassword",
                      type: "password",
                    },
                  ]}
                  handleSave={handleSave}
                />
                <DialogModal
                  title="Editar Dados"
                  triggerText="Editar Dados"
                  inputs={[
                    {
                      label: "Nome",
                      name: "nome",
                      type: "text",
                      defaultValue: accountData?.usuario.nome,
                    },
                    {
                      label: "Sexo",
                      name: "sexo",
                      type: "text",
                      defaultValue: accountData?.usuario.sexo as string,
                    },
                    {
                      label: "Data de Nascimento",
                      name: "datanascimento",
                      type: "date",
                      defaultValue: accountData?.usuario.datanascimento,
                    },
                    {
                      label: "Email",
                      name: "email",
                      type: "email",
                      defaultValue: accountData?.usuario.email,
                    },
                    {
                      label: "Telefone Celular",
                      name: "telefonecelular",
                      type: "text",
                      defaultValue: accountData?.usuario.telefonecelular,
                    },
                  ]}
                  handleSave={handleSave}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">{/* Ícone SVG */}</span>
                Endereço Principal
              </h3>
              <p>
                <strong>Endereço:</strong> {accountData?.usuario.endereco}
              </p>
              <p>
                <strong>Bairro:</strong> {accountData?.usuario.bairro}
              </p>
              <p>
                <strong>Cidade/UF:</strong> {accountData?.usuario.cidadeuf}
              </p>
              <p>
                <strong>CEP:</strong> {accountData?.usuario.cep}
              </p>
              <p>
                <strong>País:</strong> {accountData?.usuario.pais}
              </p>
              <div className="mt-4 flex gap-2">
                <DialogModal
                  title="Editar Endereço Principal"
                  triggerText="Editar Endereço Principal"
                  inputs={[
                    {
                      label: "Endereço",
                      name: "endereco",
                      type: "text",
                      defaultValue: accountData?.usuario.endereco as string,
                    },
                    {
                      label: "Bairro",
                      name: "bairro",
                      type: "text",
                      defaultValue: accountData?.usuario.bairro as string,
                    },
                    {
                      label: "Cidade/UF",
                      name: "cidadeuf",
                      type: "text",
                      defaultValue: accountData?.usuario.cidadeuf as string,
                    },
                    {
                      label: "CEP",
                      name: "cep",
                      type: "text",
                      defaultValue: accountData?.usuario.cep as string,
                    },
                    {
                      label: "País",
                      name: "pais",
                      type: "text",
                      defaultValue: accountData?.usuario.pais as string,
                    },
                  ]}
                  handleSave={handleSave}
                />
                <DialogModal
                  title="Cadastrar Novo Endereço"
                  triggerText="Cadastrar Novo Endereço"
                  inputs={[
                    { label: "Endereço", name: "endereco", type: "text" },
                    { label: "Bairro", name: "bairro", type: "text" },
                    { label: "Cidade/UF", name: "cidadeuf", type: "text" },
                    { label: "CEP", name: "cep", type: "text" },
                    { label: "País", name: "pais", type: "text" },
                  ]}
                  handleSave={handleSave}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface DialogModalProps {
  title: string;
  triggerText: string;
  inputs: {
    label: string;
    name: string;
    type: string;
    defaultValue?: string | undefined;
  }[];
  handleSave: (formData: FormData) => void;
}

const DialogModal: React.FC<DialogModalProps> = ({
  title,
  triggerText,
  inputs,
  handleSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    handleSave(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-col text-sm gap-1">
              <label htmlFor={input.name}>{input.label}</label>
              <input
                required
                type={input.type}
                name={input.name}
                defaultValue={input.defaultValue}
                className="border rounded-md outline-none py-2 px-2"
              />
            </div>
          ))}
          <div className="flex justify-end mt-4"></div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Account;
