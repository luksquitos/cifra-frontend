import type { ReactNode } from 'react'

import React, { createContext, useContext, useState } from 'react'

type SessionState = { user: { id: string, name: string } } | null

type SessionContextProps = {
  session: SessionState
  setSession: React.Dispatch<React.SetStateAction<SessionState>>
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

type SessionProviderProps = {
  children: ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionState>(null)

  const contextValue = React.useMemo(() => ({ session, setSession }), [session, setSession])

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession(): SessionContextProps {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
