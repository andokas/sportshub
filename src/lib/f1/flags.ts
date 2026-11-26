const NATIONALITY_TO_CODE: Record<string, string> = {
  American: "us",
  Argentine: "ar",
  Australian: "au",
  Austrian: "at",
  Belgian: "be",
  Brazilian: "br",
  British: "gb",
  Bulgarian: "bg",
  Canadian: "ca",
  Chilean: "cl",
  Chinese: "cn",
  Colombian: "co",
  Czech: "cz",
  Danish: "dk",
  Dutch: "nl",
  Estonian: "ee",
  Finnish: "fi",
  French: "fr",
  German: "de",
  "Hong Kong": "hk",
  Hungarian: "hu",
  Indian: "in",
  Indonesian: "id",
  Irish: "ie",
  Italian: "it",
  Japanese: "jp",
  Liechtensteiner: "li",
  Malaysian: "my",
  Mexican: "mx",
  Monegasque: "mc",
  "New Zealander": "nz",
  Portuguese: "pt",
  Russian: "ru",
  "South African": "za",
  Spanish: "es",
  Swedish: "se",
  Swiss: "ch",
  Thai: "th",
  Uruguayan: "uy",
  Venezuelan: "ve",
};

const HISTORICAL_FLAGS: Record<string, string> = {
  "East German": "../../../public/f1/historical_flags/dd.svg",
  Rhodesian: "../../../public/f1/historical_flags/rh.svg",
};

export function getFlagCode(nationality: string) {
  return NATIONALITY_TO_CODE[nationality];
}

export function getHistoricalFlag(nationality: string) {
  return HISTORICAL_FLAGS[nationality];
}