export default function Guess({isGuessed, guess, word}) {
    return (
        <div className={`mb-2 grid grid-cols-${word.length} gap-2`}>
            {new Array(word.length).fill(0).map((_, i) => {
                const bgColor = !isGuessed
                    ? 'bg-black'
                    : guess[i] === word[i]
                        ? 'bg-green-400'
                        : word.includes(guess[i])
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'

                return (
                    <div className={`flex border-2 rounded-md border-gray-400 h-16 w-16 items-center justify-center border font-bold uppercase text-white ${bgColor}`}>
                        {guess[i]}
                    </div>
                )
            })}
        </div>
    )
}