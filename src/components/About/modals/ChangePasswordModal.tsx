import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
  triggerUpdate: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ triggerUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post('/api/change-password', formData);
      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        triggerUpdate(); 
        setIsOpen(false); 
      }
    } catch (error) {
      toast.error("Erro ao alterar a senha.");
      console.error("Erro ao alterar a senha:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Alterar Senha</button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Alterar Senha</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para alterar sua senha.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Senha Atual</label>
            <input type="password" name="currentPassword" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nova Senha</label>
            <input type="password" name="newPassword" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
            <input type="password" name="confirmPassword" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <DialogFooter className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Salvar</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
