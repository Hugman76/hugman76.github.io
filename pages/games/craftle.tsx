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
        <div className="h-full w-full bg-white dark:bg-slate-800 bg-scroll">
            <div className="flex py-8 flex-col items-center justify-center">
                <h1 className="bg-gradient-to-br from-red-400 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent uppercase mb-2">
                    Craftle
                </h1>
                <h2 className="text-3xl font-bold text-center dark:text-white mb-2">
                    Guess the Minecraft-related word!
                </h2>
                <div className="my-3">
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
                    <Keyboard store={store}/>
                )}
                {store.won &&
                    <h1 className="bg-gradient-to-br from-green-400 to-green-300 mb-2 bg-clip-text text-3xl font-bold text-transparent animate-bounce">You
                        won!</h1>}
                {store.lost && (
                    <>
                        <h1 className="bg-gradient-to-br from-red-400 to-red-300 mb-2 bg-clip-text text-3xl font-bold text-transparent">
                            You lost!
                        </h1>
                        <h2 className="bg-gradient-to-br from-gray-400 to-gray-200 mb-2 bg-clip-text text-3xl font-bold text-transparent">
                            The word was "{store.word}".
                        </h2>
                    </>
                )}
                {(store.won || store.lost) && (
                    <button
                        className="animate-pulse hover:animate-none rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white py-2 px-4 font-bold"
                        onClick={store.init}>
                        Play Again
                    </button>
                )}
            </div>
        </div>
    )
})
