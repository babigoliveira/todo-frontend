"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";

import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { ActionForm } from "../components/ActionForm";
import { TextButton } from "../components/TextButton";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1200);
  }

  return (
    <Background color="emerald">
      <Card>
        <Header />

        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold">Crie sua conta</h1>
          <p className="text-sm text-gray-500">Leva menos de 1 minuto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon={<FaRegEnvelope />}
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha (mín. 6 caracteres)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={<FaLock />}
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            icon={<FaLock />}
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <ActionForm type="submit" text="Criar conta" loadingText="Criando conta..." loading={loading} />
        </form>

        <p className="text-sm text-center mt-4">
          Já tem uma conta? <TextButton onClick={() => router.push("/login")}>Entrar</TextButton>
        </p>
      </Card>
    </Background>
  );
}
