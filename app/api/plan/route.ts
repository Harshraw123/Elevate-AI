import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { has } = await auth();
  const hasAccess =
    (await (has as any)({ plan: "pro" })) ||
    (await (has as any)({ plan: "premium" }));
  return Response.json({ hasAccess });
}
