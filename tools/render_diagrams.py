"""Render every diagrams/*.mmd file to projects/diagrams/*.svg.

The site never loads Mermaid in the browser (keeps the CSP strict and pages fast);
diagrams are pre-rendered here with a pinned Mermaid build inside headless Chromium.

Usage:
    pip install playwright && playwright install chromium
    python tools/render_diagrams.py            # render all
    python tools/render_diagrams.py agentic    # only files whose name contains "agentic"
"""
import asyncio
import json
import re
import pathlib
import sys

from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "diagrams"
OUT = ROOT / "projects" / "diagrams"
MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"

CONFIG = {
    "startOnLoad": False,
    "securityLevel": "strict",
    "htmlLabels": False,
    "theme": "base",
    "fontFamily": "Arial, Helvetica, sans-serif",
    "flowchart": {"htmlLabels": False, "curve": "basis", "padding": 12},
    "sequence": {"mirrorActors": False, "useMaxWidth": False},
    "themeVariables": {
        "background": "transparent",
        "fontFamily": "Arial, Helvetica, sans-serif",
        "fontSize": "14px",
        "primaryColor": "#141418",
        "primaryTextColor": "#ededed",
        "primaryBorderColor": "#d4ff00",
        "secondaryColor": "#18181d",
        "secondaryTextColor": "#ededed",
        "secondaryBorderColor": "#38bdf8",
        "tertiaryColor": "#0f0f12",
        "tertiaryTextColor": "#ededed",
        "tertiaryBorderColor": "#52525b",
        "lineColor": "#a1a1aa",
        "textColor": "#ededed",
        "mainBkg": "#141418",
        "nodeBorder": "#d4ff00",
        "clusterBkg": "#0d0d10",
        "clusterBorder": "#52525b",
        "titleColor": "#a1a1aa",
        "edgeLabelBackground": "#0a0a0c",
        "actorBkg": "#141418",
        "actorBorder": "#d4ff00",
        "actorTextColor": "#ededed",
        "actorLineColor": "#52525b",
        "signalColor": "#a1a1aa",
        "signalTextColor": "#ededed",
        "labelBoxBkgColor": "#141418",
        "labelBoxBorderColor": "#52525b",
        "labelTextColor": "#ededed",
        "loopTextColor": "#a1a1aa",
        "noteBkgColor": "#1f2a10",
        "noteBorderColor": "#d4ff00",
        "noteTextColor": "#ededed",
        "activationBkgColor": "#1f2a10",
        "activationBorderColor": "#d4ff00",
        "sequenceNumberColor": "#0a0a0c",
        "stateBkg": "#141418",
        "stateLabelColor": "#ededed",
        "compositeBackground": "#0d0d10",
        "altBackground": "#0f0f12",
    },
}

PAGE = f"""<!doctype html><html><head><meta charset="utf-8">
<script src="{MERMAID}"></script></head><body></body></html>"""


async def main(filter_text: str = "") -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in SRC.glob("*.mmd") if filter_text in p.stem)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(PAGE, wait_until="networkidle")
        await page.evaluate(f"mermaid.initialize({json.dumps(CONFIG)})")
        failed = 0
        for f in files:
            src = f.read_text(encoding="utf-8")
            try:
                svg = await page.evaluate(
                    "async ([id, src]) => (await mermaid.render(id, src)).svg", [f"d-{f.stem}", src]
                )
            except Exception as exc:  # report and continue with the rest
                failed += 1
                print(f"FAIL {f.name}: {str(exc).splitlines()[0]}")
                continue
            # Give the file an intrinsic size so <img> keeps the aspect ratio.
            m = re.search(r'viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"', svg)
            if m:
                w, h = round(float(m.group(1))), round(float(m.group(2)))
                svg = re.sub(r'\swidth="100%"', f' width="{w}" height="{h}"', svg, count=1)
                svg = re.sub(r'\sstyle="max-width:[^"]*"', "", svg, count=1)
            (OUT / f"{f.stem}.svg").write_text(svg, encoding="utf-8")
            print(f"ok   {f.name}")
        await browser.close()
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1] if len(sys.argv) > 1 else ""))
