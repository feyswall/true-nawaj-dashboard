// components/ProtectedWrapper.tsx
'use client';

import { useEffect } from 'react';

import type {ReactNode} from 'react';

import { useRouter } from 'next/navigation';

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '@/libs/firebase-config';

import Loader from '@/components/common/Loader';

interface ProtectedWrapperProps {
  children: ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const [user, loading] = useAuthState(firebaseAuth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) return <Loader />;

  return <>{user ? children : null}</>;
};

export default ProtectedWrapper;
