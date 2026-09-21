import { describe, expect, it } from 'vitest';
import { microsoftSecurityDataGovernance } from '../src/app/assessments/microsoft-security-data-governance';
import { en } from '../src/app/i18n/locales.en';
import { it as itLocale } from '../src/app/i18n/locales.it';

const forbiddenCustomerTerms = [
  'FIGC',
  'AGIC',
  'FAAC',
  'ABBVIE',
  'ICCROM',
  'CHIOMENTI',
  'ATUMTEK'
];

const forbiddenSectorExamples = [
  'tesseramento',
  'arbitraggio',
  'refereeing',
  'registered members'
];

function searchable(value: unknown): string {
  return JSON.stringify(value).toUpperCase();
}

describe('customer-neutral built-in content', () => {
  it('does not embed known real customer names in the built-in assessment or UI examples', () => {
    const content = [
      searchable(microsoftSecurityDataGovernance),
      searchable(itLocale),
      searchable(en)
    ].join('\n');

    for (const term of forbiddenCustomerTerms) {
      expect(content).not.toContain(term);
    }
  });

  it('does not retain customer-sector examples from the original workshop', () => {
    const content = JSON.stringify(microsoftSecurityDataGovernance).toLowerCase();

    for (const term of forbiddenSectorExamples) {
      expect(content).not.toContain(term.toLowerCase());
    }
  });
});
