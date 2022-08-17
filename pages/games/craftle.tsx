import {observer, useLocalObservable} from "mobx-react-lite";
import {useEffect} from "react";

import Guess from '../../components/wordle/Guess'
import PuzzleStore from '../../stores/WordleStore'
import Keyboard from "../../components/wordle/Keyboard";
import Head from "next/head";

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
        <div className="h-full w-full bg-white dark:bg-slate-800 bg-scroll">
            <Head>
                <title>Craftle</title>
            </Head>
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
                            The word was '{store.word}'.
                        </h2>
                    </>
                )}
                {(store.won || store.lost) && (
                    <span className="inline mb-2">
                        <button
                            id="copy-button"
                            className="rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-green-600 text-white py-2 px-4 mr-1 font-bold"
                            onClick={store.copy}>
                            Copy Result
                        </button>
                        {/* <button
                            id="tweet-button"
                            className="rounded-md bg-sky-400 hover:bg-sky-500 text-white py-2 px-4 ml-1 font-bold"
                            onClick={store.tweet}>
                            Tweet
                        </button> */}
                    </span>
                )}
            </div>
        </div>
    )
})
