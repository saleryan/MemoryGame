import React from 'react';
import "./Card.css";

export default function Card({ card, ...props }) {
    return (
        <div className={card.isFaceUp ? 'card' : 'card facedown'} onClick={props.cardHandler}>
            {card.data}
        </div>
    )
}
