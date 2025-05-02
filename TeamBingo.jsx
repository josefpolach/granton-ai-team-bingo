import React, { useState, useEffect } from 'react';

const TeamBingo = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timerInterval, setTimerInterval] = useState(null);

    const bingoItems = [
        "Používá `print()` místo debuggeru",
        "Pushuje změny rovnou do `main`",
        "Mluví na mute v callu",
        "je v kancelari jako prvni",
        "Říká 'pojďme to probrat offline'",
        "Říká, že nasadí za 10 minut, ale trvá to věčnost",
        "Nejvic kasle na merge Dependabota",
        "Pouziva na poznamky Obsidian",
        "Vzdycky prijde se spravnou teorii",
        "Napsal nejvis Unit testu",
        "nejvetsi pracovni nasazeni",
        "ma nejhlasitejsi rychy v pozadi",
        "se nikdy na callu nediva do kamery",
        "objednava si balicky jen na dobu callu",
        "tesi se na kazdou spolecnou schuzku",
        "udelal v dubnu nejvic code reviews"

    ];

    const startGame = () => {
        setGameStarted(true);
        const interval = setInterval(() => {
            setTimer(prevTime => prevTime + 1);
        }, 1000);
        setTimerInterval(interval);
    };

    const endGame = () => {
        clearInterval(timerInterval);
        setGameEnded(true);
    };

    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: value
        }));
    };

    const allFieldsFilled = Object.keys(answers).length === bingoItems.length &&
        Object.values(answers).every(answer => answer.trim() !== '');

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timerInterval]);

    return (
        <div className="flex flex-col items-center p-6 max-w-5xl mx-auto bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Týmové Bingo</h1>

            {!gameStarted ? (
                <div className="text-center mb-8">
                    <p className="mb-6 text-gray-700">Klikni na tlačítko START pro zahájení hry!</p>
                    <button
                        onClick={startGame}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transition-colors"
                    >
                        START
                    </button>
                </div>
            ) : (
                <>
                    <div className="w-full mb-4 flex justify-between items-center">
                        <div className="text-xl font-mono bg-gray-200 py-2 px-4 rounded-md">
                            Čas: {formatTime(timer)}
                        </div>
                        {allFieldsFilled && !gameEnded && (
                            <button
                                onClick={endGame}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
                            >
                                BINGO!
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        {bingoItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
                                <div className="font-semibold mb-2 text-gray-800 flex-grow">{item}</div>
                                <input
                                    type="text"
                                    placeholder="Jméno kolegy..."
                                    value={answers[index] || ''}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    disabled={gameEnded}
                                    className="mt-2 p-2 border border-gray-300 rounded w-full disabled:bg-gray-100"
                                />
                            </div>
                        ))}
                    </div>

                    {gameEnded && (
                        <div className="mt-8 text-center p-6 bg-yellow-100 rounded-lg border-2 border-yellow-300 w-full max-w-2xl">
                            <h2 className="text-2xl font-bold text-yellow-700 mb-2">BINGO!</h2>
                            <p className="text-yellow-800">
                                Dokončil(a) jsi bingo za {formatTime(timer)}!
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TeamBingo;