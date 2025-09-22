/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const runtime = "edge";

// Optional KV (set on Vercel): KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN
// Fallback to in-memory store (per-edge instance; not persistent)
const memory = new Map<string, number>();

async function kvGet(key: string): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token =
    process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  const v = data?.result;
  return typeof v === "number" ? v : v ? Number(v) : null;
}

async function kvIncr(key: string): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  const v = data?.result;
  return typeof v === "number" ? v : v ? Number(v) : null;
}

export async function GET(_req: Request, context: any) {
  const slug = context?.params?.slug as string;
  const key = `views:${slug}`;
  const kv = await kvGet(key);
  const count = kv ?? memory.get(key) ?? 0;
  return NextResponse.json({ views: count });
}

export async function POST(_req: Request, context: any) {
  const slug = context?.params?.slug as string;
  const key = `views:${slug}`;
  let count = (memory.get(key) ?? 0) + 1;
  memory.set(key, count);
  const kv = await kvIncr(key);
  if (typeof kv === "number") count = kv;
  return NextResponse.json({ views: count });
}
