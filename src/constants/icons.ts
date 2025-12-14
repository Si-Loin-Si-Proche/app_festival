import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Search,
  Menu,
  X,
  Heart,
  Share2,
  Info,
  Ticket,
  Music,
  Drama,
  Filter,
  Settings,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  House,
  Instagram,
  Facebook,
  Landmark,
  Image as ImageIcon,
  Toilet,
  Utensils,
} from 'lucide-react-native';

export const ICONS = {
  // --- Navigation ---
  back: ChevronLeft,
  next: ChevronRight,
  menu: Menu,
  close: X,
  settings: Settings,
  arrowRight: ArrowRight,

  // --- Actions ---
  search: Search,
  share: Share2,
  favorite: Heart,
  filter: Filter,
  image: ImageIcon,

  // --- Objets Métier ---
  calendar: Calendar,
  clock: Clock,
  location: MapPin,
  ticket: Ticket,
  info: Info,
  house: House,
  user: User,

  // --- Catégories ---
  categoryMusic: Music,
  categoryTheater: Drama,

  // --- Ajouts pour le formulaire ---
  lock: Lock,
  eye: Eye,
  eyeOff: EyeOff,
  mail: Mail,

  // --- Réseaux Sociaux ---
  instagram: Instagram,
  facebook: Facebook,

  // --- Icons pour la map
  wc: Toilet,
  food: Utensils,
  scene: Landmark,
} as const;

export type IconName = keyof typeof ICONS;
