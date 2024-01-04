import { useEffect, useState } from 'react';

enum Tile {
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
    South,
    East,
    West,
}

function App() {
    const [input, setInput] = useState<string[]>([]);
    useEffect(() => {
        fetch('../diagramSample.txt')
            .then(res => res.text())
            .then(data => setInput(data.split('\n')));
    }, []);

    // TODO:
    // have a block for each char
    // render each tile with a padding to create the block
    // each render matches the original

    // const tiles: JSX.Element[] | undefined =
    //     input.length > 0
    //         ? input.map((line: string, key: number) => (
    //   <div style={blockStyle} key={key}>
    //       <p style={tileStyle}>{line}</p>
    //   </div>
    //           ))
    //         : undefined;

    return (
        <main style={mainStyles}>
            <h1>Day 10</h1>
            {/* <div>{tiles ? tiles : ''}</div> */}
        </main>
    );
}

const mainStyles = {
    backgroundColor: '#0b1215',
    color: '#f3f3f3',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // NOTE: Error w/ main element w/o this 'const' declaration...
    flexDirection: 'column' as const,
};

const blockStyle = {
    padding: '2rem',
    backgroundColor: '#777',
};

const tileStyle = {};

export default App;
