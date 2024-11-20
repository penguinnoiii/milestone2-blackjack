import inquirer from 'inquirer';

class Card {
  constructor(point, suit) {
    this.point = point;
    this.suit = suit;
  }

  getPoint() {
    if (["J", "Q", "K"].includes(this.point)) {
      return 10;
    }
    if (this.point === "A") {
      return 11;
    }
    return this.point;
  }

  display() {
    return `${this.point} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["Spade", "Heart", "Diamond", "Club"];
    const points = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

    for (const suit of suits) {
      for (const point of points) {
        this.cards.push(new Card(point, suit));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = (Math.floor(Math.random() * i));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop();
  }
}

class OnHand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getScore() {
    let score = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      score += card.getPoint();
      if (card.point === "A") {
        aceCount++;
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  // displayCardOnHand() {
  //   return this.cards.map((card) => card.display()).join("\n");
  // }
}

class BlackJackGame {
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.playerHand = new OnHand();
    this.dealerHand = new OnHand();
    this.gameOver = false;
  }

  showHand(player, dealer, revealDealerHand = false) {
    console.log("-------------------------");

    console.log("Player's Hand: ")
    player.cards.forEach(card => {
      console.log(card.display())
    });
    console.log("Total: ", player.getScore())

    console.log("Dealer's Hand: ")
    if (revealDealerHand) {
      dealer.cards.forEach(card => {
        console.log(card.display())
      });
    } else {
      console.log(dealer.cards[0].display())
      console.log("{Hidden Card")
    }

    console.log("-------------------------");
  }

  async start() {
    this.playerHand.addCard(this.deck.draw());
    this.playerHand.addCard(this.deck.draw());
    this.dealerHand.addCard(this.deck.draw());
    this.dealerHand.addCard(this.deck.draw());


    let playerTurn = true;

    while (playerTurn) {

      this.showHand(this.playerHand, this.dealerHand, false)

      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Choose an action:",
          choices: ["Hit", "Stand"],
        }
      ]);

      if (answers.action === "Hit") {
        this.playerHand.addCard(this.deck.draw());
        if (this.playerHand.getScore() > 21) {
          console.log("You busted! Dealer win")
          this.showPlayerHand()
          return
        }
      } else {
        playerTurn = false;
      }
    }

    if (this.dealerHand.getScore() < 17) {
      this.dealerHand.addCard(this.deck.draw());
      if (this.dealerHand.getScore() > 21) {
        console.log("Dealer Bust! You win")
      }
    } 

    if (this.playerHand.getScore() > this.dealerHand.getScore()) {
      console.log("Player win!")
    } else if (this.playerHand.getScore() < this.dealerHand.getScore()) {
      console.log("Dealer win!")
    } else {
      console.log("It's a push!")
    }
  }
}

async function main() {
  console.log("Welcome To Blackjack!!");

  let playing = true;

  while (playing) {
    const game = new BlackJackGame();
    await game.start();

    const again = await inquirer.prompt([
      {
        type: "confirm",
        name: "continuePlaying",
        message: "Do you want to play again?",
        default: false,
      }
    ]);

    playing = again
  }

  console.log("Thank you for playing Blackjack!!!")
}

main(); 