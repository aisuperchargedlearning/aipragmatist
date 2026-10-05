/** Dropdown options. Demo content: refine with the team later. */

export interface Option {
  value: string;
  label: string;
}

export const MONTHS: readonly Option[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
].map((label, i) => ({ value: String(i + 1), label }));

export const DAYS: readonly Option[] = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

/** Applicants are roughly 14 to 19 years old. */
export const APPLICANT_MIN_AGE = 14;
export const APPLICANT_MAX_AGE = 19;

export function yearRange(from: number, to: number, descending = false): Option[] {
  const years: Option[] = [];
  for (let y = from; y <= to; y++) years.push({ value: String(y), label: String(y) });
  return descending ? years.reverse() : years;
}

export function birthYearOptions(today = new Date()): Option[] {
  const year = today.getFullYear();
  return yearRange(year - APPLICANT_MAX_AGE, year - APPLICANT_MIN_AGE, true);
}

// ISO 3166-1 alpha-2 codes. Names come from the browser so they are always spelled correctly.
const COUNTRY_CODES =
  'AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ ' +
  'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR ' +
  'GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IQ IR IS IT JE JM JO JP ' +
  'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT ' +
  'MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW ' +
  'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ ' +
  'UA UG US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW';

export const US = 'US';

function buildCountries(): Option[] {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames(['en'], { type: 'region', fallback: 'none' });
  } catch {
    names = null;
  }
  const all = COUNTRY_CODES.split(' ')
    .map((code) => ({ value: code, label: names?.of(code) ?? code }))
    .filter((o) => o.label && o.label !== o.value)
    .sort((a, b) => a.label.localeCompare(b.label));
  const us = all.find((o) => o.value === US) ?? { value: US, label: 'United States' };
  return [us, ...all.filter((o) => o.value !== US)];
}

export const COUNTRIES: readonly Option[] = buildCountries();

export const US_STATES: readonly Option[] = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'],
  ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
  ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
  ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'],
  ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'],
  ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
].map(([value, label]) => ({ value: value!, label: label! }));

export const GRADE_LEVELS: readonly Option[] = [
  { value: '8', label: 'Grade 8 (or equivalent)' },
  { value: '9', label: 'Grade 9 (or equivalent)' },
  { value: '10', label: 'Grade 10 (or equivalent)' },
  { value: '11', label: 'Grade 11 (or equivalent)' },
  { value: '12', label: 'Grade 12 (or equivalent)' },
];

export const ENGLISH_PROFICIENCY: readonly Option[] = [
  { value: 'native', label: 'Native speaker' },
  { value: 'test', label: 'Test score' },
  { value: 'teacher', label: 'Teacher assessment' },
];

export const ENGLISH_TESTS: readonly Option[] = [
  { value: 'toefl_junior', label: 'TOEFL Junior' },
  { value: 'toefl_ibt', label: 'TOEFL iBT' },
  { value: 'ielts', label: 'IELTS' },
  { value: 'duolingo', label: 'Duolingo English Test' },
  { value: 'eltis', label: 'ELTiS' },
  { value: 'other', label: 'Other test' },
];

export const DIETARY_NEEDS: readonly Option[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'gluten_free', label: 'Gluten-free' },
  { value: 'dairy_free', label: 'Dairy-free' },
  { value: 'nut_free', label: 'No nuts' },
  { value: 'other', label: 'Other' },
];

export const YES_NO: readonly Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const GUARDIAN_RELATIONSHIPS: readonly Option[] = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'stepparent', label: 'Stepparent' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'legal_guardian', label: 'Legal guardian' },
  { value: 'other', label: 'Other' },
];
