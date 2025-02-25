CREATE TABLE "temp_promo" (
	"referral" text NOT NULL,
	"chat_id" bigint NOT NULL,
	"referred_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "temp_promo_referral_chat_id_pk" PRIMARY KEY("referral","chat_id")
);
