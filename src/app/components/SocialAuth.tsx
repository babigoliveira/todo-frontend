import React from "react";

export type SocialProvider = {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

type SocialAuthProps = {
  providers: SocialProvider[];
  title?: string;
};

export function SocialAuth({ providers, title }: SocialAuthProps) {
  return (
    <div className="mt-12">
      <p className="text-medium text-center text-gray-400 mt-2 mb-4">{title}</p>
      <div className="flex items-center justify-center space-x-12 mb-8">
        {providers.map(provider => (
          <button key={provider.name} onClick={provider.onClick} className="flex items-center justify-center">
            {provider.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
