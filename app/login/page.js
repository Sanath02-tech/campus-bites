"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

function LoginForm() {
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  // only allow internal paths as the redirect target
  const nextParam = searchParams.get("next");
  const next = nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/menu";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(next);
  }

  function fillDemo() {
    setEmail("student@campus.edu");
    setPassword("demo123");
    setError("");
  }

  if (user) {
    return (
      <p>
        You are logged in as {user.name}. <Button href="/menu">Go to menu</Button>
      </p>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          id="email"
          label="College email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-error">{error}</p>}
        <div className="flex items-center gap-3">
          <Button type="submit">Login</Button>
          <button type="button" onClick={fillDemo} className="text-sm underline">
            Use demo account
          </button>
        </div>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
