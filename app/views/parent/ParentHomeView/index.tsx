import { Flame, CheckCircle, Star, BarChart3, Calendar, Clock, MessageSquare, Settings, ChevronRight, Sparkles } from 'lucide-react';
import { Mission, WeeklyData, AdherenceStatus } from '@/app/types';
import { PlanTemplate } from '@/app/data/planTemplates';
import { TemplateSelector } from '@/app/components/TemplateSelector';

interface ParentHomeViewProps {
  streak: number;
  stars: number;
  missions: Mission[];
  completedMissions: number[];
  weeklyData: WeeklyData[];
  todayAdherence: Record<number, AdherenceStatus>;
  setTodayAdherence: (adherence: Record<number, AdherenceStatus>) => void;
  setView: (view: string) => void;
  templates: PlanTemplate[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
}

export const ParentHomeView = ({ streak, stars, missions, completedMissions, weeklyData, todayAdherence, setTodayAdherence, setView, templates, selectedTemplateId, onTemplateChange }: ParentHomeViewProps) => {
  const getAttemptCount = () => {
    return Object.values(todayAdherence).filter(
      status => status === 'done' || status === 'partial' || status === 'tried'
    ).length;
  };

  const getTotalAttempts = () => {
    return weeklyData.reduce((sum, day) => sum + (day.attempted || 0), 0);
  };

  const getTotalCompleted = () => {
    return weeklyData.reduce((sum, day) => sum + day.completed, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-20 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Alex&apos;s Progress</h1>
          <p className="text-gray-600">Every attempt counts! Here&apos;s how this week is going.</p>
        </div>

        <TemplateSelector
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          onTemplateChange={onTemplateChange}
        />

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
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{getTotalAttempts()}</p>
                <p className="text-sm text-gray-600">Attempts</p>
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
          <p className="text-sm text-gray-600 mb-4">
            Purple shows all attempts (tried, partial, done) • Green shows completed activities
          </p>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((day, i) => {
              const attemptedHeight = ((day.attempted || 0) / 4) * 100;
              const completedHeight = (day.completed / 4) * 100;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '120px' }}>
                    {/* Attempted bar (background) */}
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-purple-300 to-purple-200 rounded-t-lg transition-all"
                      style={{ height: `${attemptedHeight}%` }}
                    ></div>
                    {/* Completed bar (foreground) */}
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all"
                      style={{ height: `${completedHeight}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600 font-medium block">{day.day}</span>
                    {(day.attempted || 0) > 0 && (
                      <span className="text-xs text-purple-600 font-semibold">{day.attempted}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800 text-center font-semibold">
              ⭐ {getTotalAttempts()} total attempts this week - {getTotalCompleted()} fully completed! Keep going!
            </p>
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
              Track Progress <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {getAttemptCount() > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-purple-900 font-semibold text-center">
                🎉 {getAttemptCount()} {getAttemptCount() === 1 ? 'activity' : 'activities'} attempted today! Great work!
              </p>
            </div>
          )}

          <div className="space-y-3">
            {missions.slice(0, 2).map((mission) => {
              const status = todayAdherence[mission.id] || 'pending';
              const statusEmoji = {
                done: '✅',
                partial: '👍',
                tried: '⭐',
                not_today: '💤',
                pending: '⏳',
              }[status];

              return (
                <div key={mission.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`${mission.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                    {mission.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{mission.title}</h4>
                    <p className="text-sm text-gray-600">{mission.frequency}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{statusEmoji}</span>
                    {status === 'done' && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {status === 'pending' && <Clock className="w-6 h-6 text-gray-400" />}
                  </div>
                </div>
              );
            })}
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
};
