import { Star, Trophy, Flame, CheckCircle, Circle } from 'lucide-react';
import { CharacterBuddy } from '@/app/components/CharacterBuddy';
import { Mission } from '@/app/types';

interface KidHomeViewProps {
  streak: number;
  stars: number;
  missions: Mission[];
  completedMissions: number[];
  setView: (view: string) => void;
}

export const KidHomeView = ({ streak, stars, missions, completedMissions, setView }: KidHomeViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 pt-20 px-6 pb-20">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-purple-800">Hi, Alex! 👋</h1>
        <p className="text-purple-600">Ready for today&apos;s adventures?</p>
      </div>
      <div className="flex gap-3">
        <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-600">{streak}</span>
        </div>
        <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-yellow-600">{stars}</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
      <CharacterBuddy />
      <div className="mt-4 text-center relative z-10">
        <p className="text-xl font-semibold text-gray-800">You&apos;re doing AMAZING!</p>
        <p className="text-gray-600">Let&apos;s keep that streak going! 🎉</p>
      </div>
    </div>

    <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
      <Trophy className="w-6 h-6 text-yellow-500" />
      Today&apos;s Quests
    </h2>

    <div className="space-y-3">
      {missions.map((mission) => (
        <button
          key={mission.id}
          onClick={() => setView('mission')}
          className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className={`${mission.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
              {mission.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-gray-800">{mission.title}</h3>
              <p className="text-gray-600">{mission.time}</p>
            </div>
            {completedMissions.includes(mission.id) ? (
              <CheckCircle className="w-8 h-8 text-green-500 fill-green-500" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300" />
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);
