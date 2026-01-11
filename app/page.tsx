'use client';

import { useState } from 'react';
import { ModeToggle } from '@/app/components/ModeToggle';
import { KidHomeView, KidMissionView, KidCelebrationView, KidReflectionView } from '@/app/views/kid';
import { ParentHomeView, ParentExercisesView, ParentMessagesView, ParentSettingsView } from '@/app/views/parent';
import { ClinicianHomeView, ClinicianPatientDetailView, ClinicianAssignExercisesView, ClinicianBillingView } from '@/app/views/clinician';
import { Patient, Mission, WeeklyData, MissionAdherence, AdherenceStatus, ActivitySession, ReflectionChoice } from '@/app/types';

const TherapyApp = () => {
  const [mode, setMode] = useState('kid');
  const [view, setView] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [completedMissions, setCompletedMissions] = useState([1, 2]);
  const [stars, setStars] = useState(47);
  const [streak] = useState(5);

  // Adherence tracking for parent view
  const [todayAdherence, setTodayAdherence] = useState<Record<number, AdherenceStatus>>({
    1: 'done',
    2: 'done',
    3: 'pending',
    4: 'pending',
  });

  // Current activity session tracking
  const [currentSession, setCurrentSession] = useState<ActivitySession>({
    activityId: 1, // Default to first mission
    startedAt: Date.now(),
    endedAt: 0,
    durationSeconds: 0,
    completedTimer: false,
  });

  // Session data for all activities (for parent barrier tracking)
  const [sessionData, setSessionData] = useState<Record<number, ActivitySession>>({
    1: { activityId: 1, startedAt: Date.now(), endedAt: Date.now(), durationSeconds: 30, completedTimer: true, childReflectionChoice: 'did_it' },
    2: { activityId: 2, startedAt: Date.now(), endedAt: Date.now(), durationSeconds: 25, completedTimer: false, childReflectionChoice: 'did_it' },
    3: { activityId: 3, startedAt: 0, endedAt: 0, durationSeconds: 0, completedTimer: false },
    4: { activityId: 4, startedAt: 0, endedAt: 0, durationSeconds: 0, completedTimer: false },
  });

  // Handle child's reflection choice and map to parent adherence
  const handleReflectionChoice = (choice: ReflectionChoice) => {
    const activityId = currentSession.activityId;

    // Map child reflection to parent adherence status
    let status: AdherenceStatus;
    let needsSupport = false;

    switch (choice) {
      case 'did_it':
        status = 'done';
        break;
      case 'tried':
        status = 'tried';
        break;
      case 'need_help':
        status = 'tried';
        needsSupport = true;
        break;
    }

    // Update adherence status
    setTodayAdherence({
      ...todayAdherence,
      [activityId]: status,
    });

    // Update session with reflection choice
    const updatedSession = {
      ...currentSession,
      childReflectionChoice: choice,
      flagNeedsSupport: needsSupport,
    };
    setCurrentSession(updatedSession);

    // Also update sessionData
    setSessionData({
      ...sessionData,
      [activityId]: updatedSession,
    });

    // Update stars based on participation
    if (choice === 'did_it') {
      setStars(stars + 5);
    } else {
      setStars(stars + 3); // Still reward for trying!
    }
  };

  // Update session barriers (parent-only)
  const updateSessionBarriers = (missionId: number, barriers: string[], otherText?: string) => {
    setSessionData({
      ...sessionData,
      [missionId]: {
        ...sessionData[missionId],
        barriers,
        barrierOtherText: otherText,
        barrierLoggedAt: Date.now(),
      },
    });
  };

  const patients: Patient[] = [
    { id: 1, name: 'Alex Martinez', age: 7, compliance: 85, lastActivity: '2 hours ago', streak: 5, alerts: 0, therapyType: 'PT, Speech' },
    { id: 2, name: 'Emma Johnson', age: 5, compliance: 92, lastActivity: '1 day ago', streak: 12, alerts: 0, therapyType: 'OT' },
    { id: 3, name: 'Liam Chen', age: 9, compliance: 45, lastActivity: '5 days ago', streak: 0, alerts: 2, therapyType: 'PT' },
    { id: 4, name: 'Sophia Williams', age: 6, compliance: 78, lastActivity: '3 hours ago', streak: 3, alerts: 0, therapyType: 'Speech, OT' },
    { id: 5, name: 'Noah Brown', age: 8, compliance: 95, lastActivity: '30 min ago', streak: 8, alerts: 0, therapyType: 'PT' },
  ];

  const missions: Mission[] = [
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

  const weeklyData: WeeklyData[] = [
    { day: 'Mon', completed: 4, attempted: 4 },
    { day: 'Tue', completed: 2, attempted: 4 },
    { day: 'Wed', completed: 3, attempted: 4 },
    { day: 'Thu', completed: 3, attempted: 4 },
    { day: 'Fri', completed: 1, attempted: 3 },
    { day: 'Sat', completed: 0, attempted: 0 },
    { day: 'Sun', completed: 0, attempted: 0 },
  ];

  return (
    <>
      <ModeToggle mode={mode} setMode={setMode} setView={setView} />
      {mode === 'kid' && (
        <>
          {view === 'home' && (
            <KidHomeView
              streak={streak}
              stars={stars}
              missions={missions}
              completedMissions={completedMissions}
              setView={setView}
            />
          )}
          {view === 'mission' && (
            <KidMissionView
              setView={setView}
              stars={stars}
              setStars={setStars}
            />
          )}
          {view === 'celebration' && (
            <KidCelebrationView
              completedMissions={completedMissions}
              setCompletedMissions={setCompletedMissions}
              setView={setView}
            />
          )}
          {view === 'reflection' && (
            <KidReflectionView
              setView={setView}
              onReflectionChoice={handleReflectionChoice}
              sessionDuration={currentSession.durationSeconds}
              completedTimer={currentSession.completedTimer}
            />
          )}
        </>
      )}
      {mode === 'parent' && (
        <>
          {view === 'home' && (
            <ParentHomeView
              streak={streak}
              stars={stars}
              missions={missions}
              completedMissions={completedMissions}
              weeklyData={weeklyData}
              todayAdherence={todayAdherence}
              setTodayAdherence={setTodayAdherence}
              setView={setView}
            />
          )}
          {view === 'exercises' && (
            <ParentExercisesView
              missions={missions}
              completedMissions={completedMissions}
              todayAdherence={todayAdherence}
              setTodayAdherence={setTodayAdherence}
              sessionData={sessionData}
              updateSessionBarriers={updateSessionBarriers}
              setView={setView}
            />
          )}
          {view === 'messages' && <ParentMessagesView setView={setView} />}
          {view === 'settings' && <ParentSettingsView setView={setView} />}
        </>
      )}
      {mode === 'clinician' && (
        <>
          {view === 'home' && (
            <ClinicianHomeView
              patients={patients}
              setSelectedPatient={setSelectedPatient}
              setView={setView}
            />
          )}
          {view === 'patient-detail' && (
            <ClinicianPatientDetailView
              selectedPatient={selectedPatient}
              missions={missions}
              setView={setView}
            />
          )}
          {view === 'assign-exercises' && (
            <ClinicianAssignExercisesView
              selectedPatient={selectedPatient}
              setView={setView}
            />
          )}
          {view === 'billing' && (
            <ClinicianBillingView
              patients={patients}
              setView={setView}
            />
          )}
        </>
      )}
    </>
  );
};

export default TherapyApp;
