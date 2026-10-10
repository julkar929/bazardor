import { Suspense } from "react";
import type { Metadata } from "next";
import SignInForm from "./SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
