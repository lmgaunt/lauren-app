import { User, MessageSquare } from 'lucide-react';

interface ParentMessagesViewProps {
  setView: (view: string) => void;
}

export const ParentMessagesView = ({ setView }: ParentMessagesViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6 pb-20">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setView('home')}
        className="text-purple-600 font-semibold mb-4 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dr. Sarah Chen, PT</h3>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-gray-700 mb-2">Great progress on the balance exercises! I&apos;ve added a new activity to build on this momentum.</p>
              <span className="text-sm text-purple-600 font-medium">Tap to reply</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Jamie Rodriguez, SLP</h3>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
              <p className="text-gray-700 mb-2">Alex did wonderful work in our session today. Keep practicing those /r/ sounds at home!</p>
              <span className="text-sm text-pink-600 font-medium">Tap to reply</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <MessageSquare className="w-5 h-5 inline mr-2" />
          Start New Conversation
        </button>
      </div>
    </div>
  </div>
);
