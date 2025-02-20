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
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwSkNOPTYwPTYyRkNUSFZIMS8wTh8+YV1JXE5WaXRlc35DWGR+aWf/2wBDARUXFyAeIBogHB4gGBgYICQiICAgICQsJCQkJCQsLiwsLCwsLC4uLi4uLi4uMTExMTExOTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          className="object-cover transition-opacity duration-300 opacity-0"
          onLoadingComplete={(img) => {
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }}
          sizes="(max-width: 768px) 100vw, 48px"
          priority={false}
        />
      </div>
      {showName && (
        <span className="font-medium text-gray-900">{user.name}</span>
      )}
    </div>
  );
}; 