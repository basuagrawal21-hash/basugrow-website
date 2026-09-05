import {
  Target,
  Megaphone,
  MessageCircle,
  Palette,
  LayoutTemplate,
  LineChart,
  Dumbbell,
  Stethoscope,
  Building2,
  Scissors,
  GraduationCap,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/content/types';

/** Maps the icon names used in content/ to components, so content stays plain data. */
const icons: Record<IconName, LucideIcon> = {
  target: Target,
  megaphone: Megaphone,
  'message-circle': MessageCircle,
  palette: Palette,
  'layout-template': LayoutTemplate,
  'line-chart': LineChart,
  dumbbell: Dumbbell,
  stethoscope: Stethoscope,
  'building-2': Building2,
  scissors: Scissors,
  'graduation-cap': GraduationCap,
  utensils: Utensils,
};

export function Icon({
  name,
  size = 22,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Component = icons[name];
  return <Component size={size} className={className} strokeWidth={1.75} aria-hidden />;
}
