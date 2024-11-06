
import Chips from './chips';
import Card from './card';

export default class player {
    constructor(name = "Player", initialChips = 100) {
        this.name = name;
        this.hand = []; // holds the player's current hand of cards
        this.chips = new Chips(initialChips); // instance of Chips to manage the player's betting chips
    }

    // adds a card to the player's hand
    addCard(card) {
        if (card instanceof Card) {
            this.hand.push(card);
        } else {
            throw new Error("Invalid card");
        }
    }

    // calculates the total value of the player's hand
    getHandValue() {
        let value = 0;
        let aces = 0;

        this.hand.forEach((card) => {
            value += card.getCardValue();
            if (card.value === "A") aces += 1;
        });

        // adjust for aces if total is over 21
        while (value > 21 && aces > 0) {
            value -= 10;
            aces -= 1;
        }

        return value;
    }

    // checks if the player has busted
    isBust() {
        return this.getHandValue() > 21;
    }

    // clears the player's hand (for a new round)
    resetHand() {
        this.hand = [];
    }

    // places a bet using the Chips class
    placeBet(amount) {
        this.chips.placeBet(amount);
    }

    // adds winnings to chips based on multiplier (1:1, 2:1, etc.)
    addWinnings(multiplier) {
        this.chips.addWinnings(multiplier);
    }

    // resets the player's bet if they lose
    loseBet() {
        this.chips.resetBet();
    }
}