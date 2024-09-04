import {
  type LucideIcon,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  HelpCircle,
  IdCard,
  ImageUp,
  Languages,
  LifeBuoy,
  LogOut,
  Map,
  Palette,
  Phone,
  Settings,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Power,
} from 'lucide-react-native'
import { cssInterop } from 'nativewind'

/*
 * Compatibility layer between lucide-native and
 * nativewind whenever it is necessary to use
 * a lucide-native icon it must be imported from
 * this layer
 */

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })
}

const icons: Record<string, LucideIcon> = {
  Settings,
  Map,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Camera,
  IdCard,
  Languages,
  Palette,
  HelpCircle,
  LogOut,
  Phone,
  LifeBuoy,
  CheckCircle,
  ImageUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Power,
}

Object.values(icons).forEach(interopIcon)

export {
  Settings,
  Map,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ImageUp,
  ChevronUp,
  Camera,
  IdCard,
  Languages,
  Palette,
  HelpCircle,
  LogOut,
  Phone,
  LifeBuoy,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Power,
}
