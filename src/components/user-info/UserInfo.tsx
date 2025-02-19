import { User } from '@/types';
import Image from 'next/image';

interface UserInfoProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const UserInfo = ({ user, size = 'md', showName = true }: UserInfoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200`}>
        {/* <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="object-cover"
        /> */}
      </div>
      {showName && (
        <span className="font-medium text-gray-900">{user.name}</span>
      )}
    </div>
  );
}; 