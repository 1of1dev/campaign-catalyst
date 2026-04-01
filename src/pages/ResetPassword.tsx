import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Set new password</h1>
        </div>
        <div className="glass-card p-6">
          {done ? (
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto text-xl">✓</div>
              <p className="text-sm text-muted-foreground">Password updated successfully</p>
              <Link to="/login" className="inline-block text-sm text-primary hover:underline font-medium">Sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">New password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Confirm password</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                {password && confirm && password !== confirm && <p className="text-xs text-destructive mt-1">Passwords don&apos;t match</p>}
              </div>
              <button type="submit" disabled={loading || password !== confirm} className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
