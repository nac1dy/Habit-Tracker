'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from './RegisterForm';
import InfoModal from '@/app/components/InfoModal';
import { registerAction } from '@/app/backend/auth/actions';

// Register screen. The account is created on the server via registerAction,
// this page only handles form state, popups and navigation.
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setModal({ title: 'Missing info', message: 'Please fill in all fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setModal({ title: 'Passwords do not match', message: 'Please make sure both passwords are the same.' });
      return;
    }

    setLoading(true);
    const result = await registerAction(email, password);
    setLoading(false);

    if (!result.ok) {
      setModal({ title: 'Sign up failed', message: result.message });
      return;
    }

    // With "Confirm email" on there is no session yet, so the user stays here
    if (result.needsEmailConfirmation) {
      setModal({
        title: 'Check your email',
        message: 'We sent you a link to confirm your account. After confirming you can log in.',
      });
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-2xl font-extrabold tracking-[0.18em] text-(--teal-700) uppercase">
            Habito
          </p>
          <h2 className="text-2xl font-semibold text-(--teal-900) mt-1">Create your account</h2>
          <p className="text-(--text-2) mt-1">Sign up to start tracking your habits.</p>
        </div>

        <RegisterForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleSubmit}
        />

        {modal && (
          <InfoModal title={modal.title} message={modal.message} onClose={() => setModal(null)} />
        )}
      </div>
    </div>
  );
}
