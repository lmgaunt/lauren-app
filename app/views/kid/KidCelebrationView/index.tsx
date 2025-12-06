import { Star } from 'lucide-react';
import { CharacterBuddy } from '@/app/components/CharacterBuddy';

interface KidCelebrationViewProps {
  completedMissions: number[];
  setCompletedMissions: (missions: number[]) => void;
  setView: (view: string) => void;
}

export const KidCelebrationView = ({ completedMissions, setCompletedMissions, setView }: KidCelebrationViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-pink-100 to-purple-100 p-6 pb-20 flex flex-col items-center justify-center">
    <div className="text-center">
      <div className="text-8xl mb-6 animate-bounce">🎉</div>
      <h1 className="text-4xl font-bold text-purple-800 mb-4">AMAZING JOB!</h1>

      <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
        <CharacterBuddy />
        <p className="text-2xl font-bold text-gray-800 mt-4">You&apos;re a superstar! ⭐</p>
        <p className="text-gray-600 mt-2">You earned 5 stars!</p>
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <Star className="w-12 h-12 text-yellow-500 fill-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">+5</p>
          <p className="text-sm text-gray-600">Stars</p>
        </div>
      </div>

      <button
        onClick={() => {
          setCompletedMissions([...completedMissions, 3]);
          setView('home');
        }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
      >
        Back to Quests! 🚀
      </button>
    </div>
  </div>
);
