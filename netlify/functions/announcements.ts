import type { Handler } from "@netlify/functions";
import { ANNOUNCEMENTS } from "../../lib/db";

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=120",
    },
    body: JSON.stringify(ANNOUNCEMENTS),
  };
};
