type Point = {
    x: number,
    y: number
}

export const scoreGuess = (guess: Point, answer: Point): number => {
    // maybe we want to scale this?
    // maybe we want the overall dimensions of the box?
    return Math.sqrt((answer.x - guess.x) ** 2 + (answer.y - guess.y) ** 2)
}
