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
    return [[int(r) for r in row] for row in data]


def bfs(grid, queue, visited):
    rows, cols = len(grid), len(grid[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # Up, Down, Left, Right

    while queue:
        r, c = queue.popleft()

        for dr, dc in directions:
            new_r, new_c = r + dr, c + dc

            if (
                0 <= new_r < rows
                and 0 <= new_c < cols
                and not visited[new_r][new_c]
                and grid[new_r][new_c] >= grid[r][c]
            ):
                visited[new_r][new_c] = True
                queue.append((new_r, new_c))


def find_cells_that_can_flow_to_both_oceans(grid):
    rows, cols = len(grid), len(grid[0])
    coordinates = []
    results = 0

    nw_visited = [[False] * cols for _ in range(rows)]
    se_visited = [[False] * cols for _ in range(rows)]

    nw_queue = deque()
    se_queue = deque()

    # Identify the NW edges - first row / leftmost col
    for c in range(cols):
        nw_queue.append((0, c))
        nw_visited[0][c] = True
    for r in range(rows):
        nw_queue.append((r, 0))
        nw_visited[r][0] = True

    # Identify the SE edges - last row / rightmost col
    for c in range(cols):
        se_queue.append((rows - 1, c))
        se_visited[rows - 1][c] = True
    for r in range(rows):
        se_queue.append((r, cols - 1))
        se_visited[r][cols - 1] = True

    bfs(grid, nw_queue, nw_visited)
    bfs(grid, se_queue, se_visited)

    for r in range(rows):
        for c in range(cols):
            if nw_visited[r][c] and se_visited[r][c]:
                results += 1
                coordinates.append((r, c))

    return results, coordinates
