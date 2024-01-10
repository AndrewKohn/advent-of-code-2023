import React, { useRef } from 'react';
import { useEffect, useState } from 'react';

enum TileSpace {
    NorthSouth = '|',
    EastWest = '-',
    NorthEast = 'L',
    NorthWest = 'J',
    SouthWest = '7',
    SouthEast = 'F',
    Ground = '.',
    Animal = 'S',
}

enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

interface Position {
    x: number;
    y: number;
}

const getStart = (input: string[]) => {
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === 'S') {
                return { x, y };
            }
        }
    }
};

const getPath = (input: string[], start: Position) => {
    const { x, y } = start;

    if (
        input[y + 1][x] === TileSpace.NorthSouth ||
        input[y + 1][x] === TileSpace.NorthEast ||
        input[y + 1][x] === TileSpace.NorthWest
    )
        return { dir: Direction.SOUTH, y: y + 1, x };

    if (
        input[y - 1][x] === TileSpace.NorthSouth ||
        input[y - 1][x] === TileSpace.SouthEast ||
        input[y - 1][x] === TileSpace.SouthWest
    )
        return { dir: Direction.NORTH, y: y - 1, x };

    return { dir: Direction.EAST, y, x: x + 1 };
};

function App() {
    const [input, setInput] = useState<string[]>([]);
    const [paths, setPaths] = useState<Position[]>([]);
    const stepsRef = useRef<number>(0);
    // useEffect(() => {
    //     fetch('../diagramSample.txt')
    //         .then(res => res.text())
    //         .then(data => setInput(data.split('\n')));
    // }, []);

    useEffect(() => {
        fetch('../diagram.txt')
            .then(res => res.text())
            .then(data => setInput(data.split('\n')));
    }, []);

    useEffect(() => {
        if (input) {
            const start = getStart(input);
            if (start) {
                let { dir, y, x } = getPath(input, start);
                const path = [start, { x, y }];
                let steps = 1; // init w/ one step since getPath was called

                while (x !== start.x || y !== start.y) {
                    let candidateX = 0;
                    let candidateY = 0;

                    switch (`${input[y][x]} : ${dir}`) {
                        case `${TileSpace.NorthSouth} : ${Direction.NORTH}`:
                            candidateY = -1;
                            break;
                        case `${TileSpace.NorthSouth} : ${Direction.SOUTH}`:
                            candidateY = 1;
                            break;
                        case `${TileSpace.EastWest} : ${Direction.EAST}`:
                            candidateX = 1;
                            break;
                        case `${TileSpace.EastWest} : ${Direction.WEST}`:
                            candidateX = -1;
                            break;
                        case `${TileSpace.NorthEast} : ${Direction.SOUTH}`:
                            candidateX = 1;
                            break;
                        case `${TileSpace.NorthEast} : ${Direction.WEST}`:
                            candidateY = -1;
                            break;
                        case `${TileSpace.NorthWest} : ${Direction.SOUTH}`:
                            candidateX = -1;
                            break;
                        case `${TileSpace.NorthWest} : ${Direction.EAST}`:
                            candidateY = -1;
                            break;
                        case `${TileSpace.SouthWest} : ${Direction.NORTH}`:
                            candidateX = -1;
                            break;
                        case `${TileSpace.SouthWest} : ${Direction.EAST}`:
                            candidateY = 1;
                            break;
                        case `${TileSpace.SouthEast} : ${Direction.NORTH}`:
                            candidateX = 1;
                            break;
                        case `${TileSpace.SouthEast} : ${Direction.WEST}`:
                            candidateY = 1;
                            break;
                        default:
                            break;
                    }

                    if (candidateY === -1) dir = Direction.NORTH;
                    if (candidateX === 1) dir = Direction.EAST;
                    if (candidateY === 1) dir = Direction.SOUTH;
                    if (candidateX === -1) dir = Direction.WEST;

                    x += candidateX;
                    y += candidateY;
                    steps++;
                    stepsRef.current = steps;
                    path.push({ x, y });
                }
                if (path.length > 0) setPaths(path);
            }
        }
    }, [input]);

    return (
        <main style={mainStyles}>
            <h1 style={{ marginBottom: '4rem' }}>Day 10</h1>
            <p>{`Steps: ${stepsRef.current}`}</p>
            <p style={{ marginBottom: '4rem' }}>{`p1: ${
                stepsRef.current / 2
            }`}</p>
            <Tiles input={input} paths={paths} />
        </main>
    );
}

/////////////////////////////////////////////////////////////////
// Tiles Component
interface TilesProps {
    input: string[];
    paths: Position[];
}

const Tiles = React.memo(({ input, paths }: TilesProps) => {
    const displayTiles = (lineValues: string[], y: number) => {
        return lineValues.map((tile: string, key: number) => {
            const isSelectedTile: boolean = paths.some(
                (pos: Position) => pos.x === key && pos.y === y
            );

            return (
                <Tile char={tile} isSelectedTile={isSelectedTile} key={key} />
            );
        });
    };

    const line = Object.values(input).map((tiles: string, key: number) => (
        <div style={lineStyle} key={key}>
            {displayTiles(tiles.split(''), key)}
        </div>
    ));

    return line ? line : null;
});

/////////////////////////////////////////////////////////////////
// Tile Component
interface TileProps {
    char: string;
    isSelectedTile: boolean;
}

const Tile = React.memo(({ char, isSelectedTile }: TileProps) => {
    return (
        <div
            style={{ ...blockStyle, ...(isSelectedTile ? selectedBlock : {}) }}
        >
            <p
                style={{
                    ...tileStyle,
                    ...(isSelectedTile ? hideTile : {}),
                }}
            >
                {char}
            </p>
        </div>
    );
});

/////////////////////////////////////////////////////////////////
// CSS
const mainStyles: React.CSSProperties = {
    marginTop: '8rem',
    backgroundColor: '#0b1215',
    color: '#f3f3f3',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '18rem',
};

const lineStyle: React.CSSProperties = {
    display: 'flex',
};

const blockStyle: React.CSSProperties = {
    width: '1.2rem',
    height: '1.2rem',
    boxSizing: 'border-box',
    border: '1px solid rgba(255, 255, 0, 0.5)',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    position: 'relative',
};

const selectedBlock: React.CSSProperties = {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
};

const tileStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    fontWeight: '700',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
};

const hideTile: React.CSSProperties = {
    display: 'none',
};

export default App;
