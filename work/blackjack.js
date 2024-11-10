import inquirer from 'inquirer'

class Cards {
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
        this.card = [];
        const suits = ['Spade', 'Heart', 'Diamond', 'Club'];
        const points = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

        for (const suit of suits) {
            for (const point of points) {
                this.card.push(new this.card(point, suit))
            }
        }
    }

    shuffle() {
        for (let i = this.card.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            [this.card[i], this.card[j]] = [this.card[j], this.card[i]]
        }
    }

    draw() {
        return this.card.pop()
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
        return this.cards.map((card) => {
            card.display().join('\n')
        })
    }
}

class BlackJackGame {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle()
        this.playerHand = new OnHand();
        this.dealerrHand = new OnHand();
        this.gameOver = false
    }

    start() {
        this.playerHand.addCard(this.deck.draw())
        this.playerHand.addCard(this.deck.draw())
        this.dealerHand.addCard(this.deck.draw())
        this.dealerHand.addCard(this.deck.draw())
    }

    showHand() {
        console.log(`Player's Hand: ${this.playerHand.displayCardOnHand()}\nTotal: ${this.playerHand.getScore()}`)
        console.log(`Dealer's Hand: ${this.dealerHand.displayCardOnHand()}\nTotal: ${this.dealerHand.getScore()}`)
    }
}

async function main() {
    console.log("Welcome To Blackjack!!")

    const game = new BlackJackGame()
    await game.start()

    const answers = await inquirer.prompt[
        {
            type: "list",
            name: "hitOrStand",
            messge: "Choose an action:",
            choices: ["Hit", "Stand"]
        },
        {
            type: "confirm",
            name: "continuePlaying",
            message: "Do you want to play again?",
            default: true
        }
    ]
}

main()