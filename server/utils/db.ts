import { createClient } from "@libsql/client";

if (!process.env.TURSO_DB_URL || !process.env.TURSO_DB_AUTH_TOKEN) {
    throw new Error(
        "Please define TURSO_DB_URL and TURSO_DB_TOKEN in your .env file"
    );
}

export const client = createClient({
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string
});