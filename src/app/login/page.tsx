"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { LogoPublic } from "../components/LogoPublic";
import { ActionButton } from "../components/ActionButton";
import { TextButton } from "../components/TextButton";
import { SocialAuth } from "../components/SocialAuth";
import { InputField } from "../components/InputField";
import { Footer } from "../components/Footer";
import { login } from "../services/auth.service";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Informe email e senha para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Email ou senha inválidos");
      setLoading(false);
    }
  };

  return (
    <Background className="bg-emerald-500 flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <Card>
          <LogoPublic />

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
              autoComplete="off"
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              }
            />

            <div className="text-right text-sm">
              <TextButton color="secondary" onClick={() => router.push("/forgot-password")}>
                Esqueceu a senha?
              </TextButton>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <ActionButton type="submit" text="Entrar" loadingText="Entrando..." loading={loading} className="w-full" />
          </form>

          <p className="text-sm text-center mt-4">
            Não tem uma conta?{" "}
            <TextButton color="secondary" onClick={() => router.push("/register")}>
              Criar conta
            </TextButton>
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
      </main>
      <Footer />
    </Background>
  );
}
