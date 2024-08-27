export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "edge";
export const preferredRegion = ["fra1", "cdg1", "lhr1"];

import { webhookCallback } from "grammy";
import { bot } from "~/configs/bot";

export const POST = webhookCallback(bot, "std/http");
