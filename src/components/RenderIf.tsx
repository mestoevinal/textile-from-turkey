import React from 'react';

type RenderIfProps = {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const RenderIf: React.FC<RenderIfProps> = ({ when, children, fallback = null }) => {
  if (when) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
