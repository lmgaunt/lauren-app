'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface BarrierTaggingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (barriers: string[], otherText?: string) => void;
  preselectedBarriers?: string[];
}

const barrierOptions = [
  { id: 'too_tired', label: 'Too tired', emoji: '😴' },
  { id: 'meltdown', label: 'Meltdown/dysregulated', emoji: '😰' },
  { id: 'time_got_away', label: 'Time got away', emoji: '⏰' },
  { id: 'didnt_understand', label: "Didn't understand how", emoji: '❓' },
  { id: 'sensory_overload', label: 'Sensory overload', emoji: '🎵' },
  { id: 'pain', label: 'Pain/discomfort', emoji: '🤕' },
  { id: 'school_disruption', label: 'School/daycare disruption', emoji: '🏫' },
  { id: 'other', label: 'Other', emoji: '✏️' },
];

export const BarrierTagging = ({ isOpen, onClose, onSave, preselectedBarriers = [] }: BarrierTaggingProps) => {
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>(preselectedBarriers);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedBarriers(preselectedBarriers);
      setOtherText('');
    }
  }, [isOpen, preselectedBarriers]);

  if (!isOpen) return null;

  const toggleBarrier = (barrierId: string) => {
    if (selectedBarriers.includes(barrierId)) {
      setSelectedBarriers(selectedBarriers.filter(b => b !== barrierId));
    } else {
      setSelectedBarriers([...selectedBarriers, barrierId]);
    }
  };

  const handleSave = () => {
    const finalBarriers = selectedBarriers.filter(b => b !== 'other');
    onSave(finalBarriers, selectedBarriers.includes('other') ? otherText : undefined);
    onClose();
  };

  const canSave = selectedBarriers.length > 0 && (!selectedBarriers.includes('other') || otherText.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">What got in the way?</h2>
            <p className="text-sm text-gray-600">Optional — helps your therapist adjust the plan.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {barrierOptions.map((option) => {
              const isSelected = selectedBarriers.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleBarrier(option.id)}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                    ${isSelected
                      ? 'bg-purple-100 border-purple-500 shadow-md scale-105'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className={`text-sm font-semibold ${isSelected ? 'text-purple-800' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedBarriers.includes('other') && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please describe:
              </label>
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value.slice(0, 120))}
                placeholder="What happened? (optional)"
                maxLength={120}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {otherText.length}/120 characters
              </p>
            </div>
          )}

          {selectedBarriers.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  This information helps your therapist understand patterns and adjust activities to better support your child.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`
                flex-1 font-semibold py-4 rounded-xl transition-all
                ${canSave
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
