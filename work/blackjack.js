import inquirer from 'inquirer'

class Card {
    constructor(point, suit) {
        this.point = point;
        this.suit = suit;
    }

    getPoint() {
        if (['J', 'Q', 'K'].includes(this.point)) {
            return 10
        }
        if (this.point === "A") {
            return 11
        }
        return this.point
    }

    display() {
        return `${this.point} of ${this.suit}`
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ['Spade', 'Heart', 'Diamond', 'Club'];
        const points = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

        for (const suit of suits) {
            for (const point of points) {
                this.cards.push(new Card(point, suit))
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    draw() {
        return this.cards.pop()
    }
}

class OnHand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card)
    }

    getScore() {
        let score = 0
        let aceCount = 0

        for (const card of this.cards) {
            score += card.getPoint()
            if (card.point === 'A') {
                aceCount++
            }
        }

        while (score > 21 && aceCount > 0) {
            score -= 10
            aceCount--
        }

        return score
    }

    displayCardOnHand() {
        return this.cards.map((card) => 
            card.display()).join('\n')
    }
}

class BlackJackGame {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle()
        this.playerHand = new OnHand();
        this.dealerHand = new OnHand();
        this.gameOver = false
    }

    async start() {
        this.playerHand.addCard(this.deck.draw())
        this.playerHand.addCard(this.deck.draw())
        this.dealerHand.addCard(this.deck.draw())
        this.dealerHand.addCard(this.deck.draw())
        
        let playerTurn = true

        while(playerTurn) {

            console.log("-------------------------")

            console.log(`Player's Hand: ${this.playerHand.displayCardOnHand()}\nTotal: ${this.playerHand.getScore()}`)
            console.log(`Dealer's Hand: ${this.dealerHand[0].displayCardOnHand()}\nTotal: ${this.dealerHand.getScore()}`)

            console.log("-------------------------")

            const answers = await inquirer.prompt[
                {
                    type: "list",
                    name: "action",
                    message: "Choose an action:",
                    choices: ["Hit", "Stand"]
                }
            ]

            if (action === "Hit") {
                this.playerHand.addCard(this.deck.cards.draw())
            } else {
                playerTurn = false
            }
        }
    }
}

async function main() {
    console.log("Welcome To Blackjack!!")

    const game = new BlackJackGame()
    game.start()
    game.showHand()

    const answers = await inquirer.prompt[
        {
            type: "confirm",
            name: "continuePlaying",
            message: "Do you want to play again?",
            default: true
        }
    ]

    if (action === "Hit") {

    }
}

main()