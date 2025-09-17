import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        signInAnonymously(auth)
          .then((result) => setUser(result.user))
          .catch((error) => console.error('匿名サインインエラー:', error));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};