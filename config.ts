import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  connectionString: process.env.CONNECTION_STRING!,
};
