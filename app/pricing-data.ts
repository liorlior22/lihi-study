export type ClinicPriceList = {
  acupuncture: number;
  shiatsuAcupuncture: number;
  cuppingAddon: number;
  package5: number;
  package10: number;
};

export const clinicPriceList: ClinicPriceList = {
  acupuncture: 250,
  shiatsuAcupuncture: 300,
  cuppingAddon: 50,
  package5: 1000,
  package10: 1500,
};

const PRICE_LIST_STORAGE_KEY = "lihi-clinic-price-list-v1";
export const PRICE_LIST_UPDATED_EVENT = "lihi-clinic-price-list-updated";

export function getClinicPriceList(): ClinicPriceList {
  if (typeof window === "undefined") return clinicPriceList;

  try {
    const saved = window.localStorage.getItem(PRICE_LIST_STORAGE_KEY);
    if (!saved) return clinicPriceList;
    return { ...clinicPriceList, ...JSON.parse(saved) } as ClinicPriceList;
  } catch {
    return clinicPriceList;
  }
}

export function saveClinicPriceList(next: ClinicPriceList) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRICE_LIST_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(PRICE_LIST_UPDATED_EVENT, { detail: next }));
}

export const demoPatientTreatmentPrices: Record<string, number> = {
  michael: 300,
  lior: 250,
  dor: 250,
};

export function getPatientTreatmentPrice(patientId: string) {
  return demoPatientTreatmentPrices[patientId] ?? getClinicPriceList().acupuncture;
}
