import { NextResponse } from "next/server";
import { SOCIETY_EVENTS } from "@/lib/db";

export async function GET() {
  return NextResponse.json(SOCIETY_EVENTS, {
    headers: { "Cache-Control": "public, max-age=120" },
  });
}