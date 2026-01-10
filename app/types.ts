export interface Patient {
  id: number;
  name: string;
  age: number;
  compliance: number;
  lastActivity: string;
  streak: number;
  alerts: number;
  therapyType: string;
}

export interface Mission {
  id: number;
  title: string;
  time: string;
  type: string;
  icon: string;
  color: string;
  description: string;
  instructions: string;
  clinicianNote: string;
  frequency: string;
}

export interface WeeklyData {
  day: string;
  completed: number;
  attempted?: number;
}

export type AdherenceStatus = 'done' | 'partial' | 'tried' | 'not_today' | 'pending';

export interface MissionAdherence {
  missionId: number;
  status: AdherenceStatus;
  date: string;
  note?: string;
}

export type ReflectionChoice = 'did_it' | 'tried' | 'need_help';

export interface ActivitySession {
  activityId: number;
  startedAt: number;
  endedAt: number;
  durationSeconds: number;
  completedTimer: boolean;
  childReflectionChoice?: ReflectionChoice;
  flagNeedsSupport?: boolean;
  barriers?: string[];
  barrierOtherText?: string;
  barrierLoggedAt?: number;
}
