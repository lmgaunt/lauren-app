'use client';

import React, { useState } from 'react';
import { Star, Trophy, Flame, CheckCircle, Circle, MessageSquare, Settings, Calendar, Clock, Bell, User, BarChart3, ChevronRight, Users, FileText, Plus, Download, Search, Filter, AlertCircle, TrendingUp, Activity } from 'lucide-react';

const TherapyApp = () => {
  const [mode, setMode] = useState('kid');
  const [view, setView] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [completedMissions, setCompletedMissions] = useState([1, 2]);
  const [stars, setStars] = useState(47);
  const [streak, setStreak] = useState(5);

  const patients = [
    { id: 1, name: 'Alex Martinez', age: 7, compliance: 85, lastActivity: '2 hours ago', streak: 5, alerts: 0, therapyType: 'PT, Speech' },
    { id: 2, name: 'Emma Johnson', age: 5, compliance: 92, lastActivity: '1 day ago', streak: 12, alerts: 0, therapyType: 'OT' },
    { id: 3, name: 'Liam Chen', age: 9, compliance: 45, lastActivity: '5 days ago', streak: 0, alerts: 2, therapyType: 'PT' },
    { id: 4, name: 'Sophia Williams', age: 6, compliance: 78, lastActivity: '3 hours ago', streak: 3, alerts: 0, therapyType: 'Speech, OT' },
    { id: 5, name: 'Noah Brown', age: 8, compliance: 95, lastActivity: '30 min ago', streak: 8, alerts: 0, therapyType: 'PT' },
  ];

  const missions = [
    {
      id: 1,
      title: 'Morning Stretches',
      time: '5 min',
      type: 'Physical Therapy',
      icon: '🤸',
      color: 'bg-purple-500',
      description: 'Gentle arm circles and shoulder rolls to improve range of motion and reduce stiffness.',
      instructions: '10 arm circles forward, 10 backward. Take breaks as needed. Focus on smooth, controlled movements.',
      clinicianNote: 'Prescribed by Dr. Sarah Chen, PT',
      frequency: 'Daily, morning'
    },
    {
      id: 2,
      title: 'Speech Practice',
      time: '10 min',
      type: 'Speech Therapy',
      icon: '🗣️',
      color: 'bg-pink-500',
      description: 'Articulation exercises focusing on /r/ and /s/ sounds with visual prompts.',
      instructions: 'Practice 10 words with target sounds. Use mirror for visual feedback. Celebrate effort, not perfection!',
      clinicianNote: 'Prescribed by Jamie Rodriguez, SLP',
      frequency: 'Daily, anytime'
    },
    {
      id: 3,
      title: 'Balance Game',
      time: '8 min',
      type: 'Physical Therapy',
      icon: '⚖️',
      color: 'bg-purple-500',
      description: 'Standing balance activities to strengthen core and improve stability.',
      instructions: 'Stand on one foot for 10 seconds, switch feet. Use wall for support if needed. 5 reps each side.',
      clinicianNote: 'Prescribed by Dr. Sarah Chen, PT',
      frequency: '3x per week'
    },
    {
      id: 4,
      title: 'Story Time',
      time: '15 min',
      type: 'Speech Therapy',
      icon: '📖',
      color: 'bg-pink-500',
      description: 'Interactive reading to build vocabulary and conversational skills.',
      instructions: 'Read together, asking "who, what, where" questions. Let your child retell parts of the story.',
      clinicianNote: 'Prescribed by Jamie Rodriguez, SLP',
      frequency: 'Daily, evening'
    },
  ];

  const weeklyData = [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 3 },
    { day: 'Wed', completed: 4 },
    { day: 'Thu', completed: 4 },
    { day: 'Fri', completed: 2 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 0 },
  ];

  const CharacterBuddy = ({ size = 'large' }: { size?: 'large' | 'medium' | 'small' }) => {
    const sizeClasses = size === 'large' ? 'w-48 h-48' : size === 'medium' ? 'w-32 h-32' : 'w-24 h-24';
    return (
      <div className={`${sizeClasses} relative mx-auto`}>
        <div className="w-full h-full bg-gradient-to-b from-pink-400 to-pink-500 rounded-full relative overflow-visible shadow-lg">
          <div className="absolute -top-4 left-8 w-8 h-12 bg-purple-600 rounded-t-full transform -rotate-12"></div>
          <div className="absolute -top-4 right-8 w-8 h-12 bg-purple-600 rounded-t-full transform rotate-12"></div>
          <div className="absolute top-8 -left-4 w-10 h-10 bg-pink-500 rounded-full"></div>
          <div className="absolute top-8 -right-4 w-10 h-10 bg-pink-500 rounded-full"></div>
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full shadow-inner"></div>
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-16 h-8 border-b-4 border-gray-700 rounded-b-full"></div>
          <div className="absolute top-1/2 left-4 w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-6 w-2 h-2 bg-pink-300 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 right-4 w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 right-6 w-2 h-2 bg-pink-300 rounded-full opacity-40"></div>
        </div>
      </div>
    );
  };

  const ModeToggle = () => (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-full shadow-lg p-1 flex gap-1">
      <button
        onClick={() => { setMode('kid'); setView('home'); }}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          mode === 'kid'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Kid
      </button>
      <button
        onClick={() => { setMode('parent'); setView('home'); }}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          mode === 'parent'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Parent
      </button>
      <button
        onClick={() => { setMode('clinician'); setView('home'); }}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          mode === 'clinician'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Clinician
      </button>
    </div>
  );

  // KID MODE VIEWS
  const KidHomeView = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 p-6 pb-20">
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

  const KidMissionView = () => {
    const [reps, setReps] = useState(0);
    const totalReps = 10;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-50 p-6 pb-20">
        <button
          onClick={() => setView('home')}
          className="text-purple-600 font-semibold mb-4"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <CharacterBuddy size="small" />
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-800">You&apos;ve got this! 💪</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">Morning Stretches</h2>
          <p className="text-gray-600 mb-6">Let&apos;s do {totalReps} arm circles together!</p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{reps} circles done</span>
              <span>{totalReps - reps} to go!</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                style={{ width: `${(reps / totalReps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 mb-6 text-center">
            <div className="text-6xl mb-4">🤸</div>
            <p className="text-lg font-semibold text-gray-700">Make big circles with your arms!</p>
          </div>

          <button
            onClick={() => {
              if (reps < totalReps) {
                setReps(reps + 1);
              }
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
            disabled={reps >= totalReps}
          >
            {reps < totalReps ? `Tap when you finish one! (${reps}/${totalReps})` : '🎉 All done!'}
          </button>

          {reps >= totalReps && (
            <button
              onClick={() => {
                setView('celebration');
                setStars(stars + 5);
              }}
              className="w-full mt-4 bg-green-500 text-white text-xl font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
            >
              Complete Quest! ✨
            </button>
          )}
        </div>
      </div>
    );
  };

  const KidCelebrationView = () => (
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

  // PARENT MODE VIEWS
  const ParentHomeView = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6 pb-20">
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

  const ParentExercisesView = () => (
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

  const ParentMessagesView = () => (
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

  const ParentSettingsView = () => (
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

  // CLINICIAN MODE VIEWS
  const ClinicianHomeView = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Dr. Sarah Chen, PT • 5 active patients</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Patient
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">5</p>
                <p className="text-sm text-gray-600">Active Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">81%</p>
                <p className="text-sm text-gray-600">Avg Compliance</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">2</p>
                <p className="text-sm text-gray-600">Need Attention</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">23</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Patient List</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                <Filter className="w-5 h-5 text-gray-600" />
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setView('patient-detail');
                }}
                className="w-full bg-gray-50 hover:bg-blue-50 rounded-xl p-4 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {patient.name}
                      </h4>
                      <div className="flex items-center gap-4">
                        {patient.alerts > 0 && (
                          <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            {patient.alerts} alert{patient.alerts > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className={`text-2xl font-bold ${
                          patient.compliance >= 80 ? 'text-green-600' :
                          patient.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {patient.compliance}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Age {patient.age}</span>
                      <span>•</span>
                      <span>{patient.therapyType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {patient.streak} day streak
                      </span>
                      <span>•</span>
                      <span>Last active: {patient.lastActivity}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setView('billing')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-800 mb-1">Billing &amp; Documentation</h4>
            <p className="text-sm text-gray-600">Generate reports for insurance</p>
          </button>
          <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group">
            <MessageSquare className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-800 mb-1">Messages</h4>
            <p className="text-sm text-gray-600">3 unread messages</p>
          </button>
          <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group">
            <Settings className="w-8 h-8 text-blue-600 mb-3 group-hover:rotate-90 transition-transform" />
            <h4 className="font-semibold text-gray-800 mb-1">Settings</h4>
            <p className="text-sm text-gray-600">Manage account &amp; preferences</p>
          </button>
        </div>
      </div>
    </div>
  );

  const ClinicianPatientDetailView = () => {
    if (!selectedPatient) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 pb-20">
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

  const ClinicianAssignExercisesView = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 pb-20">
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

  const ClinicianBillingView = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setView('home')}
          className="text-blue-600 font-semibold mb-4 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Billing &amp; Documentation</h1>
        <p className="text-gray-600 mb-6">Generate compliance reports and session documentation for insurance billing</p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                  {patients.map(p => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
                  <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                  <option>Compliance Summary</option>
                  <option>Session Documentation</option>
                  <option>Progress Report</option>
                  <option>Full Billing Report</option>
                </select>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Generate &amp; Download Report
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Total Billable Sessions (This Month)</p>
                <p className="text-3xl font-bold text-blue-600">47</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Average Compliance Rate</p>
                <p className="text-3xl font-bold text-green-600">81%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Remote Monitoring Hours</p>
                <p className="text-3xl font-bold text-purple-600">23.5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Documentation</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-800">Compliance Report - Alex Martinez</h4>
                <p className="text-sm text-gray-600">Generated Oct 25, 2024 • 14-day period</p>
              </div>
              <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-800">Session Notes - Emma Johnson</h4>
                <p className="text-sm text-gray-600">Generated Oct 23, 2024 • 30-day period</p>
              </div>
              <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-800">Progress Report - Noah Brown</h4>
                <p className="text-sm text-gray-600">Generated Oct 20, 2024 • 90-day period</p>
              </div>
              <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ModeToggle />
      {mode === 'kid' && (
        <>
          {view === 'home' && <KidHomeView />}
          {view === 'mission' && <KidMissionView />}
          {view === 'celebration' && <KidCelebrationView />}
        </>
      )}
      {mode === 'parent' && (
        <>
          {view === 'home' && <ParentHomeView />}
          {view === 'exercises' && <ParentExercisesView />}
          {view === 'messages' && <ParentMessagesView />}
          {view === 'settings' && <ParentSettingsView />}
        </>
      )}
      {mode === 'clinician' && (
        <>
          {view === 'home' && <ClinicianHomeView />}
          {view === 'patient-detail' && <ClinicianPatientDetailView />}
          {view === 'assign-exercises' && <ClinicianAssignExercisesView />}
          {view === 'billing' && <ClinicianBillingView />}
        </>
      )}
    </>
  );
};

export default TherapyApp;
