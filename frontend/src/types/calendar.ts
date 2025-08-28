export type Sport = "baseball" | "basketball";
export type Result = "WIN" | "LOSE" | "TIE" | "NOGAME";

export type Stamp =
  | { date: Date; sport: Sport; result: "win" | "lose"; team: string }
  | { date: Date; sport: Sport; result: "tie" | "nogame" };


export type StampsResult = { stamps: Stamp[] };



export type Tab = "baseball" | "basketball" | "all";


export type CategoryApi = {
  categoryId: string;
  categoryName: string;
};

export type CategoriesResult = {
  categories: CategoryApi[];
};

export type Category = {
  id: string;
  code: string;  
  label: string;   
};