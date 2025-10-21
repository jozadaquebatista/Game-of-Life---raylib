import r from 'raylib'
import { generateGen, checkNeighbors, calcNextGen } from './utils.js'
import { GG } from './types.js'

r.SetTraceLogLevel(r.LOG_NONE)
r.InitWindow(GG.screen.w, GG.screen.h, "The GG Life")
r.SetTargetFPS(60)

GG.curr_gen = generateGen(GG.curr_gen)
GG.next_gen = [...GG.curr_gen]

while (!r.WindowShouldClose()) {

    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE)

    for(let x = 0, row = GG.curr_gen[x]; x < GG.curr_gen.length; x++, row = GG.curr_gen[x]) {
        GG.neighbors_mt[x] = []
        for(let y = 0, col = row[y]; y < row.length; y++, col = row[y]) {
            r.DrawRectangle(x*GG.cell.w, y*GG.cell.h, GG.cell.w, GG.cell.h, r.RED)
            r.DrawRectangle(x*GG.cell.w, y*GG.cell.h, GG.cell.w, GG.cell.h, (col ? GG.cell.c : r.WHITE))
            // #DEBUG r.DrawText(`(${x},${y})`, x*GG.cell.w+6, y*GG.cell.h+(GG.cell.h/6), 12, r.BLACK)
            GG.neighbors_mt[x].push(checkNeighbors(GG.curr_gen, x, y))
            // #DEBUG r.DrawText(`${GG.neighbors_mt[x][y]}`, x*GG.cell.w+6, y*GG.cell.h+(GG.cell.h/6), 12, r.BLACK)
        }
    }
    // #DEBUG r.DrawFPS(GG.screen.w-100, 10)
    r.EndDrawing()
    GG.curr_gen = calcNextGen(GG.next_gen)
}