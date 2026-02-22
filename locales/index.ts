import en from "./en";
import lv from "./lv";
import es from "./es";
import de from "./de";
import zh from "./zh";
import ru from "./ru";
import ar from "./ar";
import ka from "./ka";
import hy from "./hy";

export type { Translations } from "./en";

export const locales: Record<string, typeof en> = {
  en, lv, es, de, zh, ru, ar, ka, hy,
};
