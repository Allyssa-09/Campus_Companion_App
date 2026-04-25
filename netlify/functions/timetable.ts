import type { Handler } from "@netlify/functions";
import { TIMETABLE } from "../../lib/db";

export const handler: Handler = async (event) => {
  const day = event.queryStringParameters?.day;

  const data = day
    ? TIMETABLE.filter((e) => e.day.toLowerCase() === day.toLowerCase())
    : TIMETABLE;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    },
    body: JSON.stringify(data),
  };
};
