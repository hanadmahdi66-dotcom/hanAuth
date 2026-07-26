import React from 'react';

interface HanOSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'badge';
}

export const HanOSLogo: React.FC<HanOSLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
}) => {
  const sizeClasses = {
    sm: 'h-5 text-xs',
    md: 'h-6 text-sm',
    lg: 'h-8 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <div className={`inline-flex items-center gap-2 ${sizeClasses[size]} ${className}`}>
      {/* Modern H-Node hanOS Logo Icon */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        >
          {/* H Node mark matching hanOS branding */}
          <rect x="5" y="4" width="6" height="24" rx="3" fill="url(#hanOsGrad1)" />
          <rect x="21" y="4" width="6" height="24" rx="3" fill="url(#hanOsGrad1)" />
          <circle cx="16" cy="16" r="4" fill="#38BDF8" />
          <rect x="8" y="14" width="16" height="4" rx="2" fill="url(#hanOsGrad2)" />
          <defs>
            <linearGradient id="hanOsGrad1" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="hanOsGrad2" x1="8" y1="14" x2="24" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant === 'badge' ? (
        <span className="font-semibold tracking-wide text-slate-300">
          han<span className="text-blue-400 font-bold">OS</span>
        </span>
      ) : (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-tight text-white flex items-center gap-0.5">
            han<span className="text-blue-400">OS</span>
          </span>
          <span className="text-[9px] tracking-wider text-slate-400 font-medium uppercase mt-0.5">
            Cloud Platform
          </span>
        </div>
      )}
    </div>
  );
};
