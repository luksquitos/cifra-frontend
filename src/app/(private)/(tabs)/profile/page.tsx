import { Button } from '@/components/ui/button'
import { useSession } from '@/providers/session-provider'

export default function Profile() {
  const { signOut } = useSession()
  return <Button style={{ marginTop: 40 }} variant="primary" radius="md" onPress={() => signOut()}>Sair</Button>
}
