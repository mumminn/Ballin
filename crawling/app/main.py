import os
from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.routes_scrape import router as scrape_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Sports Scraper API")

# 라우터 등록
app.include_router(scrape_router, prefix="/api")

@app.get("/health")
async def health():
    return {"ok": True}

origins = os.getenv("FRONT_SERVER")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
