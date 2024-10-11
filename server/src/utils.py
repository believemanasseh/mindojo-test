from collections import deque

import gspread
from oauth2client.service_account import ServiceAccountCredentials


def init_google_sheet():
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive",
    ]

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        "diy-my-computer-d83d29bc0e67.json", scope
    )

    client = gspread.authorize(credentials)

    sheet = client.open_by_url(
        "https://docs.google.com/spreadsheets/d/1guE4DI4wQpBXPlXRKXVEeb3nH84Phq6YqgYK9M4NUT0/edit?gid=0#gid=0"
    )

    return sheet


def read_google_sheet(sheet, tab_index=0):
    worksheet = sheet.get_worksheet(tab_index)
    data = worksheet.get_all_values()
    grid = [[int(cell) for cell in row] for row in data]
    return grid


def bfs(grid, queue, visited):
    rows, cols = len(grid), len(grid[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while queue:
        r, c = queue.popleft()

        for dr, dc in directions:
            new_dr, new_dc = r + dr, c + dc

            if (
                0 <= new_dr < rows
                and 0 <= new_dc < cols
                and not visited[new_dr][new_dc]
                and grid[new_dr][new_dc] >= grid[r][c]
            ):
                visited[new_dr][new_dc] = True
                queue.append((new_dr, new_dc))


def find_cells_that_flow_to_both_ocean(grid):
    rows, cols = len(grid), len(grid[0])
    coordinates = []

    nw_visited = [[False] * cols for _ in range(rows)]
    se_visited = [[False] * cols for _ in range(rows)]

    nw_queue = deque()
    se_queue = deque()

    # Identify NW edge - first row and first column
    for r in range(rows):
        nw_queue.append((r, 0))
        nw_visited[r][0] = True
    for c in range(cols):
        nw_queue.append((0, c))
        nw_visited[0][c] = True

    # Identify SE edge - last row and last column
    for r in range(rows):
        se_queue.append((r, cols - 1))
        se_visited[r][cols - 1] = True
    for c in range(cols):
        se_queue.append((rows - 1, c))
        se_visited[rows - 1][c] = True

    bfs(grid, nw_queue, nw_visited)
    bfs(grid, se_queue, se_visited)

    result = 0

    for r in range(rows):
        for c in range(cols):
            if nw_visited[r][c] and se_visited[r][c]:
                result += 1
                coordinates.append((r, c))

    return result, coordinates
