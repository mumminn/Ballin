export type Sport = "baseball" | "basketball";
export type Result = "win" | "lose" | "tie" | "nogame";

export type Stamp =
  | { date: Date; sport: Sport; result: "win" | "lose"; team: string }
  | { date: Date; sport: Sport; result: "tie" | "nogame" };

export type Tab = "baseball" | "basketball" | "all";