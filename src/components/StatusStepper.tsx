import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { CampaignStatus } from '@/store/campaignStore';

const steps: { key: CampaignStatus; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'content', label: 'Content' },
  { key: 'approved', label: 'Approved' },
  { key: 'published', label: 'Published' },
];

export function StatusStepper({ currentStatus }: { currentStatus: CampaignStatus }) {
  const currentIdx = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const isCompleted = i < currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  isCompleted && 'bg-success text-success-foreground',
                  isCurrent && 'bg-primary text-primary-foreground',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn('text-[10px] mt-1 font-medium', isCurrent ? 'text-primary' : 'text-muted-foreground')}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('h-0.5 w-8 mx-1 mt-[-12px]', i < currentIdx ? 'bg-success' : 'bg-border')} />
            )}
          </div>
        );
      })}
    </div>
  );
}
