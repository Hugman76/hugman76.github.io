import {observer} from 'mobx-react-lite'

function Keyboard({ store }) {
    const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return (
        <div>
            {qwerty.map((row) => (
                <div className="flex justify-center">
                    {row.split('').map((char) => {
                        const bgColor = store.exactGuesses.includes(char)
                            ? 'bg-green-400'
                            : store.inexactGuesses.includes(char)
                                ? 'bg-yellow-400'
                                : store.allGuesses.includes(char)
                                    ? 'bg-gray-400'
                                    : 'bg-gray-200'
                        return (
                            <button className={`font-bold rounded-lg m-0.5 flex h-10 w-10 items-center justify-center uppercase ${bgColor}`}>
                                {char}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default observer(Keyboard);