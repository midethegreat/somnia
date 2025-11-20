'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface BettingInterfaceProps {
  selectedBet?: any;
}

export default function BettingInterface({ selectedBet }: BettingInterfaceProps) {
  const [betType, setBetType] = useState<'UP' | 'DOWN'>('UP');
  const [amount, setAmount] = useState('100');
  const [isPlacing, setIsPlacing] = useState(false);

  const mockBet = selectedBet || {
    title: 'BTC/USD Price Up in 30s',
    description: 'Bitcoin will trade above $93,500 in the next 30 seconds',
    odds: { up: 1.95, down: 2.05 },
    currentPrice: 93250,
  };

  const currentOdds = betType === 'UP' ? mockBet.odds.up : mockBet.odds.down;
  const potentialPayout = (parseFloat(amount) || 0) * currentOdds;
  const profit = potentialPayout - (parseFloat(amount) || 0);

  const handlePlaceBet = async () => {
    setIsPlacing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsPlacing(false);
    setAmount('100');
    alert(`✅ Bet placed! ${betType} for $${amount} at ${currentOdds}x odds`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-0">
      <Card className="border-primary/20 overflow-hidden">
        <CardHeader className="border-b border-primary/15 pb-4">
          <CardTitle className="text-xl sm:text-2xl neon-glow">{mockBet.title}</CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-sm sm:text-base">{mockBet.description}</CardDescription>
          {mockBet.currentPrice && (
            <div className="mt-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Current: </span>
              <span className="neon-glow font-bold">${mockBet.currentPrice.toLocaleString()}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button
              onClick={() => setBetType('UP')}
              className={`h-20 sm:h-24 text-sm sm:text-lg font-bold transition-all duration-300 border-2 ${
                betType === 'UP'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-primary/20 text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
              variant="outline"
            >
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="text-xs sm:text-base">BUY (UP)</div>
                <div className="text-xs opacity-75">{mockBet.odds.up}x</div>
              </div>
            </Button>

            <Button
              onClick={() => setBetType('DOWN')}
              className={`h-20 sm:h-24 text-sm sm:text-lg font-bold transition-all duration-300 border-2 ${
                betType === 'DOWN'
                  ? 'border-destructive bg-destructive/10 text-destructive'
                  : 'border-primary/20 text-muted-foreground hover:border-destructive/50 hover:text-destructive'
              }`}
              variant="outline"
            >
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="text-xs sm:text-base">SELL (DOWN)</div>
                <div className="text-xs opacity-75">{mockBet.odds.down}x</div>
              </div>
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bet-amount" className="text-foreground font-semibold text-sm sm:text-base">
              Bet Amount (USD)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="bet-amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="100"
                className="flex-1 border-primary/20 text-foreground bg-input focus:border-primary transition-colors text-sm sm:text-base"
              />
              <span className="text-xs sm:text-sm font-semibold text-muted-foreground px-3">USD</span>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-primary/15 bg-primary/5 p-3 sm:p-4">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Bet Amount:</span>
              <span className="font-semibold text-foreground">${(parseFloat(amount) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Multiplier:</span>
              <span className={`font-semibold ${betType === 'UP' ? 'neon-glow' : 'text-destructive'}`}>
                {currentOdds}x
              </span>
            </div>
            <div className="border-t border-primary/15 pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground text-xs sm:text-sm">Potential Payout:</span>
                <span className={`text-lg sm:text-2xl font-bold ${betType === 'UP' ? 'neon-glow' : 'text-destructive'}`}>
                  ${potentialPayout.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-muted-foreground">Profit if Win:</span>
                <span className={`font-semibold ${profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  +${profit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePlaceBet}
            disabled={!amount || isPlacing || parseFloat(amount) <= 0}
            className="w-full h-12 sm:h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            {isPlacing ? 'Placing Bet...' : `Place ${betType} Bet`}
          </Button>

          <div className="pt-4 border-t border-primary/15 text-center">
            <p className="text-xs text-muted-foreground">
              ⚡ Bets settle automatically when market conditions are met
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
