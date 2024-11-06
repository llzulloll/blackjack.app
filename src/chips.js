export default class chips {

    constructor(initialAmount = 100) {
        this.total = initialAmount; // default starting amount
        this.bet = 0;
    }

    // place a bet from the player's total
    placeBet(amount) {
        if (amount > this.total) {
            throw new Error("Insufficient funds to place bet");
        }
        this.bet = amount;
        this.total -= amount;
    }

    // add winnings to the total based on bet multiplier 
    addWinnings(multiplier) {
        this.total += this.bet * multiplier;
        this.resetBet();
    }

    // reset the bet to zero if the player loses
    resetBet() {
        this.bet = 0;
    }
}