import { Command, CommandGroup } from "@grammyjs/commands";
import { limit } from "@grammyjs/ratelimiter";
import type { CommandContext, MiddlewareFn } from "grammy";
import { i18n } from "~/bot/configs/i18n";
import { DEFAULT_RATE_LIMITER_CONFIG, mandatorySubscriptions, verification } from "~/bot/middlewares";
import type { Context } from "~/bot/types";
import type { Locale } from "~/configs/i18n";

type CommandHandler = MiddlewareFn<CommandContext<Context>>;

const commandNames = ["start", "links", "language", "privacy"] as const;
const commandsRequireSubscription = ["links"];

async function commandsFactory() {
	const commands: Command<Context>[] = [];

	for (const commandName of commandNames) {
		const { default: handler } = (await import(`./${commandName}`)) as { default: CommandHandler };

		const middlewares: CommandHandler[] = [
			limit(DEFAULT_RATE_LIMITER_CONFIG),
			verification,
			handler
		];
		if (commandsRequireSubscription.includes(commandName)) {
			middlewares.splice(-1, 0, mandatorySubscriptions);
		}

		const command = new Command<Context>(
			commandName,
			i18n.t("en", `${commandName}-command.description`),
			middlewares
		);

		for (const locale of i18n.locales) {
			command.localize(locale as Locale, commandName, i18n.t(locale, `${commandName}-command.description`));
		}

		commands.push(command);
	}

	return commands;
}

export const COMMANDS = new CommandGroup<Context>().add(await commandsFactory());
