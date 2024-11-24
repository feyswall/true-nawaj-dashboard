import { useEffect, useState } from 'react'
import { firebaseAuth } from '@/libs/firebase-config'

export const useAuth = () => {
  const [user, setUser] = useState<Record<string, any> | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const auth = firebaseAuth
    const unsubscribe = auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const idTokenResult = await currentUser.getIdTokenResult()
        setUser(currentUser)
        setRole(idTokenResult.claims.role)
      } else {
        setUser(null)
        setRole(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, role }
}
