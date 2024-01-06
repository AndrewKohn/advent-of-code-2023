import { useEffect, useState } from 'react';

// enum Tile {
//     NorthSouth = '|',
//     EastWest = '-',
//     NorthEast = 'L',
//     NorthWest = 'J',
//     SouthWest = '7',
//     SouthEast = 'F',
//     Ground = '.',
//     Animal = 'S',
// }

// enum Direction {
//     North,
//     South,
//     East,
//     West,
// }

function App() {
    const [input, setInput] = useState<string[]>([]);
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
    return (
        <div style={blockStyle}>
            <p style={tileStyle}>{char}</p>
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
    width: '1.2rem',
    height: '1.2rem',
    boxSizing: 'border-box',
    border: '1px solid rgba(255, 255, 0, 0.5)',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    position: 'relative',
};

const tileStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: '700',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default App;
