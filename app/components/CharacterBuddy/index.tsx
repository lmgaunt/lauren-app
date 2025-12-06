interface CharacterBuddyProps {
  size?: 'large' | 'medium' | 'small';
}

export const CharacterBuddy = ({ size = 'large' }: CharacterBuddyProps) => {
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
