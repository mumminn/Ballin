import { ApiResponse } from "./api";

export type SeasonItem = {
    seasonName: string,
    category: string,
    startDate: string,
    endDate: string,
} 

export type StatisticApiResponse = Omit<ApiResponse<StatisticResponse>, "result"> & {
    result: StatisticResponse;
  };
  
export type StatisticRequest = {
    category: "All" | "baseball" | "basketball",
    startDate: string,
    endDate: string,
}

export type StatisticResponse = {
    winCount: number,
    lossCount: number,
    tieCount: number,
    mostVisitedStadium: string,
    bestWinRateStadium: string,
}