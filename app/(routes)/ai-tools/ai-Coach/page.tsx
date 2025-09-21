import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CareerCoach from "./CareerCoach";

export default async function CareerCoachPage() {
  const { has } = await auth();

  // Pro OR Premium check
  const hasAccess = await has({ plan: ["pro", "premium"] });

  if (!hasAccess) {
    redirect("/billing");
  }

  return <CareerCoach />;
}
