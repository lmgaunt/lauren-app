import Image from 'next/image';

interface CharacterBuddyProps {
  size?: 'large' | 'medium' | 'small';
}

export const CharacterBuddy = ({ size = 'large' }: CharacterBuddyProps) => {
  const sizeValue = size === 'large' ? 192 : size === 'medium' ? 128 : 96;
  return (
    <div className="relative mx-auto" style={{ width: sizeValue, height: sizeValue }}>
      <Image
        src="/kindly.png"
        alt="Kindly Monster Mascot"
        width={sizeValue}
        height={sizeValue}
        className="object-contain"
      />
    </div>
  );
};
