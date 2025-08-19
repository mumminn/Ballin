import { Sport, Result } from "types/calendar";

export type Stamp =
  | { result: Result }
  | { result: Result; sport: Sport; team: string };

export const stampPath = (s: Stamp) =>
  "team" in s
    ? `/images/stamps/${s.sport}/${s.team}_${s.result}.png`
    : `/images/stamps/${s.result}.png`;