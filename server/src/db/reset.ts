import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

import { reset } from "drizzle-seed";
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
}
main();
