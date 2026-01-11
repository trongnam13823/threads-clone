import { BadgeCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const VerifiedBadge = ({ className }) => {
  return <BadgeCheckIcon className={cn('fill-blue-500 text-white', className)} />;
};

export default VerifiedBadge;
