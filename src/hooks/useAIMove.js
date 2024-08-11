import { useState } from 'react';

const useAIMove = (apiKey) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeMove = async (board) => {
        setLoading(true);
        setError(null);

        try {
            const prompt = `Aktualna plansza to ${JSON.stringify(board)}. Zwróć tylko numer indeksu (od 0 do 8), na którym powinienem postawić "O". Nie podawaj żadnych innych informacji.`;

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
            const move = parseInt(data.choices[0].message.content.trim());

            if (!isNaN(move) && move >= 0 && move < 9) {
                setLoading(false);
                return move;
            } else {
                throw new Error('AI returned an invalid move.');
            }
        } catch (err) {
            setLoading(false);
            setError('Something went wrong with the AI request.');
            return null;
        }
    };

    return { makeMove, loading, error };
};

export default useAIMove;
