import React, { type JSX } from 'react';

type RenderSwitchProps = {
  condition: boolean;
  whenTrue: JSX.Element;
  whenFalse: JSX.Element | null;
};

export const RenderSwitch: React.FC<RenderSwitchProps> = ({ condition, whenTrue, whenFalse }) => {
  return condition ? whenTrue : whenFalse;
};
