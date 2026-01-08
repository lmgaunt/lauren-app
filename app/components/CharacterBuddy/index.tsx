import Image from 'next/image';

interface CharacterBuddyProps {
  size?: 'large' | 'medium' | 'small';
}

export const CharacterBuddy = ({ size = 'large' }: CharacterBuddyProps) => {
  const sizeMap = {
    large: 320,  // Much larger for better visibility
    medium: 240,
    small: 180,
  };

  const pixelSize = sizeMap[size];

  return (
    <div
      className="relative mx-auto rounded-full overflow-hidden"
      style={{
        width: pixelSize,
        height: pixelSize,
        background: 'linear-gradient(to bottom, #fef9f3, #ffffff)',
      }}
    >
      <Image
        src="/images/mascot.png"
        alt="Friendly mascot character"
        width={pixelSize}
        height={pixelSize}
        className="object-contain mix-blend-multiply"
        priority
      />
    </div>
  );
};
