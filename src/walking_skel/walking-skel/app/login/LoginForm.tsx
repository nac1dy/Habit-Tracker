import Link from 'next/link';

const inputClass =
  'w-full px-4 py-2 border border-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] bg-white text-[var(--text)]';

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

// The actual email/password form, separated from page.tsx so that file
// only has to deal with page layout and state, not the form markup.
export default function LoginForm({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 border border-[var(--text)]"
      style={{ borderRadius: 'var(--radius-lg)' }}
    >
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-2)] mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-2)] mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white font-semibold py-2 px-6 transition transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: 'linear-gradient(135deg, var(--teal-500), var(--teal-700))',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      <p className="mt-6 text-center text-sm text-[var(--text-2)]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[var(--teal-700)] font-semibold hover:text-[var(--teal-900)]">
          Sign up
        </Link>
      </p>
    </form>
  );
}
