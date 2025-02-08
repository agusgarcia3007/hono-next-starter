import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "@/db/schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, schema).refine((f) => ({
    usersTable: {
      count: 10,
      with: {
        postsTable: 5,
      },
    },
  }));
}
main();
