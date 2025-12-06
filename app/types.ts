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
}
