'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HistoryItem {
  id: string;
  title: string;
  betType: 'UP' | 'DOWN';
  amount: number;
  odds: number;
  result: 'WIN' | 'LOSS' | 'PENDING';
  payout: number;
  timestamp: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    title: 'BTC/USD Price Up in 30s',
    betType: 'UP',
    amount: 100,
    odds: 1.95,
    result: 'WIN',
    payout: 195,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'ETH Crosses $3,500',
    betType: 'DOWN',
    amount: 50,
    odds: 1.9,
    result: 'LOSS',
    payout: 0,
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    title: 'SOL Volatility Spike',
    betType: 'UP',
    amount: 75,
    odds: 1.85,
    result: 'WIN',
    payout: 138.75,
    timestamp: '6 hours ago',
  },
  {
    id: '4',
    title: 'Market Cap Growth',
    betType: 'UP',
    amount: 200,
    odds: 2.0,
    result: 'PENDING',
    payout: 0,
    timestamp: '1 day ago',
  },
];

interface BetHistoryModalProps {
  onClose: () => void;
}

export default function BetHistoryModal({ onClose }: BetHistoryModalProps) {
  const [filter, setFilter] = useState<'all' | 'WIN' | 'LOSS' | 'PENDING'>('all');

  const filtered = filter === 'all' ? mockHistory : mockHistory.filter(h => h.result === filter);

  const stats = {
    totalBets: mockHistory.length,
    wins: mockHistory.filter(h => h.result === 'WIN').length,
    losses: mockHistory.filter(h => h.result === 'LOSS').length,
    totalStaked: mockHistory.reduce((sum, h) => sum + h.amount, 0),
    totalPayout: mockHistory.reduce((sum, h) => sum + h.payout, 0),
    winRate: ((mockHistory.filter(h => h.result === 'WIN').length / mockHistory.filter(h => h.result !== 'PENDING').length) * 100).toFixed(1),
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <Card className="w-full max-w-2xl border-primary/20 pointer-events-auto max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 border-b border-primary/15 pb-4 sticky top-0 bg-white/80 backdrop-blur z-10">
            <div className="flex-1">
              <CardTitle className="text-2xl neon-glow">Betting History</CardTitle>
              <CardDescription className="text-muted-foreground mt-1 text-xs sm:text-sm">View your bets and performance</CardDescription>
            </div>
            <Button
              onClick={onClose}
              className="border border-primary/20 text-primary hover:bg-primary/5 p-2 sm:p-3 w-auto"
              variant="outline"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="pt-4 sm:pt-6 space-y-6">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              <div className="border border-primary/15 bg-primary/5 rounded-lg p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                <p className="text-2xl font-bold neon-glow">{stats.winRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.wins}W / {stats.losses}L</p>
              </div>
              <div className="border border-primary/15 bg-primary/5 rounded-lg p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Staked</p>
                <p className="text-2xl font-bold text-foreground">${stats.totalStaked}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.totalBets} bets</p>
              </div>
              <div className="border border-primary/15 bg-primary/5 rounded-lg p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Payout</p>
                <p className={`text-2xl font-bold ${stats.totalPayout > stats.totalStaked ? 'neon-glow' : 'text-destructive'}`}>
                  ${stats.totalPayout.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${stats.totalPayout > stats.totalStaked ? 'text-primary' : 'text-destructive'}`}>
                  {stats.totalPayout > stats.totalStaked ? '+' : ''}{(stats.totalPayout - stats.totalStaked).toFixed(2)} net
                </p>
              </div>
            </div>

            <div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 border border-primary/15 bg-primary/5">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                  <TabsTrigger value="WIN" className="text-xs sm:text-sm">Wins</TabsTrigger>
                  <TabsTrigger value="LOSS" className="text-xs sm:text-sm">Losses</TabsTrigger>
                  <TabsTrigger value="PENDING" className="text-xs sm:text-sm">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-2 mt-4">
                  {filtered.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4 text-sm">No bets found</p>
                  ) : (
                    filtered.map(bet => <HistoryRow key={bet.id} bet={bet} />)
                  )}
                </TabsContent>
                <TabsContent value="WIN" className="space-y-2 mt-4">
                  {mockHistory.filter(b => b.result === 'WIN').map(bet => (
                    <HistoryRow key={bet.id} bet={bet} />
                  ))}
                </TabsContent>
                <TabsContent value="LOSS" className="space-y-2 mt-4">
                  {mockHistory.filter(b => b.result === 'LOSS').map(bet => (
                    <HistoryRow key={bet.id} bet={bet} />
                  ))}
                </TabsContent>
                <TabsContent value="PENDING" className="space-y-2 mt-4">
                  {mockHistory.filter(b => b.result === 'PENDING').map(bet => (
                    <HistoryRow key={bet.id} bet={bet} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function HistoryRow({ bet }: { bet: HistoryItem }) {
  const badgeColor =
    bet.result === 'WIN'
      ? 'bg-primary/10 text-primary border border-primary/30'
      : bet.result === 'LOSS'
        ? 'bg-destructive/10 text-destructive border border-destructive/30'
        : 'bg-warning/10 text-warning border border-warning/30';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-primary/15 p-3 sm:p-4 hover:border-primary/30 transition-all gap-3 sm:gap-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <div className="shrink-0">
          {bet.betType === 'UP' ? (
            <TrendingUp className="w-5 h-5 text-primary" />
          ) : (
            <TrendingDown className="w-5 h-5 text-destructive" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm truncate">{bet.title}</p>
          <p className="text-xs text-muted-foreground">{bet.timestamp}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
        <div className="text-right">
          <p className="text-xs sm:text-sm font-semibold text-foreground">${bet.amount}</p>
          <p className="text-xs text-muted-foreground">{bet.odds}x</p>
        </div>
        {bet.payout > 0 && <p className="text-xs sm:text-sm font-bold neon-glow whitespace-nowrap">${bet.payout.toFixed(2)}</p>}
        <Badge className={`${badgeColor} text-xs`}>{bet.result}</Badge>
      </div>
    </div>
  );
}
