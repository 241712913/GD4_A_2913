import React, { useState } from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, time, matchedCount, totalPairs, onReset }) {
  const isGameComplete = matchedCount === totalPairs;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const [animateReset, setAnimateReset] = useState(false);
  const handleResetClick = () => { setAnimateReset(true); onReset(); setTimeout(() => { setAnimateReset(false); }, 1000);};

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center gap-8 mb-4">

        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaClock className="text-indigo-300" /> Waktu
          </p>
          <p className="text-2xl font-bold text-white">{formattedTime}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaMousePointer className="text-indigo-300" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaCheck className="text-indigo-300" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
        </div>

      </div>

      {isGameComplete && (
        <div className="mt-3 px-5 py-3 rounded-xl 
        bg-[rgba(92,64,51,0.35)] 
        border-2 border-[#5c4033] 
        shadow-lg">
          
          <p className="text-yellow-300 font-bold text-lg text-center">
            🎉 Selamat! Selesai dalam waktu {formattedTime} dengan {moves} percobaan!
          </p>

        </div>
      )}
  
      <button
        onClick={onReset}
        className="mt-6 px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full 
        transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto
        
        hover:scale-110
        hover:bg-yellow-300
        hover:shadow-[0_0_18px_rgba(250,204,21,0.9)]"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>
    </div>
  );
}

export default ScoreBoard;