import {observer} from 'mobx-react-lite'

function Keyboard({ store }) {
    const qwerty = ['qwertyuiop', ' asdfghjkl ', '+zxcvbnm<']
    return (
        <div className="w-full max-w-lg">
            {qwerty.map((row) => {
                let cols = row.length
                if(row.match(/\+/)) cols++
                if(row.match(/</)) cols++
                cols = cols + Math.trunc((row.match(/ /) || []).length / 2);
                return <div className={`grid grid-cols-${cols} gap-1`}>
                    {row.split('').map((char) => {
                        const bgColor = store.exactGuesses.includes(char)
                            ? 'bg-green-500 hover:bg-green-600'
                            : store.inexactGuesses.includes(char)
                                ? 'bg-yellow-400 hover:bg-yellow-500'
                                : store.allGuesses.includes(char)
                                    ? 'bg-gray-400 hover:bg-gray-500'
                                    : 'bg-gray-200 hover:bg-gray-300'

                        if(char === ' ') return <div></div>
                        const text = '+' === char ? 'Enter' : '<' === char ? '<-' : char
                        const input = '+' === char ? 'Enter' : '<' === char ? 'Backspace' : char
                        const colspan = ('+' === char || '<' === char) ? 'col-span-2': ''
                        return (
                            <button onClick={() => store.enterKey(input)}
                                    className={`h-16 w-full ${colspan} rounded-lg m-0.5 items-center justify-center
                                    text-lg font-bold uppercase
                                    ${bgColor}
                                    active:translate-y-px transition-transform
                                    cursor-pointer`}>
                                {text}
                            </button>
                        )
                    })}
                </div>
            })}
        </div>
    )
}

export default observer(Keyboard);