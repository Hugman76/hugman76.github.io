import {observer} from 'mobx-react-lite'

function Keyboard({ store }) {
    const qwerty = ['qwertyuiop', 'asdfghjkl', '+zxcvbnm<']
    return (
        <div>
            {qwerty.map((row) => (
                <div className="flex justify-center">
                    {row.split('').map((char) => {
                        const bgColor = store.exactGuesses.includes(char)
                            ? 'bg-green-500 hover:bg-green-600'
                            : store.inexactGuesses.includes(char)
                                ? 'bg-yellow-400 hover:bg-yellow-500'
                                : store.allGuesses.includes(char)
                                    ? 'bg-gray-400 hover:bg-gray-500'
                                    : 'bg-gray-200 hover:bg-gray-300'

                        const width = ('+' === char || '<' === char) ? 'w-20' : 'w-11'
                        const text = '+' === char ? 'Enter' : '<' === char ? '<-' : char
                        const input = '+' === char ? 'Enter' : '<' === char ? 'Backspace' : char
                        return (
                            <button onClick={() => store.enterKey(input)}
                                    className={`flex h-16 ${width} rounded-lg m-0.5 items-center justify-center
                                    text-lg font-bold uppercase
                                    ${bgColor}
                                    active:translate-y-px transition-transform
                                    cursor-pointer`}>
                                {text}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default observer(Keyboard);