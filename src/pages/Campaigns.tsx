import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Eye, Search } from 'lucide-react';
import { useCampaignStore } from '@/store/campaignStore';
import { StatusBadge } from '@/components/StatusBadge';
import { TableSkeleton } from '@/components/SkeletonLoader';

export default function Campaigns() {
  const { campaigns, fetchCampaigns, deleteCampaign, isLoading } = useCampaignStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Campaigns</h1>
          <p className="page-subheader">Manage your marketing campaigns</p>
        </div>
        <button
          onClick={() => navigate('/campaigns/create')}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="p-5"><TableSkeleton /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Start</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">End</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition">
                    <td className="px-5 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-5 py-3 text-muted-foreground capitalize">{c.type}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">{c.startDate}</td>
                    <td className="px-5 py-3 text-muted-foreground">{c.endDate}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/campaigns/${c.id}`} className="p-1.5 rounded-md hover:bg-muted transition text-muted-foreground hover:text-foreground">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button onClick={() => deleteCampaign(c.id)} className="p-1.5 rounded-md hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">No campaigns found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
