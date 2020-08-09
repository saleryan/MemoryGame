import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

export default function Board() {

    const [cards, setcards] = useState([]);
    const [win, setIsWin] = useState(false);

    const reset = () => {
        const deck = Array.from({ length: 16 }, (v, i) => (
            {
                index: i,
                data: (i % 8) + 1,
                isFaceUp: false,
                isMatched: false
            }));

        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // swap elements deck[i] and deck[j]
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        setcards(deck);
        setIsWin(false);
    }

    useEffect(() => {
        reset();
    }, [])

    useEffect(() => {
        const [firstMatch, secondMatch] = cards.filter(c => c.isFaceUp && !c.isMatched);
        // Are there any matching cards?
        if (firstMatch && secondMatch) {
            if (firstMatch.data === secondMatch.data) {
                firstMatch.isMatched = true;
                secondMatch.isMatched = true;
            } else {
                firstMatch.isFaceUp = false;
                secondMatch.isFaceUp = false;
            }
            // Are there any remaining cards to be matched?
            const remainingMatches = cards.some(c => !c.isMatched);

            setTimeout(() => {
                setcards(prevCards => prevCards.map(c => c.index === firstMatch.index ? firstMatch :
                    c.index === secondMatch.index ? secondMatch : c));
            }, 250);

            setIsWin(!remainingMatches)
        }

    }, [cards]);

    const cardHandler = (card) => {
        card.isFaceUp = card.isMatched ? card.isFaceUp : !card.isFaceUp;
        setcards(prevCards =>
            prevCards.map(c => c.index === card.index ? card : c));
    }

    return (
        <div class="game">
            <div className="board">
                {
                    cards.map((data, i) =>
                        <Card key={i}
                            card={data}
                            cardHandler={() => cardHandler(data)} />)
                }
            </div>
            {win && <span> You won! reset?<button onClick={reset}>OK</button></span>}
        </div>
    )
}
