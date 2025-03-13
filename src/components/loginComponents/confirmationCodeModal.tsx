import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmationCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationCodeModal: React.FC<ConfirmationCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setLoading(true);
    // Validação simples: código correto é "1234"
    if (code === "1234") {
      toast.success("Código confirmado com sucesso!");
      onClose();
      router.push("/");
    } else {
      toast.error("Código incorreto. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirmação de Código
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Por favor, insira os 4 dígitos do código de confirmação.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            type="text"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="XXXX"
          />
        </div>
        <DialogFooter className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="ml-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationCodeModal;
