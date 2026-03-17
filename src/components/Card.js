import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip();
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    const cardClass = `w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none
transition-all duration-500 transform
${isOpen ? 'bg-white shadow-md rotate-y-180' : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:rotate-6'}
${isMatched ? 'opacity-70 ring-2 ring-green-400' : ''}
`;

    return (
        <div className="card-container cursor-pointer" onClick={handleClick}>

            <div className={`card-inner ${isOpen ? "flipped" : ""}`}>

            <div className="card-front shadow-lg">
                <FaQuestion className="text-white text-2xl" />
            </div>

            <div className={`card-back shadow-md ${isMatched ? "ring-2 ring-green-400" : ""}`}>
                <span className="animate-bounce-once text-3xl">
                <IconComponent style={{ color: card.color }} />
                </span>
            </div>

            </div>

        </div>
    );
}

export default Card;