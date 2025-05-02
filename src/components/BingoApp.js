import React, { useState, useEffect } from 'react';

const BingoApp = () => {
    // Bingo otázky
    const questions = [
        "Používá `print()` místo debuggeru",
        "Pushuje změny rovnou do `main`",
        "Mluví na mute v callu",
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
        "udelal v dubnu nejvic code reviews",
        "je v kancelari jako prvni"
    ];

    // Náhodný mix otázek
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [answers, setAnswers] = useState(Array(16).fill(''));
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [allAnswered, setAllAnswered] = useState(false);

    // Funkce pro náhodné promíchání otázek
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Inicializace při načtení
    useEffect(() => {
        setShuffledQuestions(shuffleArray(questions));
    }, []);

    // Spustit hru
    const startGame = () => {
        setGameStarted(true);
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        setTimerInterval(interval);
    };

    // Ukončit hru
    const finishGame = () => {
        setGameFinished(true);
        clearInterval(timerInterval);
    };

    // Zpracování změn v odpovědích
    const handleAnswerChange = (index, value) => {
        if (gameStarted && !gameFinished) {
            const newAnswers = [...answers];
            newAnswers[index] = value;
            setAnswers(newAnswers);

            // Kontrola, zda jsou všechna pole vyplněna
            const allFilled = newAnswers.every(answer => answer.trim() !== '');
            setAllAnswered(allFilled);
        }
    };

    // Formát času
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 p-4 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Týmové Bingo</h1>
                    {gameStarted && (
                        <div className="text-xl font-mono bg-indigo-800 px-4 py-2 rounded-lg">
                            {formatTime(timer)}
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {!gameStarted ? (
                        <div className="text-center p-10">
                            <h2 className="text-2xl mb-6 text-gray-700">Připraveni začít týmové bingo?</h2>
                            <button
                                onClick={startGame}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
                            >
                                START
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {shuffledQuestions.map((question, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md overflow-hidden flex flex-col"
                                    >
                                        <div className="p-3 bg-indigo-100 text-indigo-800 font-medium text-sm h-24 overflow-y-auto">
                                            {question}
                                        </div>
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                value={answers[index]}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                disabled={gameFinished}
                                                placeholder="Tvoje odpověď..."
                                                className="w-full p-2 border border-indigo-200 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                {gameFinished ? (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                        <p className="font-bold">Bingo dokončeno!</p>
                                        <p>Tvůj čas: {formatTime(timer)}</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={finishGame}
                                        disabled={!allAnswered}
                                        className={`py-3 px-8 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-105 ${
                                            allAnswered
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        BINGO
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BingoApp;