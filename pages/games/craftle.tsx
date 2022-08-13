import {observer, useLocalObservable} from "mobx-react-lite";
import {useEffect} from "react";

import Guess from '../../components/wordle/Guess'
import PuzzleStore from '../../stores/PuzzleStore'
import Keyboard from "../../components/wordle/Keyboard";

export default observer(function Home() {
    const store = useLocalObservable(() => PuzzleStore)
    useEffect(() => {
        store.init()
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
                Guess the Minecraft-related word!
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
            {!store.won && !store.lost && (
                <Keyboard store={store} />
            )}
            {store.won && <h1 className="bg-gradient-to-br from-green-400 to-green-300 mb-2 bg-clip-text text-3xl font-bold text-transparent">You won!</h1>}
            {store.lost && (
                <>
                    <h1 className="bg-gradient-to-br from-red-400 to-red-300 mb-2 bg-clip-text text-3xl font-bold text-transparent">You lost!</h1>
                    <h2 className="bg-gradient-to-br from-gray-400 to-gray-200 mb-2 bg-clip-text text-3xl font-bold text-transparent">The word was "{store.word}".</h2>
                </>
            )}
            {(store.won || store.lost) && (
                <button className="rounded-full bg-orange-400 py-2 px-4 font-bold" onClick={store.init}>Play Again</button>
            )}
        </div>
    )
})
