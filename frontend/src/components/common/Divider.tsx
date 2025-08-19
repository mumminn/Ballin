import React from 'react';

type Props = {
    inset?: number;
    thickness?: number;
    className?: string;    
}

export function Divider({ inset = 16, thickness = 2, className = '' }: Props) {
    return (
      <div
        aria-hidden
        className={`border-t border-black ${className}`}
        style={{ borderTopWidth: thickness, marginLeft: -inset, marginRight: -inset }}
      />
    );
  }