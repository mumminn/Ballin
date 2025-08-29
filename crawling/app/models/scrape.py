from typing import Literal, Optional, List
from pydantic import BaseModel

class ScrapeBody(BaseModel):
    sport: Literal["baseball", "basketball"]
    url: str
    team: Optional[str] = None
    date: Optional[str] = None

class Game(BaseModel):
    team1: str
    score1: str
    home1: str
    team2: str
    score2: str
    home2: str

class ScrapeResponse(BaseModel):
    count: int
    games: List[Game]