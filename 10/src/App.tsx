import React, { useEffect, useRef, useState } from 'react';

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

const setRays = (len: number) => {
    const rayLoop: boolean[][] = [];
    for (let y = 0; y < len; y++) rayLoop[y] = [];
    return rayLoop;
};

function App() {
    const [currentFile, setCurrentFile] = useState<string>(
        '../diagramSample1.txt'
    );
    const [input, setInput] = useState<string[]>([]);
    const [paths, setPaths] = useState<Position[]>([]);
    const [possibleNests, setPossibleNests] = useState<Position[]>([]);
    const stepsRef = useRef<number>(0);
    const nestsRef = useRef<number>(0);

    // init
    useEffect(() => {
        fetch('../diagramSample1.txt')
            .then(res => res.text())
            .then(data => setInput(data.split('\n')));
    }, []);

    const fetchData = (file: string) => {
        if (file !== currentFile) {
            setPaths([]);
            setPossibleNests([]);
            setCurrentFile(file);
            fetch(file)
                .then(res => res.text())
                .then(data => setInput(data.split('\n')));
        }
    };

    useEffect(() => {
        if (input) {
            const start = getStart(input);
            if (start) {
                const rays: boolean[][] = setRays(input.length);
                let { dir, y, x } = getPath(input, start);
                const path = [start, { x, y }];
                let steps = 1; // init w/ one step since getPath was called
                rays[start.y][start.x] = true;
                rays[y][x] = true;

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
                    rays[y] = rays[y] || [];
                    rays[y][x] = true;
                    steps++;
                    stepsRef.current = steps;
                    path.push({ x, y });
                }
                if (path.length > 0) {
                    setPaths(path);

                    const nests: Position[] = [];
                    let count = 0;
                    for (let y = 0; y < input.length; y++) {
                        let intersects = 0;
                        const line = input[y];
                        let corner: boolean | string = false;

                        for (let x = 0; x < line.length; x++) {
                            if (rays[y][x]) {
                                const current = input[y][x];
                                if (current === TileSpace.NorthSouth) {
                                    intersects++;
                                } else if (current !== TileSpace.EastWest) {
                                    if (corner) {
                                        if (
                                            corner === TileSpace.NorthEast &&
                                            current === TileSpace.SouthWest
                                        ) {
                                            intersects++;
                                        } else if (
                                            corner === TileSpace.SouthEast &&
                                            current === TileSpace.NorthWest
                                        ) {
                                            intersects++;
                                        }
                                        corner = false;
                                    } else {
                                        corner = current;
                                    }
                                }
                            } else if (intersects % 2 === 1) {
                                nests.push({ x, y });
                                count++;
                            }
                        }
                    }
                    setPossibleNests(nests);
                    nestsRef.current = count;
                }
            }
        }
    }, [input]);

    return (
        <main style={mainStyles}>
            <h1 style={{ marginBottom: '4rem' }}>Day 10</h1>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button
                    style={{
                        ...buttonStyle,
                        ...(currentFile === '../diagramSample1.txt'
                            ? selectedButton
                            : {}),
                    }}
                    onClick={() => fetchData('../diagramSample1.txt')}
                >
                    Data 1
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        ...(currentFile === '../diagramSample2.txt'
                            ? selectedButton
                            : {}),
                    }}
                    onClick={() => fetchData('../diagramSample2.txt')}
                >
                    Data 2
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        ...(currentFile === '../diagram.txt'
                            ? selectedButton
                            : {}),
                    }}
                    onClick={() => fetchData('../diagram.txt')}
                >
                    Data 3
                </button>
            </div>
            <p>{`Steps: ${stepsRef.current}`}</p>
            <p>{`Part one: ${stepsRef.current / 2} steps`}</p>
            <p
                style={{ marginBottom: '4rem' }}
            >{`Part two: ${nestsRef.current} potential nests`}</p>
            <Tiles input={input} paths={paths} possibleNests={possibleNests} />
        </main>
    );
}

/////////////////////////////////////////////////////////////////
// Tiles Component
interface TilesProps {
    input: string[];
    paths: Position[];
    possibleNests: Position[];
}

const Tiles = React.memo(({ input, paths, possibleNests }: TilesProps) => {
    const displayTiles = (lineValues: string[], y: number) => {
        return lineValues.map((tile: string, x: number) => {
            const isSelectedTile: boolean = paths.some(
                (pos: Position) => pos.x === x && pos.y === y
            );

            const isNestTile: boolean = possibleNests.some(
                (pos: Position) => pos.x === x && pos.y === y
            );

            return (
                <Tile
                    char={tile}
                    isSelectedTile={isSelectedTile}
                    isNestTile={isNestTile}
                    key={x}
                />
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
    isNestTile: boolean;
}

const Tile = React.memo(({ char, isSelectedTile, isNestTile }: TileProps) => {
    const displayTile = (char: string) => {
        switch (char) {
            case TileSpace.NorthSouth:
                return '│';
            case TileSpace.EastWest:
                return '─';
            case TileSpace.NorthEast:
                return '└';
            case TileSpace.NorthWest:
                return '┘';
            case TileSpace.SouthWest:
                return '┐';
            case TileSpace.SouthEast:
                return '┌';
            case TileSpace.Ground:
                return ' ';
            default:
                return char;
        }
    };

    const tile = displayTile(char);

    return (
        <div
            style={{
                ...blockStyle,
                ...(isSelectedTile ? selectedBlock : {}),
                // ...(isNestTile
                //     ? {
                //           backgroundColor: 'rgba(255, 255, 0, 0.5)',
                //       }
                //     : {}),
            }}
        >
            <div
                style={{
                    ...tileContainer,
                    ...(char === 'S' ? { backgroundColor: '#f3f3f385' } : {}),
                }}
            >
                <p
                    style={{
                        ...tileStyle,
                        ...(isSelectedTile ? selectedTile : {}),
                        ...(char === 'S' ? animalTile : {}),
                        // ...(isNestTile
                        //     ? {
                        //           color: 'rgba(255, 255, 0, 1)',
                        //       }
                        //     : {}),
                    }}
                >
                    {tile}
                </p>
            </div>
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
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
};

const selectedBlock: React.CSSProperties = {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
};

const tileContainer: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
};

const tileStyle: React.CSSProperties = {
    fontSize: '2rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: '700',
    color: 'rgba(255, 0, 0, 1)',
};

const selectedTile: React.CSSProperties = {
    color: 'rgba(0, 255, 0, 1)',
};

const animalTile: React.CSSProperties = {
    color: '#0b1215',
    fontSize: '1.2rem',
};

const buttonStyle: React.CSSProperties = {
    border: 'none',
    backgroundColor: '#ccc',
    color: '#333',
    fontWeight: '700',
    padding: '0.4rem',
    borderRadius: '5px',
    marginBottom: '1.2rem',
    cursor: 'pointer',
};

const selectedButton: React.CSSProperties = {
    pointerEvents: 'none',
    backgroundColor: '#77777775',
    color: '#111',
};

export default App;
