import { Button } from '@/components/ui/button'
import { useSession } from '@/providers/session-provider'

export default function Profile() {
  const { signOut } = useSession()
  return <Button style={{ marginTop: 40, marginHorizontal: 20 }} variant="secondary" radius="md" onPress={() => signOut()}>Sair</Button>
}
