const fs = require('fs');
const path = require('path');
const filePath = 'day7-cardBets.txt';

// Day 7 part 1

function partOne(filePath) {
    const input = fs
        .readFileSync(path.resolve(__dirname, filePath), 'utf8')
        .split('\n');

    const playerCards = input.map(cardHand => {
        let s = cardHand.split(/\s/);
        const cards = s[0]
            .split('')
            .map(card => translateCard(card))
            .sort((num1, num2) => num1 - num2);
        const bet = parseInt(s[1]);

        return [cards, bet];
    });

    for (let i = 0; i < playerCards.length; i++) {
        const matches = evaluateCards(playerCards[i][0]);

        console.log(matches);
    }
}

// Gives face cards a value
function translateCard(card) {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        case 'T':
            return 10;
        default:
            return parseInt(card);
    }
}

// returns a cards number of occurrences in players hand.  [card, # of occurrence]
function evaluateCards(cards) {
    const numberOfMatchingCards = [];
    let prev = cards[0];
    let count = 0;

    for (let i = 1; i < cards.length; i++) {
        if (cards[i] === prev) {
            count++;
        } else {
            if (count > 0) {
                numberOfMatchingCards.push([prev, count + 1]);
                count = 0;
            }
        }

        if (i === cards.length - 1 && count > 0)
            numberOfMatchingCards.push([prev, count + 1]);

        prev = cards[i];
    }

    if (numberOfMatchingCards.length > 1) {
        let count = 0;
        for (const matches of numberOfMatchingCards) {
            count += matches[1];
        }

        if (count > 4) return 'fullHouse';
        else return 'twoPair';
    }

    return numberOfMatchingCards;
}

// function groupCards(cards) {
//     const fiveOfAKind = [];
//     const fourOfAKind = [];
//     const fullHouse = [];
//     const threeOfAKind = [];
//     const twoPair = [];
//     const onePair = [];
//     const highCard = [];

//     for (let i = 0; i < cards.length; i++) {
//         const currentHand = evaluateCards(cards[i][0]);

//         // high card
//         if (currentHand.length === 0) highCard.push(cards[i]);
//     }
// }

partOne(filePath);
