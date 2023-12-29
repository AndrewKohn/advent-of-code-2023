const fs = require('fs');
const filePath = 'day7-cardBets.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
    let lines = data.split('\n');

    lines.sort((a, b) => {
        const handA = a.split(' ')[0];
        const handB = b.split(' ')[0];

        return sortHands(handA, handB);
    });

    const wins = lines.reverse().reduce((acc, line, i) => {
        const bet = line.split(' ')[1];
        acc += bet * (i + 1);
        return acc;
    }, 0);

    console.log(wins);
});

function sortHands(a, b) {
    // will pull the hand w/ the greatest card strength
    const handRankA = getAllPossibleValues(a)
        .map(hand => getHandRank(hand))
        .sort((a, b) => b - a)[0];
    const handRankB = getAllPossibleValues(b)
        .map(hand => getHandRank(hand))
        .sort((a, b) => b - a)[0];

    if (handRankA > handRankB) return -1; // A wins
    if (handRankB > handRankA) return 1; // B wins

    return compareCards(a, b); //  A & B are same rank and will check other card values in hand
}

function getHandRank(cards) {
    const handSet = getHandSet(cards);
    let hasPair = false;
    let hasThreeMatches = false;

    for (const key in handSet) {
        const val = handSet[key];

        if (val === 5) return 7; // five of a kind
        if (val === 4) return 6; // four of a kind
        if ((val === 3 && hasPair) || (val === 2 && hasThreeMatches)) return 5; // full house
        if (val === 2 && hasPair) return 3; // two pairs
        if (val === 3) hasThreeMatches = true;
        if (val === 2) hasPair = true;
    }

    if (hasThreeMatches) return 4; // three of a kind
    if (hasPair) return 2; // one pair

    return 1; // high card
}

function getHandSet(cards) {
    const handSet = {};

    // Checks for amount of matching cards
    for (let i = 0; i < cards.length; i++) {
        handSet[cards[i]] = handSet[cards[i]] || 0;
        handSet[cards[i]] += 1;
    }

    return handSet;
}

function compareCards(a, b) {
    for (let i = 0; i < a.length; i++) {
        const cardA = translateCard(a[i]);
        const cardB = translateCard(b[i]);

        if (cardA > cardB) return -1; // A wins
        if (cardB > cardA) return 1; // B wins
    }

    return 0;
}

// Gives face cards a number value, else returns a number
function translateCard(card) {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 0;
        case 'T':
            return 10;
        default:
            return parseInt(card);
    }
}

function getAllPossibleValues(cards) {
    if (!/J/.test(cards)) return [cards]; // No jokers

    const handSet = getHandSet(cards);
    const possibleHands = [];
    for (const key in handSet) {
        possibleHands.push(cards.replace(/J/g, key));
    }

    return possibleHands; // Contains array of possible hands
}
