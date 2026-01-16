// src/data/planTemplates.ts

export type RoutineAnchor =
  | "morning"
  | "after_school"
  | "dinner"
  | "bedtime"
  | "anytime";

export type ActivityType =
  | "regulation"
  | "fine_motor"
  | "gross_motor"
  | "speech"
  | "executive_function";

export type PlanTemplateActivity = {
  id: string;
  title: string;
  type: ActivityType;
  defaultDurationSec: number; // timer length
  instructions?: string;
};

export type PlanTemplate = {
  id: string;
  name: string;
  ageRange: "toddler" | "preschool" | "school_age";
  routineAnchorDefault: RoutineAnchor;
  frequencyPerWeekDefault: number;
  activities: PlanTemplateActivity[];
};

export const planTemplates: PlanTemplate[] = [
  {
    id: "tpl_calm_body_after_school_preschool",
    name: "Calm Body After School (Preschool)",
    ageRange: "preschool",
    routineAnchorDefault: "after_school",
    frequencyPerWeekDefault: 4,
    activities: [
      {
        id: "act_calm_body",
        title: "Calm Body Reset",
        type: "regulation",
        defaultDurationSec: 120,
        instructions: "Do 2 minutes of calm breathing or deep pressure."
      },
      {
        id: "act_transition_helper",
        title: "Transition Helper",
        type: "executive_function",
        defaultDurationSec: 60,
        instructions: "Practice 1 transition with a visual countdown."
      }
    ]
  },
  {
    id: "tpl_bedtime_wind_down_toddler",
    name: "Bedtime Wind Down (Toddler)",
    ageRange: "toddler",
    routineAnchorDefault: "bedtime",
    frequencyPerWeekDefault: 5,
    activities: [
      {
        id: "act_bedtime_calm",
        title: "Bedtime Calm Body",
        type: "regulation",
        defaultDurationSec: 180
      }
    ]
  },
  {
    id: "tpl_hand_helper_homework_schoolage",
    name: "Hand Helper Homework (School-Age)",
    ageRange: "school_age",
    routineAnchorDefault: "after_school",
    frequencyPerWeekDefault: 3,
    activities: [
      {
        id: "act_hand_helper",
        title: "Hand Helper",
        type: "fine_motor",
        defaultDurationSec: 120
      }
    ]
  },
  {
    id: "tpl_big_body_play_anytime",
    name: "Big Body Play (Anytime)",
    ageRange: "preschool",
    routineAnchorDefault: "anytime",
    frequencyPerWeekDefault: 3,
    activities: [
      {
        id: "act_big_body",
        title: "Big Body Movement",
        type: "gross_motor",
        defaultDurationSec: 180
      }
    ]
  },
  {
    id: "tpl_speech_practice_schoolage",
    name: "Speech Practice (School-Age)",
    ageRange: "school_age",
    routineAnchorDefault: "dinner",
    frequencyPerWeekDefault: 4,
    activities: [
      {
        id: "act_speech_practice",
        title: "Speech Practice",
        type: "speech",
        defaultDurationSec: 120
      }
    ]
  },
  {
    id: "tpl_morning_launch_schoolage",
    name: "Morning Launch (School-Age)",
    ageRange: "school_age",
    routineAnchorDefault: "morning",
    frequencyPerWeekDefault: 4,
    activities: [
      {
        id: "act_morning_ready",
        title: "Morning Ready Routine",
        type: "executive_function",
        defaultDurationSec: 60
      }
    ]
  }
];

// Helper to get activity type emoji/icon
export const getActivityIcon = (type: ActivityType): string => {
  switch (type) {
    case "regulation":
      return "🧘";
    case "fine_motor":
      return "✋";
    case "gross_motor":
      return "🤸";
    case "speech":
      return "🗣️";
    case "executive_function":
      return "🧠";
    default:
      return "⭐";
  }
};

// Helper to get activity type color
export const getActivityColor = (type: ActivityType): string => {
  switch (type) {
    case "regulation":
      return "bg-blue-500";
    case "fine_motor":
      return "bg-green-500";
    case "gross_motor":
      return "bg-purple-500";
    case "speech":
      return "bg-pink-500";
    case "executive_function":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

// Helper to get routine anchor display name
export const getRoutineAnchorDisplay = (anchor: RoutineAnchor): string => {
  switch (anchor) {
    case "morning":
      return "Morning";
    case "after_school":
      return "After School";
    case "dinner":
      return "Dinner Time";
    case "bedtime":
      return "Bedtime";
    case "anytime":
      return "Anytime";
  }
};
