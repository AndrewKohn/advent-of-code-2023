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
    North,
    East,
    South,
    West,
}

// const Directions = [
//     Direction.North,
//     Direction.East,
//     Direction.South,
//     Direction.West,
// ];

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

    console.log(x, y);
    console.log(input);

    // if(input[y +1][x] === '|' || input[y])
};

function App() {
    const [input, setInput] = useState<string[]>([]);
    // const [path, setPath] = useState<number[][]>([]);
    useEffect(() => {
        fetch('../diagramSample.txt')
            .then(res => res.text())
            .then(data => setInput(data.split('\n')));
    }, []);

    // useEffect(() => {
    //     fetch('../diagram.txt')
    //         .then(res => res.text())
    //         .then(data => setInput(data.split('\n')));
    // }, []);

    useEffect(() => {
        if (input) {
            const start = getStart(input);
            if (start) getPath(input, start);
        }
    }, [input]);

    // useEffect(() => {
    //     const start = getStart(input);

    //     if (start) setPath([start]);
    // }, [input]);

    // useEffect(() => {
    //     if (path) path.forEach((p: number[], i: number) => console.log(i, p));
    // }, [path]);

    return (
        <main style={mainStyles}>
            <h1 style={{ marginBottom: '4rem' }}>Day 10</h1>
            <Tiles input={input} />
        </main>
    );
}

/////////////////////////////////////////////////////////////////
// Tiles Component
interface TilesProps {
    input: string[];
}

const Tiles = ({ input }: TilesProps) => {
    const displayTiles = (lineValues: string[]) => {
        return lineValues.map((tile: string, key: number) => (
            <Tile char={tile} key={key} />
        ));
    };

    const line = Object.values(input).map((tiles: string, key: number) => (
        <div style={lineStyle} key={key}>
            {displayTiles(tiles.split(''))}
        </div>
    ));

    return line ? line : null;
};

/////////////////////////////////////////////////////////////////
// Tile Component
interface TileProps {
    char: string;
}

const Tile = ({ char }: TileProps) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            style={{ ...blockStyle, ...(hover ? selectedBlock : {}) }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p style={{ ...tileStyle, ...(hover ? selectedTile : {}) }}>
                {char}
            </p>
        </div>
    );
};

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
    // NOTE: Error w/ main element w/o this 'const' declaration...
    flexDirection: 'column' as const,
};

const lineStyle: React.CSSProperties = {
    display: 'flex',
};

const blockStyle: React.CSSProperties = {
    width: '3rem',
    height: '3rem',
    // width: '1.2rem',
    // height: '1.2rem',
    boxSizing: 'border-box',
    border: '1px solid rgba(255, 255, 0, 0.5)',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    position: 'relative',
};

const selectedBlock: React.CSSProperties = {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
};

const tileStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    // fontSize: '0.8rem',
    fontWeight: '700',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
};

const selectedTile: React.CSSProperties = {
    // fontSize: '1rem',
    fontSize: '2rem',
};

export default App;
