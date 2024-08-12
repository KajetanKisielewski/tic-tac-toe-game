import { useState } from 'react';

const useAIMove = (apiKey) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeMove = async (board, gridSize) => {
        setLoading(true);
        setError(null);

        try {
            const maxIndex = gridSize * gridSize - 1;
            let move;
            let attempts = 0;
            const maxAttempts = 5;

            do {
                const prompt = `Plansza do gry Tic-Tac-Toe ma rozmiar ${gridSize}x${gridSize}. Obecny stan planszy wygląda następująco: ${JSON.stringify(board)}. Możesz postawić symbol "O" TYLKO w miejscu, gdzie jest "null". Nie możesz wybrać pola, które jest już zajęte przez "X" (ruch przeciwnika) lub przez "O" (Twój poprzedni ruch). Zwróć tylko numer indeksu (od 0 do ${maxIndex}), który jest wolny i na którym mogę postawić "O". Nie zwracaj żadnej innej informacji poza numerem indexu. Wybór zajętego pola jest zabroniony i nieprawidłowy. Przykład: Gdy plansza wygląda w taki sposób: [null, null, null, null, "O", null, "X", null, "X"], NIE MOŻESZ wybrać indeksu 4, ponieważ to pole jest już zajęte przez Ciebie. NIE MOŻESZ też wybrać indeksów 6 i 8, ponieważ są one zajęte przez przeciwnika.`;

                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-4',
                        messages: [
                            { role: "system", content: "Jesteś AI do gry Tic-Tac-Toe, staraj się wygrać za wszelką cenę." },
                            { role: "user", content: prompt }
                        ],
                        max_tokens: 1,
                        temperature: 0,
                    }),
                });

                const data = await response.json();
                move = parseInt(data.choices[0].message.content.trim());

                attempts++;

                if (isNaN(move) || move < 0 || move > maxIndex || board[move] !== null) {
                    console.error('AI selected an invalid or occupied move, trying again...');

                    if (attempts >= maxAttempts) {
                        move = board.findIndex((square) => square === null);
                        break;
                    }
                } else {
                    break;
                }
            } while (true);

            setLoading(false);
            return move;
        } catch (err) {
            setLoading(false);
            setError('Something went wrong with the AI request.');
            return null;
        }
    };

    return { makeMove, loading, error };
};

export default useAIMove;
