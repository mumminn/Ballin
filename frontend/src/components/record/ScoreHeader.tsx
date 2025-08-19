// components/record/ScoreHeader.tsx
import React from 'react';

type Team = {
  name: string;
  logo?: string;
  logoAlt?: string;
};

type ScoreHeaderProps = {
  myTeam: Team;
  opponentTeam: Team;
  myScore: number | string;
  opponentScore: number | string;
  stadium?: string;
  className?: string;
  logoSize?: number; 
};

export function ScoreHeader({
  myTeam,
  opponentTeam,
  myScore,
  opponentScore,
  stadium,
  className = '',
  logoSize = 36,
}: ScoreHeaderProps) {
  return (
    <div className={`text-gray-900 ${className}`}>
      <div className="grid grid-cols-[auto_auto_auto] items-center justify-center gap-x-5">
        <TeamCell team={myTeam} logoSize={logoSize} align="left" />

        <div className="flex items-end justify-center gap-3">
          <span className="md:text-3xl font-semibold">{myScore}</span>
          <span className="text-base md:text-lg font-semibold">VS</span>
          <span className="md:text-3xl font-semibold">{opponentScore}</span>
        </div>

        <TeamCell team={opponentTeam} logoSize={logoSize} align="right" />
      </div>

      {stadium && (
        <div className="mt-2 text-center text-sm font-semibold">
          {stadium}
        </div>
      )}
    </div>
  );
}

function TeamCell({
  team,
  logoSize,
  align,
}: {
  team: Team;
  logoSize: number;
  align: 'left' | 'right';
}) {
  const self = align === 'left' ? 'justify-self-start' : 'justify-self-end';
  return (
    <div className={`text-center ${self}`}>
      {team.logo ? (
        <img
          src={team.logo}
          alt={team.logoAlt || team.name}
          style={{ height: logoSize }}
          className="mx-auto w-auto"
        />
      ) : (
        <div style={{ height: logoSize }} />
      )}
      <div className="mt-1 text-xs md:text-sm font-semibold">{team.name}</div>
    </div>
  );
}