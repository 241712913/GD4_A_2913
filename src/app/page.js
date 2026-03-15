"use client";

import React, { useState, useEffect } from 'react';
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
import { GiCardJoker } from "react-icons/gi";
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaGem, FaBolt, FaMoon, FaFire } from "react-icons/fa";

const ICONS = [
  { icon: FaMoon, color: "#6366f1" },
  { icon: FaHeart, color: "#ec4899" },
  { icon: FaAppleAlt, color: "#ef4444" },
  { icon: FaGem, color: "#8b5cf6" },
  { icon: FaLemon, color: "#eab308" },
  { icon: FaStar, color: "#f97316" },
  { icon: FaFire, color: "#d97706" },
  { icon: FaBolt, color: "#3b82f6" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

  const createCards = (pairCount) => {
    const selectedIcons = ICONS.slice(0, pairCount);

    const paired = selectedIcons.flatMap((item, index) => [
      { id: index * 2, icon: item.icon, color: item.color, pairId: index },
      { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
    ]);

    return shuffleArray(paired);
  };

export default function Home() {
  const [cards, setCards] = useState([]);

  const [flippedCards, setFlippedCards] = useState([]);

  const [matchedCards, setMatchedCards] = useState([]);

  const [moves, setMoves] = useState(0);

  const [difficulty, setDifficulty] = useState(4);

  const [time, setTime] = useState(0);

  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
  }, [difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;

      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      setMoves((prev) => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        const newMatched = [...matchedCards, firstId, secondId];
        if (newMatched.length === difficulty * 2) {
          setGameFinished(true);
        }
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (gameFinished) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [difficulty, gameFinished]);

  const handleCardFlip = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 p-4">

      <h1 className="text-5xl font-bold mb-9 text-white drop-shadow-lg flex items-center gap-3 animate-float">
        <GiCardJoker className="text-yellow-300 text-5xl" />
        <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Memory Card
        </span>
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setDifficulty(4)}
          className={`px-4 py-2 rounded-full font-semibold ${
            difficulty === 4 ? "bg-yellow-400 text-black" : "bg-white/20 text-white"
          }`}
        >
          😊 Easy (4)
        </button>

        <button
          onClick={() => setDifficulty(6)}
          className={`px-4 py-2 rounded-full font-semibold ${
            difficulty === 6 ? "bg-yellow-400 text-black" : "bg-white/20 text-white"
          }`}
        >
          😐 Medium (6)
        </button>

        <button
          onClick={() => setDifficulty(8)}
          className={`px-4 py-2 rounded-full font-semibold ${
            difficulty === 8 ? "bg-yellow-400 text-black" : "bg-white/20 text-white"
          }`}
        >
          ☠️ Hard (8)
        </button>
      </div>

      <ScoreBoard
        moves={moves}
        time={time}
        matchedCount={matchedCards.length / 2}
        totalPairs={difficulty}
        onReset={resetGame}
      />

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}