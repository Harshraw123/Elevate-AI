import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { has } = await auth();
  const hasAccess = await has({ plan: ["pro", "premium"] });
  return Response.json({ hasAccess });
}
