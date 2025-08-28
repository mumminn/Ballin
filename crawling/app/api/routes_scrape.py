from fastapi import APIRouter, HTTPException
from app.models.scrape import ScrapeBody, ScrapeResponse
from app.services.scraper import run_scraper

router = APIRouter()

@router.post("/scrape", response_model=ScrapeResponse)
async def scrape(body: ScrapeBody):
    try:
        games = await run_scraper(body)
        return {"count": len(games), "games": games}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping failed: {e}")