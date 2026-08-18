export const clinicPriceList = {
  acupuncture: 250,
  shiatsuAcupuncture: 300,
  cuppingAddon: 50,
  package5: 1000,
  package10: 1500,
} as const;

export const demoPatientTreatmentPrices: Record<string, number> = {
  michael: 300,
  lior: 250,
  dor: 250,
};

export function getPatientTreatmentPrice(patientId: string) {
  return demoPatientTreatmentPrices[patientId] ?? clinicPriceList.acupuncture;
}
