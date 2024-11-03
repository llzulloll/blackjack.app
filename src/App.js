// App.js

import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createDeck, calculateHandValue } from "./src/blackjack";

export default function App() {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState("");

  const dealCards = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    const playerStartHand = [newDeck.pop(), newDeck.pop()];
    const dealerStartHand = [newDeck.pop(), newDeck.pop()];

    setPlayerHand(playerStartHand);
    setDealerHand(dealerStartHand);
    setGameStatus("ongoing");
  };

  const playerHit = () => {
    if (gameStatus !== "ongoing") return;
    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newPlayerHand = [...playerHand, newCard];

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    if (calculateHandValue(newPlayerHand) > 21) {
      setGameStatus("bust");
    }
  };

  const dealerPlay = () => {
    let newDealerHand = [...dealerHand];
    let newDeck = [...deck];

    while (calculateHandValue(newDealerHand) < 17) {
      const newCard = newDeck.pop();
      newDealerHand = [...newDealerHand, newCard];
    }

    setDealerHand(newDealerHand);
    setDeck(newDeck);
    determineWinner(newDealerHand);
  };

  const determineWinner = (newDealerHand) => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      setGameStatus("win");
    } else if (dealerValue > playerValue) {
      setGameStatus("lose");
    } else {
      setGameStatus("draw");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack Game</Text>
      <View style={styles.handContainer}>
        <Text>Player Hand: {calculateHandValue(playerHand)}</Text>
        {playerHand.map((card, index) => (
          <Text key={index}>{card.value} of {card.suit}</Text>
        ))}
      </View>
      <View style={styles.handContainer}>
        <Text>Dealer Hand: {calculateHandValue(dealerHand)}</Text>
        {dealerHand.map((card, index) => (
          <Text key={index}>{card.value} of {card.suit}</Text>
        ))}
      </View>
      <Text style={styles.status}>Game Status: {gameStatus}</Text>
      <Button title="Deal" onPress={dealCards} />
      <Button title="Hit" onPress={playerHit} />
      <Button title="Stand" onPress={dealerPlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  handContainer: {
    marginVertical: 10,
  },
  status: {
    fontSize: 18,
    marginVertical: 10,
  },
});