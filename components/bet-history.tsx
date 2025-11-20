'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

export default function BetHistory() {
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Win Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.winRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.wins} wins out of {stats.wins + stats.losses} resolved</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Staked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${stats.totalStaked}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.totalBets} bets placed</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Payout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">${stats.totalPayout.toFixed(2)}</div>
            <p className={`text-xs mt-1 ${stats.totalPayout > stats.totalStaked ? 'text-green-600' : 'text-destructive'}`}>
              {stats.totalPayout > stats.totalStaked ? '+' : ''}{(stats.totalPayout - stats.totalStaked).toFixed(2)} net
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="WIN">Wins</TabsTrigger>
              <TabsTrigger value="LOSS">Losses</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {filtered.map(bet => (
                <HistoryRow key={bet.id} bet={bet} />
              ))}
            </TabsContent>
            <TabsContent value="WIN" className="space-y-3 mt-4">
              {mockHistory.filter(b => b.result === 'WIN').map(bet => (
                <HistoryRow key={bet.id} bet={bet} />
              ))}
            </TabsContent>
            <TabsContent value="LOSS" className="space-y-3 mt-4">
              {mockHistory.filter(b => b.result === 'LOSS').map(bet => (
                <HistoryRow key={bet.id} bet={bet} />
              ))}
            </TabsContent>
            <TabsContent value="PENDING" className="space-y-3 mt-4">
              {mockHistory.filter(b => b.result === 'PENDING').map(bet => (
                <HistoryRow key={bet.id} bet={bet} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function HistoryRow({ bet }: { bet: HistoryItem }) {
  const badgeColor = bet.result === 'WIN' ? 'bg-success text-success-foreground' : bet.result === 'LOSS' ? 'bg-destructive text-destructive-foreground' : 'bg-warning text-warning-foreground';

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted transition-colors">
      <div className="flex-1">
        <p className="font-medium text-foreground">{bet.title}</p>
        <p className="text-sm text-muted-foreground">{bet.timestamp}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <Badge className={`mb-1 ${bet.betType === 'UP' ? 'bg-primary' : 'bg-muted'}`}>
            {bet.betType}
          </Badge>
          <p className="text-sm font-semibold text-foreground">${bet.amount}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{bet.odds}x odds</p>
          {bet.payout > 0 && <p className="text-sm font-bold text-primary">${bet.payout}</p>}
        </div>
        <Badge className={badgeColor}>{bet.result}</Badge>
      </div>
    </div>
  );
}
