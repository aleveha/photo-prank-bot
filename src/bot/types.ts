import type { I18nFlavor } from "@grammyjs/i18n";
import type { Context as GrammyContext } from "grammy";

export type Context = GrammyContext & I18nFlavor;
