import { eq } from "drizzle-orm";
import { database, schema } from "~/configs/database";

export const PromoService = {
	add: async (referral: string, chatId: number) => {
		try {
			await database.insert(schema.promo).values({ referral, chatId }).onConflictDoNothing();
		} catch (error) {
			console.error("Error adding promo:", error);
		}
	},
	getCountByReferral: async (referral: string) => {
		try {
			const promos = await database.query.promo.findMany({ where: eq(schema.promo.referral, referral) });

			return {
				all: promos.length,
				private: promos.filter((promo) => promo.chatId > 0).length,
				group: promos.filter((promo) => promo.chatId < 0).length
			};
		} catch (error) {
			console.error("Error getting count by referral:", error);
			return null;
		}
	}
};
