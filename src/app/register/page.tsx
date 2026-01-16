"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { LogoPublic } from "../components/LogoPublic";
import { ActionButton } from "../components/ActionButton";
import { TextButton } from "../components/TextButton";
import { InputField } from "../components/InputField";
import { Footer } from "../components/Footer";
import { RxAvatar } from "react-icons/rx";
import { register } from "../services/todo-service";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
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
    try {
      setError("");
      setLoading(true);

      await register(name, email, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
      setLoading(false);
    }
  };

  return (
    <Background className="bg-emerald-500 flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <Card>
          <LogoPublic />

          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold">Crie sua conta</h1>
            <p className="text-sm text-gray-500">Leva menos de 1 minuto</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="Text"
              placeholder="Nome Completo"
              value={name}
              onChange={e => setName(e.target.value)}
              icon={<RxAvatar />}
              color="gray"
            />

            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<FaRegEnvelope />}
              color="gray"
            />

            <InputField
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<FaLock />}
              color="gray"
              autoComplete="on"
            />

            <InputField
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              icon={<FaLock />}
              color="gray"
              autoComplete="on"
            />

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <ActionButton
              type="submit"
              text="Criar conta"
              loadingText="Criando conta..."
              loading={loading}
              className="w-full"
            />
          </form>

          <p className="text-sm text-center mt-4">
            Já tem uma conta?
            <TextButton color="secondary" onClick={() => router.push("/login")}>
              Entrar
            </TextButton>
          </p>
        </Card>
      </main>
      <Footer />
    </Background>
  );
}
