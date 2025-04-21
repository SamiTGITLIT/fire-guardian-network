
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  status?: 'normal' | 'warning' | 'danger';
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  description,
  icon,
  footer,
  status = 'normal',
  className,
}) => {
  const statusClasses = {
    normal: 'bg-safe-light text-safe-dark border-safe',
    warning: 'bg-alert-light text-alert-dark border-alert',
    danger: 'bg-fire-light text-fire-dark border-fire',
  };

  return (
    <Card className={cn('transition-all duration-300 border-2', statusClasses[status], className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
      {footer && (
        <CardFooter className="pt-0 text-xs text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default StatusCard;
