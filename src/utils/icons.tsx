import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Camera,
  Car,
  CarFront,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GitCompareArrows,
  HelpCircle,
  IdCard,
  Image,
  ImageUp,
  KeyRound,
  Languages,
  LifeBuoy,
  LogOut,
  LucideIcon,
  Map,
  MapPin,
  Palette,
  Phone,
  Pin,
  Power,
  Search,
  Settings,
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
  MapPin,
  Pin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bell,
  Search,
  Camera,
  IdCard,
  Languages,
  GitCompareArrows,
  Palette,
  HelpCircle,
  LogOut,
  Phone,
  LifeBuoy,
  CheckCircle,
  Image,
  ImageUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Power,
  KeyRound,
  Car,
  CarFront,
}

Object.values(icons).forEach(interopIcon)

export {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Camera,
  Car,
  CarFront,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GitCompareArrows,
  HelpCircle,
  IdCard,
  Image,
  ImageUp,
  KeyRound,
  Languages,
  LifeBuoy,
  LogOut,
  Map,
  MapPin,
  Palette,
  Phone,
  Pin,
  Power,
  Search,
  Settings,
}
