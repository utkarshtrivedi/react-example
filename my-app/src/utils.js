export function calculateWinner(squares) {
    squares = squares.flat();
    // check for winner
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                player: squares[a],
                indices: [a, b, c]
            };
        }
    }
    // check for remaining moves
    if (squares.some(square => !square)) {
        return {
            player: null,
            indices: []
        };
    }
    return {
        player: 'Draw',
        indices: []
    };
}
export function arrayClone(arr) {
    var i, copy;
    if (Array.isArray(arr)) {
        copy = arr.slice(0);
        for (i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
        }
        return copy;
    }
    else {
        return arr;
    }
}
export function convertRowColumnToIndices(row, column) {
    return (row * 3 + column);
}