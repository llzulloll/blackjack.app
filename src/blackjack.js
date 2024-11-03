// src/blackjack.js

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5); // Shuffle deck
};

export const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
        if (card.value === "A") {
            aces += 1;
            value += 11;
        } else if (["K", "Q", "J"].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    });

    while (value > 21 && aces) {
        value -= 10;
        aces -= 1;
    }

    return value;
};