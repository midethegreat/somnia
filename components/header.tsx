'use client';

import React from 'react';
import { HistoryIcon } from 'lucide-react';

interface HeaderProps {
  onHistoryClick?: () => void;
}

export default function Header({ onHistoryClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold neon-glow">Somniai</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Prediction Markets • Real-Time Data</p>
        </div>
        {onHistoryClick && (
          <button
            onClick={onHistoryClick}
            className="p-2 sm:p-3 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
            title="View bet history"
            aria-label="View bet history"
          >
            <HistoryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </header>
  );
}
