import { Flame, Plus, BarChart3, Settings } from 'lucide-react';
import { Patient, Mission } from '@/app/types';

interface ClinicianPatientDetailViewProps {
  selectedPatient: Patient | null;
  missions: Mission[];
  setView: (view: string) => void;
}

export const ClinicianPatientDetailView = ({ selectedPatient, missions, setView }: ClinicianPatientDetailViewProps) => {
  if (!selectedPatient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pt-20 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setView('home')}
          className="text-blue-600 font-semibold mb-4 flex items-center gap-1"
        >
          ← Back to Patient List
        </button>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h1>
                <p className="text-gray-600">Age {selectedPatient.age} • {selectedPatient.therapyType}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setView('assign-exercises')}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Assign Exercise
              </button>
              <button className="border-2 border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded-xl hover:bg-blue-50 transition-all">
                Send Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Compliance Rate</p>
              <p className={`text-2xl font-bold ${
                selectedPatient.compliance >= 80 ? 'text-green-600' :
                selectedPatient.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {selectedPatient.compliance}%
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                <Flame className="w-6 h-6" />
                {selectedPatient.streak}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Last Activity</p>
              <p className="text-lg font-bold text-green-600">{selectedPatient.lastActivity}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-purple-600">34</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              30-Day Compliance Trend
            </h3>
            <div className="flex items-end justify-between gap-1 h-40">
              {[85, 90, 95, 88, 92, 89, 85, 82, 90, 85, 87, 89, 92, 88].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '120px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t transition-all"
                      style={{ height: `${val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-800 mb-1">Session Note - Oct 25</p>
                <p className="text-sm text-gray-600">Excellent progress on balance exercises. Minimal support needed today.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-800 mb-1">Parent Update - Oct 23</p>
                <p className="text-sm text-gray-600">Mom reports high motivation. Completing exercises before school.</p>
              </div>
              <button className="w-full text-blue-600 font-semibold text-sm py-2 hover:bg-blue-50 rounded-xl transition-all">
                + Add New Note
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Exercises</h3>
          <div className="space-y-3">
            {missions.map((mission) => (
              <div key={mission.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`${mission.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                  {mission.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{mission.title}</h4>
                  <p className="text-sm text-gray-600">{mission.frequency} • {mission.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-lg font-bold text-green-600">90%</p>
                </div>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
