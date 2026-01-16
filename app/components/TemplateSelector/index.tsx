'use client';

import { PlanTemplate } from '@/app/data/planTemplates';
import { ChevronDown } from 'lucide-react';

interface TemplateSelectorProps {
  templates: PlanTemplate[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
}

export const TemplateSelector = ({ templates, selectedTemplateId, onTemplateChange }: TemplateSelectorProps) => {
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
      <label htmlFor="template-select" className="block text-sm font-semibold text-gray-700 mb-2">
        Activity Plan
      </label>
      <div className="relative">
        <select
          id="template-select"
          value={selectedTemplateId}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 font-medium focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name} ({template.activities.length} {template.activities.length === 1 ? 'activity' : 'activities'})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedTemplate && (
        <div className="mt-3 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Age:</span> {selectedTemplate.ageRange.replace('_', ' ')} •
            <span className="font-semibold"> Routine:</span> {selectedTemplate.routineAnchorDefault.replace('_', ' ')} •
            <span className="font-semibold"> Frequency:</span> {selectedTemplate.frequencyPerWeekDefault}x/week
          </p>
        </div>
      )}
    </div>
  );
};
