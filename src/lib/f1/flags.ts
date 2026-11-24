const NATIONALITY_TO_CODE: Record<string, string> = {
  American: "us",
  Argentine: "ar",
  Australian: "au",
  Austrian: "at",
  Brazilian: "br",
  British: "gb",
  Canadian: "ca",
  Chinese: "cn",
  Danish: "dk",
  Dutch: "nl",
  Finnish: "fi",
  French: "fr",
  German: "de",
  Italian: "it",
  Japanese: "jp",
  Mexican: "mx",
  Monegasque: "mc",
  "New Zealander": "nz",
  Spanish: "es",
  Swiss: "ch",
  Thai: "th",
};

export function getFlagCode(nationality: string) {
  return NATIONALITY_TO_CODE[nationality];
}