import Image from 'next/image';

interface CharacterBuddyProps {
  size?: 'large' | 'medium' | 'small';
}

export const CharacterBuddy = ({ size = 'large' }: CharacterBuddyProps) => {
  const sizeMap = {
    large: 192,  // w-48 = 192px
    medium: 128, // w-32 = 128px
    small: 96,   // w-24 = 96px
  };

  const pixelSize = sizeMap[size];

  return (
    <div className="relative mx-auto" style={{ width: pixelSize, height: pixelSize }}>
      <Image
        src="/images/mascot.png"
        alt="Friendly mascot character"
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        priority
      />
    </div>
  );
};
