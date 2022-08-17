export default function Guess({isGuessed, guess, word}) {
    return (
        <div className={`mb-2 grid grid-cols-${word.length} gap-2`}>
            {new Array(word.length).fill(0).map((_, i) => {
                let guessConfig = !isGuessed
                    ? 'bg-black'
                    : guess[i] === word[i]
                        ? 'correct bg-green-400'
                        : word.includes(guess[i])
                            ? 'partial bg-yellow-400'
                            : 'incorrect bg-gray-400'

                guessConfig += !isGuessed ? ' dark:border-2 dark:border-gray-400' : ''
                return (
                    <div className={`letter ${guessConfig} flex rounded-md h-16 aspect-square items-center justify-center font-bold text-3xl uppercase text-white`}>
                        {guess[i]}
                    </div>
                )
            })}
        </div>
    )
}