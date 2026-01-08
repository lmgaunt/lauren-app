import { Patient } from '@/app/types';

interface ClinicianAssignExercisesViewProps {
  selectedPatient: Patient | null;
  setView: (view: string) => void;
}

export const ClinicianAssignExercisesView = ({ selectedPatient, setView }: ClinicianAssignExercisesViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pt-20 px-6 pb-20">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setView('patient-detail')}
        className="text-blue-600 font-semibold mb-4 flex items-center gap-1"
      >
        ← Back to Patient
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Assign Exercise</h1>
      <p className="text-gray-600 mb-6">Create a new therapy activity for {selectedPatient?.name}</p>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Name</label>
            <input
              type="text"
              placeholder="e.g., Arm Circles, Speech Practice"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                <option>Physical Therapy</option>
                <option>Occupational Therapy</option>
                <option>Speech Therapy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                placeholder="e.g., 5 min"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <input
              type="text"
              placeholder="e.g., Daily, 3x per week"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (What it helps with)</label>
            <textarea
              rows={3}
              placeholder="Explain the therapeutic goals and benefits"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (How to do it)</label>
            <textarea
              rows={4}
              placeholder="Step-by-step instructions for the family"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all">
              Assign Exercise
            </button>
            <button
              onClick={() => setView('patient-detail')}
              className="px-6 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
