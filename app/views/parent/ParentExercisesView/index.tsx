import { useState } from 'react';
import { CheckCircle, Clock, Calendar, Sparkles, ThumbsUp, Zap, Tag } from 'lucide-react';
import { Mission, AdherenceStatus, ActivitySession } from '@/app/types';
import { BarrierTagging } from '@/app/components/BarrierTagging';

interface ParentExercisesViewProps {
  missions: Mission[];
  completedMissions: number[];
  todayAdherence: Record<number, AdherenceStatus>;
  setTodayAdherence: (adherence: Record<number, AdherenceStatus>) => void;
  sessionData: Record<number, ActivitySession>;
  updateSessionBarriers: (missionId: number, barriers: string[], otherText?: string) => void;
  setView: (view: string) => void;
}

const statusConfig = {
  done: { label: 'Done!', color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle, emoji: '✅' },
  partial: { label: 'Partial', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: ThumbsUp, emoji: '👍' },
  tried: { label: 'Tried', color: 'bg-purple-100 text-purple-700 border-purple-300', icon: Sparkles, emoji: '⭐' },
  not_today: { label: 'Not today', color: 'bg-gray-100 text-gray-600 border-gray-300', icon: Clock, emoji: '💤' },
  pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Zap, emoji: '⏳' },
};

export const ParentExercisesView = ({ missions, completedMissions, todayAdherence, setTodayAdherence, sessionData, updateSessionBarriers, setView }: ParentExercisesViewProps) => {
  const [showBarrierModal, setShowBarrierModal] = useState(false);
  const [currentBarrierMissionId, setCurrentBarrierMissionId] = useState<number | null>(null);
  const [preselectedBarriers, setPreselectedBarriers] = useState<string[]>([]);

  const handleStatusChange = (missionId: number, status: AdherenceStatus) => {
    setTodayAdherence({
      ...todayAdherence,
      [missionId]: status,
    });

    // Trigger barrier tagging for non-done statuses
    if (status !== 'done' && status !== 'pending') {
      const session = sessionData[missionId];
      const needsHelpPreselect = session?.childReflectionChoice === 'need_help' ? ['didnt_understand'] : [];

      setCurrentBarrierMissionId(missionId);
      setPreselectedBarriers(needsHelpPreselect);
      setShowBarrierModal(true);
    }
  };

  const handleBarrierSave = (barriers: string[], otherText?: string) => {
    if (currentBarrierMissionId !== null) {
      updateSessionBarriers(currentBarrierMissionId, barriers, otherText);
    }
    setShowBarrierModal(false);
    setCurrentBarrierMissionId(null);
  };

  const getAttemptCount = () => {
    return Object.values(todayAdherence).filter(
      status => status === 'done' || status === 'partial' || status === 'tried'
    ).length;
  };

  const getDoneCount = () => {
    return Object.values(todayAdherence).filter(status => status === 'done').length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-20 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setView('home')}
          className="text-purple-600 font-semibold mb-4 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Today's Activities</h1>
          <p className="text-gray-600 mb-4">Track each activity - every attempt counts!</p>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Today's Progress</p>
                <p className="text-2xl font-bold text-purple-900">
                  {getAttemptCount()} attempts • {getDoneCount()} completed
                </p>
              </div>
              <div className="text-4xl">
                {getAttemptCount() > 0 ? '🎉' : '💪'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => {
            const currentStatus = todayAdherence[mission.id] || 'pending';
            const config = statusConfig[currentStatus];
            const StatusIcon = config.icon;
            const session = sessionData[mission.id];
            const hasBarriers = session?.barriers && session.barriers.length > 0;

            return (
              <div key={mission.id} className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${mission.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                    {mission.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{mission.title}</h3>
                        <p className="text-sm text-purple-600 font-medium">{mission.type}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border-2 ${config.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                      </div>
                    </div>

                    {session?.childReflectionChoice && (
                      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Child's reflection:</span>{' '}
                          {session.childReflectionChoice === 'did_it' && '✨ I did it'}
                          {session.childReflectionChoice === 'tried' && '👍 I tried'}
                          {session.childReflectionChoice === 'need_help' && '💙 I need help next time'}
                        </p>
                      </div>
                    )}

                    {hasBarriers && (
                      <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Tag className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-orange-800 mb-1">Barriers noted:</p>
                            <div className="flex flex-wrap gap-1">
                              {session.barriers!.map((barrier, i) => (
                                <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-orange-700 border border-orange-300">
                                  {barrier.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                            {session.barrierOtherText && (
                              <p className="text-xs text-orange-700 mt-1 italic">&quot;{session.barrierOtherText}&quot;</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 mt-4">
                      <div className="bg-purple-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">What it helps with</h4>
                        <p className="text-gray-700">{mission.description}</p>
                      </div>

                      <div className="bg-pink-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">How to do it</h4>
                        <p className="text-gray-700">{mission.instructions}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mission.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {mission.frequency}
                          </span>
                        </div>
                        <p className="text-gray-500 italic">{mission.clinicianNote}</p>
                      </div>

                      {/* Status Selection Buttons */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">How did it go today?</p>
                        <div className="grid grid-cols-4 gap-2">
                          {(Object.keys(statusConfig) as AdherenceStatus[])
                            .filter(status => status !== 'pending')
                            .map((status) => {
                              const btnConfig = statusConfig[status];
                              const isSelected = currentStatus === status;
                              return (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(mission.id, status)}
                                  className={`
                                    flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                                    ${isSelected
                                      ? btnConfig.color + ' scale-105 shadow-md'
                                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }
                                  `}
                                >
                                  <span className="text-2xl">{btnConfig.emoji}</span>
                                  <span className="text-xs font-semibold">{btnConfig.label}</span>
                                </button>
                              );
                            })}
                        </div>

                        {/* Add/Edit Barriers Button */}
                        {currentStatus !== 'done' && currentStatus !== 'pending' && (
                          <button
                            onClick={() => {
                              const needsHelpPreselect = session?.childReflectionChoice === 'need_help' ? ['didnt_understand'] : [];
                              setCurrentBarrierMissionId(mission.id);
                              setPreselectedBarriers(session?.barriers || needsHelpPreselect);
                              setShowBarrierModal(true);
                            }}
                            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-colors"
                          >
                            <Tag className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-700">
                              {hasBarriers ? 'Edit barriers' : 'Add barriers (optional)'}
                            </span>
                          </button>
                        )}

                        {/* Celebration messages for attempts */}
                        {currentStatus === 'tried' && (
                          <div className="mt-3 bg-purple-50 border-2 border-purple-200 rounded-lg p-3 text-center">
                            <p className="text-purple-800 font-semibold">⭐ Every try is progress! You're building great habits!</p>
                          </div>
                        )}
                        {currentStatus === 'partial' && (
                          <div className="mt-3 bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
                            <p className="text-blue-800 font-semibold">👏 Awesome effort! Partial completion still counts as success!</p>
                          </div>
                        )}
                        {currentStatus === 'done' && (
                          <div className="mt-3 bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                            <p className="text-green-800 font-semibold">🎉 Amazing job! Activity completed!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BarrierTagging
        isOpen={showBarrierModal}
        onClose={() => {
          setShowBarrierModal(false);
          setCurrentBarrierMissionId(null);
        }}
        onSave={handleBarrierSave}
        preselectedBarriers={preselectedBarriers}
      />
    </div>
  );
};
