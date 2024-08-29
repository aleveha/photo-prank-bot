export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const preferredRegion = ["fra1", "cdg1", "lhr1"];

import { webhookCallback } from "grammy";
import { bot } from "~/bot";

export const POST = webhookCallback(bot, "std/http");
