import type { PropsWithChildren } from 'react'

import {
  createContext,

  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { SignInResponse, User } from '@/@types/api/sign-in'
import type { Tokens } from '@/@types/tokens'

import { cifraApi } from '@/libs/cifra-api'
import {
  getSession,
  removeSession,
  storeSession,
} from '@/storage/session-storage'
import { getTokens, removeTokens, storeTokens } from '@/storage/token-storage'

type SessionContextProps = {
  session: User | null
  tokens: Tokens | null
  isLoadingSession: boolean
  signOut: () => void
  signIn: (session: SignInResponse) => Promise<void>
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

  async function signIn(session: SignInResponse) {
    setIsLoadingSession(true)

    await saveSessionAndToken(session.user, {
      accessToken: session.access,
      refreshToken: session.refresh,
    })
    await updateSessionAndToken(session.user, {
      accessToken: session.access,
      refreshToken: session.refresh,
    })
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

  const contextValue = useMemo(
    () => ({
      session,
      tokens,
      isLoadingSession,
      signIn,
      signOut,
    }),
    [session, tokens, isLoadingSession],
  )

  return (
    <SessionContext.Provider value={contextValue}>
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
