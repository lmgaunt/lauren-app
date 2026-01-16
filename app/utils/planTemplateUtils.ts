import { Mission } from '@/app/types';
import { PlanTemplate, PlanTemplateActivity, getActivityIcon, getActivityColor, getRoutineAnchorDisplay } from '@/app/data/planTemplates';

export function convertActivityToMission(
  activity: PlanTemplateActivity,
  template: PlanTemplate,
  missionId: number
): Mission {
  const minutes = Math.ceil(activity.defaultDurationSec / 60);

  return {
    id: missionId,
    title: activity.title,
    time: `${minutes} min`,
    type: activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: getActivityIcon(activity.type),
    color: getActivityColor(activity.type),
    description: activity.instructions || `Practice ${activity.title.toLowerCase()} to build skills.`,
    instructions: activity.instructions || `Complete this ${minutes}-minute activity.`,
    clinicianNote: `Part of ${template.name}`,
    frequency: `${template.frequencyPerWeekDefault}x per week, ${getRoutineAnchorDisplay(template.routineAnchorDefault)}`,
    durationSec: activity.defaultDurationSec,
    templateActivityId: activity.id,
  };
}

export function convertTemplateToMissions(template: PlanTemplate, startingId: number = 1): Mission[] {
  return template.activities.map((activity, index) =>
    convertActivityToMission(activity, template, startingId + index)
  );
}

export function getAllActivitiesAsMissions(templates: PlanTemplate[]): Mission[] {
  let missions: Mission[] = [];
  let currentId = 1;

  templates.forEach(template => {
    const templateMissions = convertTemplateToMissions(template, currentId);
    missions = [...missions, ...templateMissions];
    currentId += template.activities.length;
  });

  return missions;
}
