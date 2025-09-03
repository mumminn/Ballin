import { Result } from "@/types/calendar";

export interface Game {
    team1: string;
    score1: string;
    home1: string;
    team2: string;
    score2: string;
    home2: string;
};


export type TeamOption = {teamId: string, teamName: string};

export type MatchRecordItem = {
    recordId: string;
    supportingTeam: string;
    opposingTeam: string;
    stadium: string;
    teamResult: Result;
    stadiumTeam: string;
    matchDate: string;
    supportingTeamCode: string;
}