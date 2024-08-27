export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { webhookCallback } from "grammy";
import { bot } from "~/configs/bot";

export const POST = webhookCallback(bot, "std/http");
