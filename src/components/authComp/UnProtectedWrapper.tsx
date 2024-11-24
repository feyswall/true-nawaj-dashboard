// components/ProtectedWrapper.tsx
'use client';

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '@/libs/firebase-config';

import { useRouter } from 'next/navigation';

import { ReactNode, useEffect } from 'react';

import Loader from '@/components/common/Loader';

interface ProtectedWrapperProps {
  children: ReactNode;
}

const UnProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const [user, loading] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) return <Loader />;

  return <>{!user ? children : null}</>;
};

export default UnProtectedWrapper;
