import React from 'react';
import * as LucideIcons from 'lucide-react';

export const Icon = ({ name, ...props }: { name: keyof typeof LucideIcons } & React.ComponentProps<'svg'>) => {
  const LucideIcon = LucideIcons[name];
  return <LucideIcon {...props} />;
};