import { useEffect } from 'react';
import { useCampaignStore } from '@/store/campaignStore';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

export default function Strategy() {
  const { campaigns, fetchCampaigns } = useCampaignStore();

  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  const withStrategy = campaigns.filter((c) => c.strategy);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Strategy</h1>
        <p className="page-subheader">View campaign strategies across all campaigns</p>
      </div>

      {withStrategy.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Lightbulb className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No strategies generated yet. Generate one from a campaign's Strategy tab.</p>
          <Link to="/campaigns" className="inline-block mt-4 text-sm text-primary hover:underline font-medium">Go to Campaigns</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {withStrategy.map((c) => (
            <Link key={c.id} to={`/campaigns/${c.id}`} className="glass-card p-5 hover:shadow-md transition space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                <span className="text-xs text-primary font-medium">{c.strategy!.platforms.length} platforms</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {c.strategy!.platforms.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{p}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Budget: ${c.strategy!.budget.toLocaleString()}</span>
                <span>Duration: {c.strategy!.duration}</span>
                <span className="capitalize">{c.strategy!.postType}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
