import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const HanAuthLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', gap: 'gap-2' },
    md: { icon: 'w-8 h-8', text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', gap: 'gap-3' },
    xl: { icon: 'w-12 h-12', text: 'text-3xl', gap: 'gap-3.5' },
  };

  const { icon, text, gap } = sizeMap[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <div className={`relative ${icon} flex items-center justify-center`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 rounded-xl blur-md opacity-70 animate-pulse" />
        
        {/* Main Icon container */}
        <div className="relative w-full h-full bg-slate-950 border border-blue-500/40 rounded-xl p-1.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-blue-400"
          >
            <path 
              d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z" 
              fill="url(#hanAuthGrad)" 
              fillOpacity="0.25"
              stroke="url(#hanAuthGrad)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 11V15M10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 11.75 13.5858 12.4037 12.9752 12.75C12.3646 13.0963 12 13.75 12 14.5" 
              stroke="#60A5FA" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <circle cx="12" cy="15.5" r="1" fill="#93C5FD" />
            <defs>
              <linearGradient id="hanAuthGrad" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <span className={`font-bold tracking-tight text-white ${text} font-sans flex items-center`}>
          han<span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-extrabold">Auth</span>
        </span>
      )}
    </div>
  );
};
