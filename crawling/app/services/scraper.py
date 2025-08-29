from app.models.scrape import ScrapeBody, Game
from typing import List, Dict, Any
from playwright.async_api import async_playwright
from datetime import datetime

async def run_scraper(body: ScrapeBody) -> List[Dict[str, Any]]:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True,
                                          args=["--no-sandbox", "--disable-gpu"])
        context = await browser.new_context(
            user_agent=("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                        "AppleWebKit/537.36 (KHTML, like Gecko) "
                        "Chrome/115.0.0.0 Safari/537.36"),
            locale="ko-KR"
        )
        page = await context.new_page()
        await page.goto(body.url, wait_until="networkidle")
        await page.wait_for_selector(
            "div[class*='MatchBox_match_area'], "
            "li[class*='MatchBox_match_item']",
            timeout=15000
        )

        want_date_text = None
        if body.date:
            dt = datetime.strptime(body.date, "%Y-%m-%d")
            want_date_text = f"{dt.month}월 {dt.day}일"

        rows = await page.evaluate(
            """
            ({ sport, teamFilter, wantDate }) => {
            function pickTeamName(cell){
                const el = cell.querySelector("strong[class*='MatchBoxHeadToHeadArea_team'], strong, span, p");
                return el && el.textContent.trim() ? el.textContent.trim() : (cell.textContent||"").trim();
            }

            const cfg = (sport === "basketball") ? {
                groupSel: "div[class*='ScheduleLeagueType_match_list_group']",
                titleSel: "em[class*='ScheduleLeagueType_title']",
                matchSel: "li[class*='MatchBox_match_item']",
                scoreSel: "div[class*='MatchBoxHeadToHeadArea_score_wrap'] strong"
            } : {
                groupSel: "div[class*='ScheduleAllType_match_list_group'], div[class*='ScheduleLeagueType_match_list_group']",
                titleSel: "em[class*='ScheduleAllType_title'], em[class*='ScheduleLeagueType_title']",
                matchSel: "div[class*='MatchBox_match_area']",
                scoreSel: "strong[class*='MatchBoxHeadToHeadArea_score'], div[class*='MatchBoxHeadToHeadArea_score_wrap'] strong"
            };

            function collectFromMatches(list){
                const out = [];
                list.forEach(match => {
                const teamCells = match.querySelectorAll("div[class*='MatchBoxHeadToHeadArea_team_item']");
                if (teamCells.length < 2) return;

                const team1 = pickTeamName(teamCells[0]);
                const team2 = pickTeamName(teamCells[1]);

                if (teamFilter && !(team1.includes(teamFilter) || team2.includes(teamFilter))) return;

                const scoreEls = match.querySelectorAll(cfg.scoreSel);
                const score1 = scoreEls.length >= 1 ? scoreEls[0].textContent.trim() : "";
                const score2 = scoreEls.length >= 2 ? scoreEls[1].textContent.trim() : "";

                const home1 = teamCells[0].querySelector("div[class*='home_mark']") ? "홈" : "";
                const home2 = teamCells[1].querySelector("div[class*='home_mark']") ? "홈" : "";

                out.push([team1, score1, home1, team2, score2, home2]);
                });
                return out;
            }

            const results = [];
            if (wantDate) {
                const groups = document.querySelectorAll(cfg.groupSel);
                groups.forEach(group => {
                const titleEl = group.querySelector(cfg.titleSel);
                if (!titleEl) return;
                const raw = titleEl.textContent.trim();
                const m = raw.match(/(\\d+월 \\d+일)/);
                const dateKey = m ? m[1] : raw;
                if (dateKey !== wantDate) return;
                results.push(...collectFromMatches(group.querySelectorAll(cfg.matchSel)));
                });
            } else {
                results.push(...collectFromMatches(document.querySelectorAll(cfg.matchSel)));
            }
            return results;
            }
            """,
            {
            "sport": body.sport,
            "teamFilter": (body.team or "").strip(),
            "wantDate": want_date_text
            }
        )

        await context.close()
        await browser.close()

    games: List[Game] = []
    for r in rows:
        games.append(Game(
            team1=r[0], score1=r[1], home1=r[2],
            team2=r[3], score2=r[4], home2=r[5]
        ))
    return [g.dict() for g in games]