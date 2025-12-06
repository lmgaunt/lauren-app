import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { Mission } from '@/app/types';

interface ParentExercisesViewProps {
  missions: Mission[];
  completedMissions: number[];
  setView: (view: string) => void;
}

export const ParentExercisesView = ({ missions, completedMissions, setView }: ParentExercisesViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6 pb-20">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setView('home')}
        className="text-purple-600 font-semibold mb-4 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Assigned Exercises</h1>
      <p className="text-gray-600 mb-6">Detailed information about each therapy activity</p>

      <div className="space-y-4">
        {missions.map((mission) => (
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
                  {completedMissions.includes(mission.id) && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Completed today
                    </div>
                  )}
                </div>

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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
