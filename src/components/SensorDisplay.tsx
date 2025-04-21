
import React from 'react';
import { Sensor } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SensorDisplayProps {
  sensor: Sensor;
  compact?: boolean;
}

const SensorDisplay: React.FC<SensorDisplayProps> = ({ sensor, compact = false }) => {
  const getStatusColor = (status: Sensor['status']) => {
    switch (status) {
      case 'danger':
        return 'bg-fire text-white';
      case 'warning':
        return 'bg-alert text-white';
      case 'normal':
      default:
        return 'bg-safe text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (compact) {
    return (
      <Card className={cn('overflow-hidden border-l-4', {
        'border-l-fire': sensor.status === 'danger',
        'border-l-alert': sensor.status === 'warning',
        'border-l-safe': sensor.status === 'normal',
      })}>
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium flex justify-between">
            <span>{sensor.location}</span>
            <span className={cn('px-2 py-0.5 rounded-full text-xs', {
              'bg-fire/20 text-fire': sensor.status === 'danger',
              'bg-alert/20 text-alert': sensor.status === 'warning',
              'bg-safe/20 text-safe': sensor.status === 'normal',
            })}>
              {sensor.status.toUpperCase()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>Temp: {sensor.temperature.toFixed(1)}°C</div>
            <div>Smoke: {sensor.smokeLevel.toFixed(1)}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className={cn('py-2 px-4', getStatusColor(sensor.status))}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{sensor.location}</h3>
          <span className="text-xs uppercase font-bold">
            {sensor.status}
          </span>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Temperature</span>
              <span>{sensor.temperature.toFixed(1)}°C</span>
            </div>
            <Progress 
              value={((sensor.temperature - 20) / 15) * 100} 
              className={cn({
                'bg-muted': true,
                'text-fire': sensor.temperature > 28,
                'text-alert': sensor.temperature > 26 && sensor.temperature <= 28,
                'text-safe': sensor.temperature <= 26,
              })}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Smoke Level</span>
              <span>{sensor.smokeLevel.toFixed(1)}/10</span>
            </div>
            <Progress 
              value={(sensor.smokeLevel / 10) * 100} 
              className={cn({
                'bg-muted': true,
                'text-fire': sensor.smokeLevel > 7,
                'text-alert': sensor.smokeLevel > 4 && sensor.smokeLevel <= 7,
                'text-safe': sensor.smokeLevel <= 4,
              })}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Battery</span>
              <span>{sensor.batteryLevel}%</span>
            </div>
            <Progress 
              value={sensor.batteryLevel} 
              className={cn({
                'bg-muted': true,
                'text-fire': sensor.batteryLevel < 30,
                'text-alert': sensor.batteryLevel >= 30 && sensor.batteryLevel < 60,
                'text-safe': sensor.batteryLevel >= 60,
              })}
            />
          </div>
          
          <div className="text-xs text-muted-foreground text-right">
            Updated: {formatDate(sensor.lastUpdated)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDisplay;
