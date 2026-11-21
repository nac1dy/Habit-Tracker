import Link from 'next/link';

const inputClass =
  'w-full px-4 py-2 border border-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] bg-(--card) text-(--text)';

type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

// The actual email/password/confirm-password form, separated from page.tsx so that
// file only has to deal with page layout and state, not the form markup.
export default function RegisterForm({
  email,
  password,
  confirmPassword,
  loading,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-(--card) text-(--text) p-8 border border-foreground"
      style={{ borderRadius: 'var(--radius-lg)' }}
    >
      <div className="mb-6">
        <label className="block text-sm font-medium text-(--text) mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-(--text) mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-(--text) mb-2">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white font-semibold py-2 px-6 transition hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: 'linear-gradient(135deg, #35b8aa, #1b6f68)',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      <p className="mt-6 text-center text-sm text-(--text)">
        Already have an account?{' '}
        <Link href="/login" className="text-(--teal-700) font-semibold hover:text-(--teal-900)">
          Log in
        </Link>
      </p>
    </form>
  );
}
