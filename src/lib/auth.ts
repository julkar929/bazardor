import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { MongoClient } from "mongodb";
import dns from "node:dns";
if (process.env.NODE_ENV !== "production") dns.setServers(["8.8.8.8", "1.1.1.1"]);

const g = globalThis as unknown as {
  __mongo?: MongoClient;
  __memdb?: Record<string, any[]>;
};

function database() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    g.__mongo ??= new MongoClient(uri);
    return mongodbAdapter(g.__mongo.db(process.env.MONGODB_DB || "bazardor"), { client: g.__mongo });
  }
  // Dev fallback: in-memory store (resets on restart). Set MONGODB_URI for real persistence.
  g.__memdb ??= { user: [], session: [], account: [], verification: [] };
  return memoryAdapter(g.__memdb);
}

const social: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  social.google = { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  social.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };

export const auth = betterAuth({
  database: database(),
  secret: process.env.BETTER_AUTH_SECRET || "dev-only-secret-change-me-in-production-0123456789",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || undefined,
  trustedOrigins: [
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`] : []),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // Email verification / forgot-password intentionally NOT enabled (per assignment note).
    // To enable: set requireEmailVerification: true and configure sendVerificationEmail / sendResetPassword.
    autoSignIn: false,
  },
  socialProviders: social,
  plugins: [nextCookies()],
});
