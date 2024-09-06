import type en from "../app/_locales/en.json";

type Messages = typeof en;

declare global {
	interface IntlMessages extends Messages {}
}
