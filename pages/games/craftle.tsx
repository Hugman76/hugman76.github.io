import {observer, useLocalObservable} from "mobx-react-lite";
import {useEffect} from "react";

import Guess from '../../components/wordle/Guess'
import PuzzleStore from '../../stores/PuzzleStore'
import Keyboard from "../../components/wordle/Keyboard";

export default observer(function Home() {
    const store = useLocalObservable(() => PuzzleStore)
    useEffect(() => {
        store.init()
        console.log(store.word)
        window.addEventListener('keydown', store.handleKeydown)

        return () => {
            window.removeEventListener('keydown', store.handleKeydown)
        }
    }, [])
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-slate-800">
            <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-6xl font-bold uppercase text-transparent">
                Craftle
            </h1>
            <h2 className="bg-gradient-to-br from-red-400 to-yellow-400 mb-2 bg-clip-text text-3xl font-bold text-transparent">
                Guess the Minecraft feature!
            </h2>
            <div className="m-3">
            {store.guesses.map((_, i) => (
                <Guess
                    key={i}
                    word={store.word}
                    guess={store.guesses[i]}
                    isGuessed={i < store.currentGuess}
                />
            ))}
            </div>
            {store.won && <h1>You won!</h1>}
            {store.lost && <h1>You lost!</h1>}
            {(store.won || store.lost) && (
                <button onClick={store.init}>Play Again</button>
            )}
            {!store.won && !store.lost && (
                <Keyboard store={store} />
            )}
        </div>
    )
})
