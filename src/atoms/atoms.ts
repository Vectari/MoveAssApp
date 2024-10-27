import { atom } from "jotai";

export const atomIsDarkMode = atom<boolean>(true);

export const atomShowDailyKcal = atom<boolean>(false);
export const atomShowDailyKcalStreak = atom<boolean>(false);
export const atomShowWeightInfo = atom<boolean>(false);
export const atomShowDimChart = atom<boolean>(false);
export const atomShowWeightChart = atom<boolean>(false);

export const atomWeightTarget = atom<string>("");
export const atomLatestWeight = atom<number>(0);

export const atomDimensionAName = atom<string>("");
export const atomDimensionBName = atom<string>("");
export const atomDimensionCName = atom<string>("");
export const atomDimensionDName = atom<string>("");
