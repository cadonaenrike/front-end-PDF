// pages/login.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { login } from "./api/LoginApi";
import { LoginData } from "@/interfaces/LoginData";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    login: "",
    senha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await login(loginData);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard"); // Redirecionar para o dashboard ou página principal
    } catch (error) {
      toast.error("Falha ao fazer login. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex p-6 justify-center scroll-auto">
      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border-x border-y border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Já Sou Cadastrado!
        </h2>
        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200"
            type="email"
            name="login"
            value={loginData.login}
            onChange={handleChange}
          />
          <label>Senha</label>
          <input
            className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200"
            type="password"
            name="senha"
            value={loginData.senha}
            onChange={handleChange}
          />
          <Link
            href="/Subscribe"
            className="text-black font-jost text-base font-normal hover:underline"
          >
            Esqueceu a sua senha?
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-800 text-white p-3 font-jost text-base font-semibold rounded-md mt-8 hover:bg-blue-400"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border-x border-y border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Ainda não possuo cadastro
        </h2>
        <p className="text-black text-center font-jost text-lg font-medium mb-8">
          Primeiro acesso? <br />
          <Link
            href="/Subscribe"
            className="text-black font-jost text-base font-normal hover:underline"
          >
            Faça seu cadastro aqui!
          </Link>
        </p>

        <label>E-mail</label>
        <input
          className="w-full p-2 mb-4 border mt-2 rounded bg-gray-200"
          type="email"
        />
        <button className="w-full bg-blue-800 text-white p-3 font-jost text-base font-semibold rounded-md mt-8 hover:bg-blue-400">
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
