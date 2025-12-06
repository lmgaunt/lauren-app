interface ModeToggleProps {
  mode: string;
  setMode: (mode: string) => void;
  setView: (view: string) => void;
}

export const ModeToggle = ({ mode, setMode, setView }: ModeToggleProps) => (
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
