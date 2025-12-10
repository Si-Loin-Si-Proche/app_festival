// src/constants/icons.ts

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
  Mail,
} from 'lucide-react-native';

export const ICONS = {
  // --- Navigation ---
  back: ChevronLeft,
  next: ChevronRight,
  menu: Menu,
  close: X,
  settings: Settings,

  // --- Actions ---
  search: Search,
  share: Share2,
  favorite: Heart,
  filter: Filter,

  // --- Objets Métier ---
  calendar: Calendar,
  clock: Clock,
  location: MapPin,
  ticket: Ticket,
  info: Info,
  user: User,

  // --- Catégories ---
  categoryMusic: Music,
  categoryTheater: Drama,

  // --- Ajouts pour le formulaire ---
  lock: Lock,
  eye: Eye,
  eyeOff: EyeOff,
  mail: Mail,
} as const;

export type IconName = keyof typeof ICONS;
