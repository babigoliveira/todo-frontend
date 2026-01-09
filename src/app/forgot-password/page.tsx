"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEnvelope } from "react-icons/fa6";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { LogoPublic } from "../components/LogoPublic";
import { ActionButton } from "../components/ActionButton";
import { InputField } from "../components/InputField";
import { Footer } from "../components/Footer";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setError("Informe seu email.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <Background className="bg-emerald-500 flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <Card>
          <LogoPublic />

          {!success ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-xl font-semibold">Redefinir senha</h1>
                <p className="text-sm text-gray-500">Enviaremos instruções para seu email</p>
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

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <ActionButton
                  type="submit"
                  text="Enviar instruções"
                  loadingText="Enviando..."
                  loading={loading}
                  className="w-full"
                />
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-lg font-semibold">Email enviado com sucesso</h2>
              <p className="text-sm text-gray-500">Verifique sua caixa de entrada</p>

              <ActionButton
                type="button"
                text="Voltar para login"
                onClick={() => router.push("/login")}
                className="w-full"
              />
            </div>
          )}
        </Card>
      </main>
      <Footer />
    </Background>
  );
}
