import en from "./en";
import lv from "./lv";
import es from "./es";
import de from "./de";
import uk from "./uk";
import zh from "./zh";
import ru from "./ru";
import ar from "./ar";
import ka from "./ka";

export type { Translations } from "./en";

export const locales: Record<string, typeof en> = {
  en, lv, es, de, uk, zh, ru, ar, ka,
};
