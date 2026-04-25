import { NextResponse } from "next/server";
import { ANNOUNCEMENTS } from "@/lib/db";

export async function GET() {
  return NextResponse.json(ANNOUNCEMENTS, {
    headers: { "Cache-Control": "public, max-age=120" },
  });
}
