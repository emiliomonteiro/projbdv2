import React from 'react';
import { 
  DollarSign, 
  Film, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'dollar':
        return <DollarSign className={`w-5 h-5 text-${color}-500`} />;
      case 'film':
        return <Film className={`w-5 h-5 text-${color}-500`} />;
      case 'users':
        return <Users className={`w-5 h-5 text-${color}-500`} />;
      case 'clock':
        return <Clock className={`w-5 h-5 text-${color}-500`} />;
      default:
        return <DollarSign className={`w-5 h-5 text-${color}-500`} />;
    }
  };

  const getColorClass = () => {
    return {
      background: `bg-${color}-50`,
      text: `text-${color}-500`,
      border: `border-${color}-100`
    };
  };

  const colorClass = getColorClass();

  return (
    <div className={`bg-white rounded-lg shadow-card p-6 border-l-4 ${colorClass.border} animate-slide-up`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClass.background}`}>
          {getIcon()}
        </div>
        <div className="flex items-center">
          {change > 0 ? (
            <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-error-500 mr-1" />
          )}
          <span className={change > 0 ? 'text-success-500' : 'text-error-500'}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium truncate">{title}</h3>
      <div className="mt-1">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default KPICard;