import { Flame, CheckCircle, Star, BarChart3, Calendar, Clock, MessageSquare, Settings, ChevronRight } from 'lucide-react';
import { Mission, WeeklyData } from '@/app/types';

interface ParentHomeViewProps {
  streak: number;
  stars: number;
  missions: Mission[];
  completedMissions: number[];
  weeklyData: WeeklyData[];
  setView: (view: string) => void;
}

export const ParentHomeView = ({ streak, stars, missions, completedMissions, weeklyData, setView }: ParentHomeViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-20 px-6 pb-20">
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Alex&apos;s Progress</h1>
        <p className="text-gray-600">Keep up the great work! Here&apos;s how this week is going.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">85%</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stars}</p>
              <p className="text-sm text-gray-600">Total Stars</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          This Week&apos;s Activity
        </h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '120px' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all"
                  style={{ height: `${(day.completed / 4) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 font-medium">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Today&apos;s Schedule
          </h3>
          <button
            onClick={() => setView('exercises')}
            className="text-purple-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {missions.slice(0, 2).map((mission) => (
            <div key={mission.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className={`${mission.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                {mission.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{mission.title}</h4>
                <p className="text-sm text-gray-600">{mission.frequency}</p>
              </div>
              {completedMissions.includes(mission.id) ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Clock className="w-6 h-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setView('messages')}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group"
        >
          <MessageSquare className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Messages</h4>
          <p className="text-sm text-gray-600">Chat with clinicians</p>
        </button>
        <button
          onClick={() => setView('settings')}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group"
        >
          <Settings className="w-8 h-8 text-purple-600 mb-3 group-hover:rotate-90 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Settings</h4>
          <p className="text-sm text-gray-600">Reminders &amp; preferences</p>
        </button>
      </div>
    </div>
  </div>
);
