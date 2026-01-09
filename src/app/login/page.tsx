"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { ActionButton } from "../components/ActionButton";
import { TextButton } from "../components/TextButton";
import { SocialAuth } from "../components/SocialAuth";
import { InputField } from "../components/InputField";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Informe email e senha para continuar.");
      return;
    }

    setError("");
    setLoading(true);

    // Mock de login
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 1200);
  }

  return (
    <Background className="bg-emerald-500">
      <Card>
        <Header />

        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold">Bem-vindo</h1>
          <p className="text-sm text-gray-500">Organize suas tarefas em um só lugar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon={<FaRegEnvelope />}
            color="gray"
          />

          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={<FaLock />}
            color="gray"
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            }
          />

          <div className="text-right">
            <TextButton onClick={() => router.push("/forgot-password")}>Esqueceu a senha?</TextButton>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <ActionButton type="submit" text="Entrar" loadingText="Entrando..." loading={loading} className="w-full" />
        </form>

        <p className="text-sm text-center mt-4">
          Não tem uma conta? <TextButton onClick={() => router.push("/register")}>Criar conta</TextButton>
        </p>

        <SocialAuth
          title="Entrar com"
          providers={[
            { name: "Google", icon: <FcGoogle size={24} />, onClick: () => {} },
            {
              name: "Apple",
              icon: <Image src="/images/apple.svg" alt="Apple" width={24} height={24} />,
              onClick: () => {}
            },
            {
              name: "Microsoft",
              icon: <Image src="/images/microsoft.svg" alt="Microsoft" width={24} height={24} />,
              onClick: () => {}
            }
          ]}
        />
      </Card>
    </Background>
  );
}
