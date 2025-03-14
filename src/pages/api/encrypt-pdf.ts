import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import os from "os";
import path from "path";
import hummus from "hummus";

const bufferToBase64 = (buffer: Buffer): string => {
  return buffer.toString("base64");
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    console.log("Endpoint encrypt-pdf chamado.");
    const { pdfBase64, password } = req.body;

    if (!pdfBase64 || !password) {
      console.error("pdfBase64 ou password não fornecidos.");
      return res
        .status(400)
        .json({ message: "pdfBase64 e password são obrigatórios." });
    }

    // Converte o PDF de base64 para Buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Usa o diretório temporário do sistema para criar arquivos temporários
    const tempDir = os.tmpdir();
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `tmp-input-${timestamp}.pdf`);
    const outputPath = path.join(tempDir, `tmp-output-${timestamp}.pdf`);

    console.log("Escrevendo arquivo de entrada:", inputPath);
    fs.writeFileSync(inputPath, pdfBuffer);

    console.log("Criando escritor do HummusJS para", outputPath);
    // Cria o escritor para o PDF criptografado
    const writer = hummus.createWriter(outputPath, {
      userPassword: password,
      ownerPassword: password,
      userProtectionFlag: 4, // Ajuste as restrições conforme necessário
    });

    writer.appendPDFPagesFromPDF(inputPath);
    writer.end();
    console.log("PDF criptografado gerado com sucesso.");

    // Lê o PDF criptografado
    const encryptedPdfBuffer = fs.readFileSync(outputPath);

    // Remove os arquivos temporários
    console.log("Removendo arquivos temporários.");
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    console.log("Enviando resposta ao cliente.");
    return res.status(200).json({
      pdfEncryptedBase64: bufferToBase64(encryptedPdfBuffer),
      message: "PDF criptografado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criptografar o PDF:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
