import { NextRequest, NextResponse } from "next/server";
import type { RegistrationPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<RegistrationPayload>;

  // TODO: sustituir por integración con Notion/CRM.
  console.log("[register] Nueva pre-inscripción recibida:", payload);

  return NextResponse.json({ ok: true });
}
