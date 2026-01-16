'use client';

import { useState, useEffect } from 'react';
import { CharacterBuddy } from '@/app/components/CharacterBuddy';
import { Mission } from '@/app/types';

interface KidMissionViewProps {
  setView: (view: string) => void;
  stars: number;
  setStars: (stars: number) => void;
  mission: Mission;
}

export const KidMissionView = ({ setView, stars, setStars, mission }: KidMissionViewProps) => {
  const EXERCISE_DURATION = mission.durationSec || 30; // Use mission duration or 30 seconds default
  const [timeRemaining, setTimeRemaining] = useState(EXERCISE_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [sessionData, setSessionData] = useState({
    startedAt: Date.now(),
    endedAt: 0,
    durationSeconds: 0,
    completedTimer: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            // Timer completed fully
            setSessionData({
              startedAt: sessionStartTime,
              endedAt: Date.now(),
              durationSeconds: EXERCISE_DURATION,
              completedTimer: true,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, sessionStartTime, EXERCISE_DURATION]);

  const handleStopEarly = () => {
    const elapsed = EXERCISE_DURATION - timeRemaining;
    setSessionData({
      startedAt: sessionStartTime,
      endedAt: Date.now(),
      durationSeconds: elapsed,
      completedTimer: false,
    });
    setIsCompleted(true);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-50 pt-20 px-6 pb-20">
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
        <h2 className="text-2xl font-bold text-purple-800 mb-2">{mission.title}</h2>
        <p className="text-gray-600 mb-6">{mission.description || `Let's do this activity for ${EXERCISE_DURATION} seconds!`}</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Time Remaining</span>
            <span>{timeRemaining}s</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 rounded-full"
              style={{ width: `${((EXERCISE_DURATION - timeRemaining) / EXERCISE_DURATION) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-6 text-center">
          <div className="text-6xl mb-4">{mission.icon}</div>
          <p className="text-lg font-semibold text-gray-700">{mission.instructions}</p>

          {/* Countdown Timer Display */}
          <div className="mt-6">
            <div className={`text-7xl font-bold ${isRunning ? 'text-purple-600 animate-pulse' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
              {timeRemaining}
            </div>
            <div className="text-lg text-gray-600 mt-2">
              {isCompleted ? '🎉 Time\'s up!' : isRunning ? 'Keep going!' : 'Press Start to begin'}
            </div>
          </div>
        </div>

        {!isRunning && !isCompleted && timeRemaining === EXERCISE_DURATION && (
          <button
            onClick={() => setIsRunning(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            Start Exercise! 🚀
          </button>
        )}

        {isRunning && (
          <button
            onClick={() => setIsRunning(false)}
            className="w-full bg-orange-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            Pause ⏸️
          </button>
        )}

        {!isRunning && timeRemaining < EXERCISE_DURATION && timeRemaining > 0 && !isCompleted && (
          <div className="space-y-3">
            <button
              onClick={() => setIsRunning(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
            >
              Resume Exercise! ▶️
            </button>
            <button
              onClick={handleStopEarly}
              className="w-full bg-blue-500 text-white text-xl font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
            >
              All done for now ✨
            </button>
          </div>
        )}

        {isCompleted && (
          <button
            onClick={() => setView('reflection')}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            All done for now ✨
          </button>
        )}
      </div>
    </div>
  );
};
