/* eslint-disable @typescript-eslint/no-explicit-any */
import * as icons from '../../icons';
import React, { type MouseEventHandler, type SVGProps } from 'react';
import './Icon.css';

export type IconName = keyof (typeof icons);
export type IconDirection = 'top' | 'right' | 'bottom' | 'left';
export type IconProps = {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
  className?: string,
  direction?: IconDirection,
  'data-testid'?: string,
  tooltip?: string
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: 'reset' | 'button' | 'submit',
}

/*
 * HOW TO ADD ICONS:
 * - ENSURE THAT THERE IS NO SUCH ICON TO AVOID DUPLICATES
 * - Obtain SVG file
 * - scale it to size 16x16
 * - scale it's content, to have larger dimension 16 and fit into viewbox
 * - ensure that width, height and viewbox match 16x16 size
 * - ensure that fill does not contain hardcoded colors (replace them with currentColor)
 * - cleanup unnecessary attributes and tags
 * - add svg into assets/icons with correct name (letters, digits, underscore are allowed)
 * - reexport this svg via assets/icons/index.ts
 * - ???
 * - PROFIT!
 */

export function Icon(
  {
    size = 'md',
    direction = 'top',
    name,
    'data-testid': testid,
    onClick,
    className = '',
    tooltip,
    type,
  }: IconProps,
) {
  const SVG = icons[name] as unknown as React.FC<SVGProps<SVGSVGElement>>;
  
  const sizeClass = `icon--${size}`;
  const directionClass = direction !== 'top' ? `icon--direction-${direction}` : '';
  const fullClassName = `icon ${sizeClass} ${directionClass} ${className}`.trim();
  
  const content = (
    <SVG
      aria-hidden="true"
      focusable="false"
      role="presentation"
    />
  );

  if (onClick) {
    return (
      <button
        className={fullClassName}
        data-testid={testid}
        type={type}
        onClick={onClick}
        title={tooltip}
      >
        {content}
      </button>
    );
  }

  return (
    <i
      className={fullClassName}
      data-testid={testid}
      title={tooltip}
    >
      {content}
    </i>
  );
}

Icon.asComponent = (props: IconProps) => (
  function CurriedIcon(newProps: Partial<IconProps>) {
    return <Icon {...{ ...props, ...newProps }} />;
  }
);