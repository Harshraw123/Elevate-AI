import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ResumeBuilderClient from "./ResumeBuilderClient";

export default async function ResumeBuilderPage() {
  const { has } = await auth();

  // Pro OR Premium check
  const hasAccess = await has({ plan: ["pro", "premium"] });

  if (!hasAccess) {
    redirect("/billing");
  }

  return <ResumeBuilderClient />;
}
