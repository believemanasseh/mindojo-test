from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .utils import (
    find_cells_that_can_flow_to_both_oceans,
    init_google_sheet,
    read_google_sheet,
)

app = FastAPI(docs_url="/", root_path="/v1")

sheet = init_google_sheet()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/grids/{tab}")
async def fetch_grids(tab: int):
    grid = read_google_sheet(sheet, tab_index=tab)
    return {"grid": grid}


@app.get("/results/{tab}")
async def fetch_result(tab: int):
    grid = read_google_sheet(sheet, tab_index=tab)
    result, coordinates = find_cells_that_can_flow_to_both_oceans(grid)
    return {"numOfCells": result, "coordinates": coordinates}
