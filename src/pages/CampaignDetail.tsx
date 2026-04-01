import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaignStore } from '@/store/campaignStore';
import { StatusStepper } from '@/components/StatusStepper';
import { StatusBadge } from '@/components/StatusBadge';
import { Loader2, ArrowLeft, Sparkles, RefreshCw, Edit3, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

type TabKey = 'overview' | 'analysis' | 'strategy' | 'content';

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { campaigns, fetchCampaigns, runAnalysis, generateStrategy, generateContent, isLoading } = useCampaignStore();
  const [tab, setTab] = useState<TabKey>('overview');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  const campaign = campaigns.find((c) => c.id === id);
  if (!campaign) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Campaign not found</div>;
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'strategy', label: 'Strategy' },
    { key: 'content', label: 'Content' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/campaigns')} className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="page-header">{campaign.name}</h1>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="page-subheader">{campaign.description}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="glass-card p-5 overflow-x-auto">
        <StatusStepper currentStatus={campaign.status} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px',
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-base font-medium text-foreground capitalize">{campaign.type}</span>
          </div>
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-base font-medium text-foreground">{campaign.startDate} → {campaign.endDate}</span>
          </div>
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Status</span>
            <StatusBadge status={campaign.status} />
          </div>
          <div className="stat-card">
            <span className="text-sm text-muted-foreground">Images</span>
            <span className="text-base font-medium text-foreground">{campaign.images.length} uploaded</span>
          </div>
        </div>
      )}

      {tab === 'analysis' && (
        <div className="glass-card p-6 space-y-4">
          {!campaign.analysis ? (
            <div className="text-center py-8">
              <Sparkles className="h-10 w-10 mx-auto text-primary/40 mb-3" />
              <p className="text-sm text-muted-foreground mb-4">Run AI-powered market analysis for this campaign</p>
              <button
                onClick={() => runAnalysis(campaign.id)}
                disabled={isLoading}
                className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Run Analysis</>}
              </button>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_th]:text-muted-foreground [&_td]:text-muted-foreground [&_strong]:text-foreground">
              <ReactMarkdown>{campaign.analysis}</ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {tab === 'strategy' && (
        <div className="space-y-4">
          {!campaign.strategy ? (
            <div className="glass-card p-6 text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">Generate an AI strategy for this campaign</p>
              <button
                onClick={() => generateStrategy(campaign.id)}
                disabled={isLoading}
                className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate Strategy'}
              </button>
            </div>
          ) : (
            <>
              {/* Platform cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {campaign.strategy.platforms.map((p) => (
                  <div key={p} className="stat-card">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Platform</span>
                    <span className="text-base font-semibold text-foreground">{p}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="text-xl font-bold text-foreground">${campaign.strategy.budget.toLocaleString()}</span>
                </div>
                <div className="stat-card">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-base font-medium text-foreground">{campaign.strategy.duration}</span>
                </div>
                <div className="stat-card">
                  <span className="text-sm text-muted-foreground">Post Type</span>
                  <span className="text-base font-medium text-foreground capitalize">{campaign.strategy.postType}</span>
                </div>
              </div>

              {/* Schedule Grid */}
              <div className="glass-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Content Schedule</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Date</th>
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Platform</th>
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaign.strategy.schedule.map((s, i) => (
                        <tr key={i} className="border-b border-border/50 last:border-0">
                          <td className="px-5 py-3 text-foreground">{s.date}</td>
                          <td className="px-5 py-3 text-muted-foreground">{s.platform}</td>
                          <td className="px-5 py-3 text-muted-foreground">{s.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'content' && (
        <div className="space-y-4">
          {!campaign.content || campaign.content.length === 0 ? (
            <div className="glass-card p-6 text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">Generate AI content for this campaign</p>
              <button
                onClick={() => generateContent(campaign.id)}
                disabled={isLoading}
                className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate Content'}
              </button>
            </div>
          ) : (
            <>
              {/* Regenerate prompt */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter a prompt to regenerate content..."
                  className="flex-1 h-10 px-3 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={() => generateContent(campaign.id)}
                  disabled={isLoading}
                  className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><RefreshCw className="h-4 w-4" /> Regenerate</>}
                </button>
              </div>

              {/* Content cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaign.content.map((c) => (
                  <div key={c.id} className="glass-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{c.platform}</span>
                      <button className="p-1.5 rounded-md hover:bg-muted transition text-muted-foreground hover:text-foreground">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {c.imageUrl && (
                      <div className="h-40 rounded-lg bg-muted overflow-hidden">
                        <img src={c.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <p className="text-sm text-foreground leading-relaxed">{c.caption}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
