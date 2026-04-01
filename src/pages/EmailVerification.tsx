import { Link } from 'react-router-dom';

export default function EmailVerification() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center glass-card p-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl">✉</div>
        <h2 className="text-lg font-semibold text-foreground">Verify your email</h2>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent a verification email to your inbox. Click the link to activate your account.
        </p>
        <div className="mt-6 space-y-3">
          <button className="w-full h-10 rounded-lg border border-input bg-card text-sm font-medium text-foreground hover:bg-muted transition">
            Resend email
          </button>
          <Link to="/login" className="block text-sm text-primary hover:underline font-medium">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
