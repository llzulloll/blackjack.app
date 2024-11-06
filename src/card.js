
export default class card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    // get the value of the card (2-10 = 2-10, J, Q, K = 10, A = 11)
    getCardValue() {
        if (this.value === "A") return 11; // aces are initially 11
        if (["K", "Q", "J"].includes(this.value)) return 10; // face cards are 10
        return parseInt(this.value); // numeric cards return their own value
    }

    // display card as a string (A of hearts)
    toString() {
        return `${this.value} of ${this.suit}`;
    }
}