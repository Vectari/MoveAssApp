import { atom } from "jotai";

export const atomShowDailyKcal = atom<boolean>(false);
export const atomShowDailyKcalStreak = atom<boolean>(false);
export const atomShowWeightTarget = atom<boolean>(false);
export const atomShowDimChart = atom<boolean>(false);
export const atomShowWeightChart = atom<boolean>(false);

export const atomWeightTarget = atom<number>(0);
export const atomLatestWeight = atom<number>(0);
