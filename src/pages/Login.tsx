// pages/login.tsx

const Login = () => {
  return (
    <div className="flex p-6 justify-center scroll-auto">
      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border-x border-y border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Já Sou Cadastrado!
        </h2>
        <label>E-mail</label>
        <input
          className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200"
          type="email"
        />
        <label>Senha</label>
        <input
          className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200"
          type="password"
        />
        <a
          href="#"
          className="text-black font-jost text-base font-normal hover:underline"
        >
          esqueceu a sua senha?
        </a>
        <button className="w-full bg-blue-800 text-white p-3 font-jost text-base  font-semibold rounded-md mt-8 hover:bg-blue-400">
          Entrar
        </button>
      </div>
      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border-x border-y border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Ainda não possuo cadastro
        </h2>
        <p className="text-black text-center font-jost text-lg font-medium mb-8">
          Primeiro acesso? <br />
          <a
            href="#"
            className="text-black font-jost text-base font-normal hover:underline"
          >
            Faça seu cadastro aqui!
          </a>
        </p>

        <label>E-mail</label>
        <input
          className="w-full p-2 mb-4 border mt-2 rounded bg-gray-200"
          type="email"
        />
        <button className="w-full bg-blue-800 text-white p-3 font-jost text-base  font-semibold rounded-md mt-8 hover:bg-blue-400">
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
