import { Game } from "@/types/record";

export async function fetchGames(params: {
    sport: "baseball" | "basketball";
    url: string;
    team?: string;
    date?: string | null;
  }): Promise<Game[]> {
    const res = await fetch(`${import.meta.env.VITE_CRAWLING_URL}/api/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch games");
    }
  
    const data = await res.json();
    return data.games as Game[];
  }
  