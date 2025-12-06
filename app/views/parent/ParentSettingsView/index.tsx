import { Bell } from 'lucide-react';

interface ParentSettingsViewProps {
  setView: (view: string) => void;
}

export const ParentSettingsView = ({ setView }: ParentSettingsViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6 pb-20">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setView('home')}
        className="text-purple-600 font-semibold mb-4 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Reminder Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">Push Notifications</h4>
                <p className="text-sm text-gray-600">Get reminders in the app</p>
              </div>
              <button className="w-14 h-8 bg-purple-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">SMS Reminders</h4>
                <p className="text-sm text-gray-600">Text messages for scheduled activities</p>
              </div>
              <button className="w-14 h-8 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="py-3">
              <h4 className="font-medium text-gray-800 mb-2">Phone Number for SMS</h4>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <button className="mt-3 bg-purple-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-purple-600 transition-all">
                Save Phone Number
              </button>
            </div>

            <div className="py-3">
              <h4 className="font-medium text-gray-800 mb-3">Reminder Times</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Morning exercises</span>
                  <span className="text-purple-600 font-semibold">8:00 AM</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Afternoon activities</span>
                  <span className="text-purple-600 font-semibold">3:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Evening practice</span>
                  <span className="text-purple-600 font-semibold">7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Child Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Child&apos;s Name</label>
              <input
                type="text"
                defaultValue="Alex"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                defaultValue="7"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">App Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">Sound Effects</h4>
                <p className="text-sm text-gray-600">Play sounds for rewards</p>
              </div>
              <button className="w-14 h-8 bg-purple-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-gray-800">Weekly Progress Email</h4>
                <p className="text-sm text-gray-600">Get a summary every Sunday</p>
              </div>
              <button className="w-14 h-8 bg-purple-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
