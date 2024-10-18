import { atom } from "jotai";

export const atomShowDailyKcal = atom<boolean>(false);
export const atomShowDailyKcalStreak = atom<boolean>(false);
export const atomShowWeightInfo = atom<boolean>(false);
export const atomShowDimChart = atom<boolean>(false);
export const atomShowWeightChart = atom<boolean>(false);

export const atomWeightTarget = atom<string>("");
export const atomLatestWeight = atom<number>(0);

export const atomDimensionA = atom<string>("");
export const atomDimensionB = atom<string>("");
export const atomDimensionC = atom<string>("");
export const atomDimensionD = atom<string>("");
