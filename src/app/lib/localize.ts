import type { Locale, LocalizedText } from '../models';

export function localized(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.it;
}
