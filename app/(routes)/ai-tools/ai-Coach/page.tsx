import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CareerCoach from "./CareerCoach";

export default async function CareerCoachPage() {
  const { has } = await auth();

  // Pro OR Premium check (cast to relax Clerk type for custom key)
  const hasAccess =
    (await (has as any)({ plan: "pro" })) ||
    (await (has as any)({ plan: "premium" }));

  if (!hasAccess) {
    redirect("/billing");
  }

  return <CareerCoach />;
}
