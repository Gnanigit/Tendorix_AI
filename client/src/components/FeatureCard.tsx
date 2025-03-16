
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon, onClick }) => {
  return (
    <div 
      className="p-6 bg-brand-purple text-white rounded-xl flex flex-col items-start justify-between card-hover cursor-pointer"
      onClick={onClick}
    >
      <Icon className="h-8 w-8 mb-4" />
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ArrowRight className="h-5 w-5" />
      </div>
    </div>
  );
};

export default FeatureCard;
