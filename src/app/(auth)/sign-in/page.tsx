"use client";

import AuthCard from "@/components/auth/auth-card";

export default function SignInPage() {
  return (
    <AuthCard
      title="Sign in"
      description="Sign in to your account using your preferred provider"
      mode="sign-in"
    />
  );
}
