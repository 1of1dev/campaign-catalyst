import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCompanyStore } from '@/store/companyStore';
import { cn } from '@/lib/utils';

type SettingsTab = 'profile' | 'company';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const { activeCompany, updateCompany } = useCompanyStore();
  const [tab, setTab] = useState<SettingsTab>('profile');

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const [compName, setCompName] = useState(activeCompany?.name || '');
  const [compIndustry, setCompIndustry] = useState(activeCompany?.industry || '');
  const [compWebsite, setCompWebsite] = useState(activeCompany?.website || '');

  const [saved, setSaved] = useState(false);

  const handleProfileSave = () => {
    if (user) setUser({ ...user, name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCompanySave = async () => {
    if (activeCompany) await updateCompany(activeCompany.id, { name: compName, industry: compIndustry, website: compWebsite });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="page-header">Settings</h1>

      <div className="flex gap-1 border-b border-border">
        {(['profile', 'company'] as SettingsTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px capitalize',
              tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="glass-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">New password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={handleProfileSave} className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
            {saved ? '✓ Saved' : 'Save changes'}
          </button>
        </div>
      )}

      {tab === 'company' && (
        <div className="glass-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Company name</label>
            <input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Industry</label>
            <input type="text" value={compIndustry} onChange={(e) => setCompIndustry(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Website</label>
            <input type="url" value={compWebsite} onChange={(e) => setCompWebsite(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={handleCompanySave} className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
            {saved ? '✓ Saved' : 'Save changes'}
          </button>
        </div>
      )}
    </div>
  );
}
