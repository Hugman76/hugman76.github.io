import words from '../data/words.json'

export default {
    word: '',
    guesses: [] as string[],
    currentGuess: 0,
    init() {
        this.word = words[Math.trunc(Math.random() * words.length)]
        this.guesses.replace(new Array(6).fill(''))
        this.currentGuess = 0
    },
    get won() {
        return this.guesses[this.currentGuess - 1] === this.word
    },
    get lost() {
        return !this.won && this.currentGuess === 6
    },
    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    },
    get exactGuesses() {
        return (
            this.word
                .split('')
                // if any guesses include this letter in this position/index
                .filter(this.isCorrectGuess)
        )
    },
    isCorrectGuess(letter, i) {
        return this.guesses
            .slice(0, this.currentGuess)
            .map((word) => word[i])
            .includes(letter)
    },
    get inexactGuesses() {
        return this.word
            .split('')
            .filter(this.isInexactGuess)
    },
    isInexactGuess(letter) {
        return this.allGuesses.includes(letter)
    },
    submitGuess() {
        let guess = String (this.guesses[this.currentGuess]);
        if(words.includes(guess) && guess.length === this.word.length) {
            this.currentGuess++
        }
    },
    enterKey(key: string) {
        if (this.won || this.lost) {
            return
        }

        if (key === 'Enter') {
            return this.submitGuess()
        }


        if (key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            )
            return
        }

        if (this.guesses[this.currentGuess].length < this.word.length && key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess] + key.toLowerCase()
        }
    },
    handleKeydown(e) {
        this.enterKey(e.key)
    }
}