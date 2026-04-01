import { cn } from '@/lib/utils';
import type { CampaignStatus } from '@/store/campaignStore';

const statusConfig: Record<CampaignStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  analysis: { label: 'Analysis', className: 'bg-info/10 text-info' },
  strategy: { label: 'Strategy', className: 'bg-warning/10 text-warning' },
  content: { label: 'Content', className: 'bg-primary/10 text-primary' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
  published: { label: 'Published', className: 'bg-success text-success-foreground' },
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  );
}
