import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdatePage() {
  const session = await getSession();
  if (!session) redirect("/signin?redirect=/profile/update&reason=login-required");
  return <UpdateForm initialName={session.user.name} />;
}
