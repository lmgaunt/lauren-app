'use client';

import { useState } from 'react';
import { CharacterBuddy } from '@/app/components/CharacterBuddy';

interface KidMissionViewProps {
  setView: (view: string) => void;
  stars: number;
  setStars: (stars: number) => void;
}

export const KidMissionView = ({ setView, stars, setStars }: KidMissionViewProps) => {
  const [reps, setReps] = useState(0);
  const totalReps = 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-50 p-6 pb-20">
      <button
        onClick={() => setView('home')}
        className="text-purple-600 font-semibold mb-4"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
        <CharacterBuddy size="small" />
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-800">You&apos;ve got this! 💪</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">Morning Stretches</h2>
        <p className="text-gray-600 mb-6">Let&apos;s do {totalReps} arm circles together!</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{reps} circles done</span>
            <span>{totalReps - reps} to go!</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
              style={{ width: `${(reps / totalReps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-6 text-center">
          <div className="text-6xl mb-4">🤸</div>
          <p className="text-lg font-semibold text-gray-700">Make big circles with your arms!</p>
        </div>

        <button
          onClick={() => {
            if (reps < totalReps) {
              setReps(reps + 1);
            }
          }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          disabled={reps >= totalReps}
        >
          {reps < totalReps ? `Tap when you finish one! (${reps}/${totalReps})` : '🎉 All done!'}
        </button>

        {reps >= totalReps && (
          <button
            onClick={() => {
              setView('celebration');
              setStars(stars + 5);
            }}
            className="w-full mt-4 bg-green-500 text-white text-xl font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            Complete Quest! ✨
          </button>
        )}
      </div>
    </div>
  );
};
