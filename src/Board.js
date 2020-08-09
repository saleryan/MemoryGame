import React, {useState, useEffect} from 'react';
import Card from './Card';
import './Board.css';

export default function Board() {

    const [cards,setcards] = useState([]);

    const [win, setIsWin] = useState(false);

    const reset =() => {
        const data = Array.from({ length: 16 }, (v,i) => (
            {  index:i,
               data: (i % 8)+1,
               isFaceUp:false,
               isMatched:false
            }));

            for (let i = data.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
              // swap elements data[i] and data[j]
              [data[i], data[j]] = [data[j], data[i]];
            }
       setcards(data);
       setIsWin(false);
    }

    useEffect(()=>{
        reset();
    },[])

    useEffect(()=> {
        const matches = cards.filter(c=>c.isFaceUp && !c.isMatched);

        if (matches.length===2) {
            if (matches[0].data===matches[1].data) {
                matches[0].isMatched=true;
                matches[1].isMatched=true;
            } else {
                matches[0].isFaceUp=false;
                matches[1].isFaceUp=false;
            }
            const notMatched = cards.some(c=>!c.isMatched);

            setTimeout(()=>{
                 setcards(cards.map(c=>c.index===matches[0].index ? matches[0] :
                                          c.index===matches[1].index ? matches[1] : c));
                },250);
                setIsWin(!notMatched)
        }

    },[cards]);

    const cardHandler = (card) => {
        card.isFaceUp= card.isMatched?card.isFaceUp: !card.isFaceUp;
        setcards(cards.map(c=>c.index===card.index?card:c));
    }

    return (
<div class="game">
<div className="board">
        {
        cards.map((data,i)=>
            <Card key={i}
            card={data}
            cardHandler={()=>cardHandler(data)}/>)
        }
        </div>
        {win && <span> You won! reset?<button onClick={reset}>OK</button></span>}
    </div>
    )
}
