import { GG } from './types.js'

export function generateGen(curr_gen) {

    if(curr_gen.length > 0) return curr_gen

    for (let xPos = 0, nx = 0; xPos < GG.screen.w; xPos += GG.cell.w, nx++) {
        curr_gen[nx] = []
        for (let yPos = 0, ny = 0; yPos < GG.screen.h; yPos += GG.cell.h, ny++)
            curr_gen[nx].push(Math.round(Math.random()))
    }
    return curr_gen
}

export function calcNextGen(next_gen) {
    for(let x = 0, row = next_gen[x]; x < next_gen.length; x++, row = next_gen[x]) {
        for(let y = 0, col = row[y]; y < row.length; y++, col = row[y]) {
            next_gen[x][y] = applyWorldRules(next_gen[x][y], GG.neighbors_mt[x][y])
        }
    }

    return next_gen
}

export function checkNeighbors(curr_gen, x, y) {

    
    let n = 0

    n += (curr_gen[x]||0) && (curr_gen[x][y-1]||0)
    n += (curr_gen[x]||0) && (curr_gen[x][y+1]||0)

    n += (curr_gen[x-1]||0) && (curr_gen[x-1][y]||0)
    n += (curr_gen[x-1]||0) && (curr_gen[x-1][y-1]||0)
    n += (curr_gen[x-1]||0) && (curr_gen[x-1][y+1]||0)

    n += (curr_gen[x+1]||0) && (curr_gen[x+1][y]||0)
    n += (curr_gen[x+1]||0) && (curr_gen[x+1][y-1]||0)
    n += (curr_gen[x+1]||0) && (curr_gen[x+1][y+1]||0)

    return n
}

export function applyWorldRules(curr_state, neighbors) {

    if(curr_state) {
        if(neighbors < 2)
            return false
        if(neighbors == 2 || neighbors == 3)
            return true
        if(neighbors > 3)
            return false
    }

    if(neighbors == 3)
        return true

    return false
}