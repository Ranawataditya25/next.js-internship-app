'use client';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations('Landing');

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>My Internship App</h1>
      <p>This is an informative landing page.</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/login')}
        style={{ marginTop: '20px' }}
      >
        {t('getStarted')}
      </Button>
    </div>
  );
}
