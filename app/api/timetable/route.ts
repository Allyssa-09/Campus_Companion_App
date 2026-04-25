import { NextResponse } from "next/server";
import { TIMETABLE } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  const data = day
    ? TIMETABLE.filter((e) => e.day.toLowerCase() === day.toLowerCase())
    : TIMETABLE;

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
