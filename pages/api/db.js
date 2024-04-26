import { db } from "@vercel/postgres";

export default async function handler(request, response) {
  const client = await db.connect();

  try {
    const data = await client.sql`SELECT * FROM restaurant_attendance;`;
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
