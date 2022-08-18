import config from '../data/craftle.json'

const FIRST_DAY = new Date("08/17/2022");

export default {
    word: '',
    guesses: [] as string[],
    currentGuess: 0,
    init() {
        const now = new Date();
        this.word = config.pool[(now.getDay() * now.getMonth() * now.getFullYear()) % config.pool.length]
        this.guesses.replace(new Array(6).fill(''))
        this.currentGuess = 0
    },
    get won() {
        return this.guesses[this.currentGuess - 1] === this.word
    },
    get lost() {
        return !this.won && this.currentGuess === this.guesses.length
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
        if((config.pool.includes(guess) || config.other_words.includes(guess))&& guess.length === this.word.length) {
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
    },
    get result() {
        let number = Math.ceil(Math.abs(new Date().getTime() - FIRST_DAY.getTime()) / (1000 * 3600 * 24))
        let guessEmojis = ''
        const letters = document.getElementsByClassName('letter')
        for (let i = 0; i < letters.length; i++) {
            if(this.currentGuess === (i / this.word.length)) break
            if(i % this.word.length === 0) {
                guessEmojis += '\n'
            }
            guessEmojis += letters[i].className.match(/ correct/) ? '🟩' : letters[i].className.match(/ partial/) ? '🟨' : '⬛'
        }
        return `Craftle #${number} ${this.lost ? '💀' : this.currentGuess}/${this.guesses.length}\n${guessEmojis}\n\nhttps://hugman76.github.io/games/craftle`
    },
    copy() {
        let shareButton = document.getElementById("copy-button")

        navigator.clipboard.writeText(this.result).then(r => {
            const originalContent = shareButton.innerHTML;
            const originalClass = shareButton.className;
            shareButton.innerHTML = "Copied!"
            shareButton.className = originalClass + " animate-pulse"
            setTimeout(function() {
                shareButton.innerHTML = originalContent
                shareButton.className = originalClass
            }, 5000)
        });
    },
    tweet() {
        console.log(this.result)
        window.open(`https://twitter.com/intent/tweet?text=${(this.result).replace('#', '%23').replace(/\\n|\n/, '%0A')}&hashtags=Craftle`)
    }
}