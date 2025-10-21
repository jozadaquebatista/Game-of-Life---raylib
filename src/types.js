import r from 'raylib'

// Game Globals
export const GG = {
    curr_gen: [],
    next_gen: [],
    neighbors_mt: [],
    screen: { w: 1024, h: 768 },
    cell: { x: 0, y: 0, w: 4, h: 4, c: r.BLACK } // to increase game scale decrease w and h
}