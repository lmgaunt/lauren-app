'use client';

import { useState } from 'react';
import { Sparkles, ThumbsUp, Heart } from 'lucide-react';

interface KidReflectionViewProps {
  setView: (view: string) => void;
  onReflectionChoice: (choice: 'did_it' | 'tried' | 'need_help') => void;
  sessionDuration: number;
  completedTimer: boolean;
}

type ReflectionChoice = 'did_it' | 'tried' | 'need_help';

const reflectionOptions = {
  did_it: {
    label: 'I did it',
    emoji: '✨',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-green-400 to-green-500',
    confirmation: 'Awesome job!',
  },
  tried: {
    label: 'I tried',
    emoji: '👍',
    icon: ThumbsUp,
    color: 'bg-gradient-to-br from-purple-400 to-purple-500',
    confirmation: 'Trying counts!',
  },
  need_help: {
    label: 'I need help next time',
    emoji: '💙',
    icon: Heart,
    color: 'bg-gradient-to-br from-blue-400 to-blue-500',
    confirmation: "We'll make it easier next time.",
  },
};

export const KidReflectionView = ({ setView, onReflectionChoice, sessionDuration, completedTimer }: KidReflectionViewProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<ReflectionChoice | null>(null);

  const handleChoice = (choice: ReflectionChoice) => {
    setSelectedChoice(choice);
    setShowConfirmation(true);
    onReflectionChoice(choice);

    // Auto-advance after confirmation
    setTimeout(() => {
      setView('home');
    }, 1000); // 1 second confirmation
  };

  if (showConfirmation && selectedChoice) {
    const config = reflectionOptions[selectedChoice];
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 pt-20 px-6 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">{config.emoji}</div>
          <h1 className="text-4xl font-bold text-purple-800">{config.confirmation}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 pt-20 px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-3">
            Nice work showing up
          </h1>
          <p className="text-xl text-purple-600">
            What should we tell your grown-up?
          </p>
        </div>

        <div className="space-y-4">
          {(Object.keys(reflectionOptions) as ReflectionChoice[]).map((choice) => {
            const config = reflectionOptions[choice];
            const Icon = config.icon;

            return (
              <button
                key={choice}
                onClick={() => handleChoice(choice)}
                className={`
                  w-full ${config.color} text-white rounded-3xl p-8 shadow-xl
                  hover:shadow-2xl transform hover:scale-105 active:scale-95
                  transition-all duration-200
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{config.emoji}</div>
                    <span className="text-2xl font-bold">{config.label}</span>
                  </div>
                  <Icon className="w-8 h-8" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
