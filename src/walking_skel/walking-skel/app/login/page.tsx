'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import InfoModal from '@/app/components/InfoModal';

// Login screen - UI only for now, auth wiring (Supabase signInWithPassword) follows later
//
// Split into smaller files so each one fits on a screen (~60 lines):
// - LoginForm.tsx: the email/password form
// - components/InfoModal.tsx: the shared "info/error" popup
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setModal({ title: 'Missing info', message: 'Please enter your email and password.' });
      return;
    }

    setLoading(true);
    router.push('/');
    // TODO: Replace with Supabase auth.signInWithPassword({ email, password })
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-2xl font-extrabold tracking-[0.18em] text-(--teal-700) uppercase">
            Habito
          </p>
          <h2 className="text-2xl font-semibold text-(--teal-900) mt-1">Welcome back</h2>
          <p className="text-(--text-2) mt-1">Log in to continue tracking your habits.</p>
        </div>

        <LoginForm
          email={email}
          password={password}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />

        {modal && (
          <InfoModal title={modal.title} message={modal.message} onClose={() => setModal(null)} />
        )}
      </div>
    </div>
  );
}
