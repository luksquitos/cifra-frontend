import type { Tokens } from '@/@types/tokens'
import type { User } from '@/@types/user'
import type { PropsWithChildren } from 'react'

import {
  getSession,
  removeSession,
  storeSession,
} from '@/storage/session-storage'
import { getTokens, removeTokens, storeTokens } from '@/storage/token-storage'
import {
  createContext,

  useContext,
  useEffect,
  useState,
} from 'react'

import { cifraApi } from '@/libs/cifra-api'

type SessionContextProps = {
  session: User | null
  tokens: Tokens | null
  isLoadingSession: boolean
  signOut: () => void
  signIn: (tokens: Tokens, user: User) => void
}

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps,
)

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<User | null>(null)
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const [isLoadingSession, setIsLoadingSession] = useState(false)

  async function updateSessionAndToken(session: User, tokens: Tokens) {
    cifraApi.axios.defaults.headers.common.Authorization
      = `Bearer ${tokens.accessToken}`
    setTokens(tokens)
    setSession(session)
  }

  async function saveSessionAndToken(
    session: User,
    { accessToken, refreshToken }: Tokens,
  ) {
    await storeSession(session)
    await storeTokens({ accessToken, refreshToken })
  }

  async function signIn(tokens: Tokens, user: User) {
    setIsLoadingSession(true)

    saveSessionAndToken(user, tokens)
    updateSessionAndToken(user, tokens)
    setIsLoadingSession(false)
  }

  async function signOut() {
    setIsLoadingSession(true)
    setSession(null)
    setTokens(null)
    await removeSession()
    await removeTokens()
    cifraApi.axios.defaults.headers.common.Authorization = ''

    setIsLoadingSession(false)
  }

  async function loadSessionData() {
    const session = await getSession()
    const tokens = await getTokens()

    if (session && tokens) {
      updateSessionAndToken(session, tokens)
    }
  }

  useEffect(() => {
    loadSessionData()
  }, [])

  useEffect(() => {
    const subscribe = cifraApi.axios.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <SessionContext.Provider
      value={{
        session,
        tokens,
        isLoadingSession,
        signIn,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('You can\'t use useSession outside SessionProvider')
  }

  return context
}
