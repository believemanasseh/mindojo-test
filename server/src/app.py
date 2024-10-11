from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .utils import (
    find_cells_that_flow_to_both_ocean,
    init_google_sheet,
    read_google_sheet,
)

app = FastAPI(docs_url="/", root_path="/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

sheet = init_google_sheet()


@app.get("/grids/{tab}")
async def fetch_grids(tab: int):
    grid = read_google_sheet(sheet, tab_index=tab)
    return {"grid": grid}


@app.get("/results/{tab}")
async def fetch_result(tab: int):
    grid = read_google_sheet(sheet, tab_index=tab)
    num_of_cells, coordinates = find_cells_that_flow_to_both_ocean(grid)
    return {"numOfCells": num_of_cells, "coordinates": coordinates}
