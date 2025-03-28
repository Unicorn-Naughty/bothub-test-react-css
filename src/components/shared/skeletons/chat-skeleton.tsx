import React from 'react';
import { Skeleton } from '../../ui/skeleton/skeleton';
interface Props {
 className?: string 
}

export const ChatSkeleton: React.FC<Props> = () => {
  return (
    <div className='flex items-center justify-between p-2'>
        <div className='flex items-center gap-2'>
            <Skeleton className='size-[18px]'/>
            <Skeleton className='w-[100px] h-[22px]'/>
        </div>
        <Skeleton className='size-[18px]'/>
    </div>
  )
}
