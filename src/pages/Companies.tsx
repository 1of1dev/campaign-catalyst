import { useEffect, useState } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { Plus, Globe, X } from 'lucide-react';
import { CardSkeleton } from '@/components/SkeletonLoader';

export default function Companies() {
  const { companies, activeCompany, setActiveCompany, createCompany, isLoading } = useCompanyStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', industry: '', website: '' });

  const handleCreate = async () => {
    await createCompany(form);
    setForm({ name: '', industry: '', website: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">My Companies</h1>
          <p className="page-subheader">Manage your organizations</p>
        </div>
        <button onClick={() => setShowModal(true)} className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Company
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : companies.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCompany(c)}
                className={`glass-card p-5 cursor-pointer transition hover:shadow-md ${activeCompany?.id === c.id ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.industry}</p>
                  </div>
                </div>
                {c.website && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" /> {c.website}
                  </div>
                )}
                {activeCompany?.id === c.id && (
                  <span className="inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider text-primary">Active</span>
                )}
              </div>
            ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Create Company</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-md hover:bg-muted transition text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Industry</label>
                <input type="text" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Website</label>
                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleCreate} className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">Create</button>
                <button onClick={() => setShowModal(false)} className="h-10 px-6 rounded-lg border border-input bg-card text-sm font-medium text-foreground hover:bg-muted transition">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
