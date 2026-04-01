import { useEffect } from 'react';
import { useCampaignStore } from '@/store/campaignStore';
import { Link } from 'react-router-dom';
import { FileText, Edit3 } from 'lucide-react';

export default function Content() {
  const { campaigns, fetchCampaigns } = useCampaignStore();

  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  const withContent = campaigns.filter((c) => c.content && c.content.length > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Content</h1>
        <p className="page-subheader">All generated content across campaigns</p>
      </div>

      {withContent.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No content generated yet. Generate content from a campaign's Content tab.</p>
          <Link to="/campaigns" className="inline-block mt-4 text-sm text-primary hover:underline font-medium">Go to Campaigns</Link>
        </div>
      ) : (
        withContent.map((campaign) => (
          <div key={campaign.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">{campaign.name}</h2>
              <Link to={`/campaigns/${campaign.id}`} className="text-xs text-primary hover:underline">View Campaign</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaign.content!.map((c) => (
                <div key={c.id} className="glass-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{c.platform}</span>
                    <button className="p-1.5 rounded-md hover:bg-muted transition text-muted-foreground hover:text-foreground">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {c.imageUrl && (
                    <div className="h-32 rounded-lg bg-muted overflow-hidden">
                      <img src={c.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <p className="text-sm text-foreground leading-relaxed">{c.caption}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
