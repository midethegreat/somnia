"use client"

import { useState } from "react"
import { Menu, X, LogOut, History } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  walletAddress?: string
  onHistoryClick: () => void
  onDisconnect: () => void
  onNavigate?: (page: string) => void
  currentPage?: string
}

export default function Navbar({ walletAddress, onHistoryClick, onDisconnect, onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (page: string) => {
    onNavigate?.(page)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Somnia</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("markets")}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "markets" ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              Markets
            </button>
            <button
              onClick={() => handleNavigation("leaderboard")}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "leaderboard" ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavigation("stats")}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "stats" ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              Stats
            </button>
            <a
              href="https://docs.somnia.network/somnia-data-streams?_gl=1*14hui2e*_ga*NTk2ODM4MTA5LjE3NjM1NTc2MjU.*_ga_VRC3ZXBRT1*czE3NjM2Nzk4ODAkbzMkZzAkdDE3NjM2Nzk4ODAkajYwJGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Docs
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {walletAddress && (
              <>
                <Button
                  onClick={onHistoryClick}
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button
                  onClick={onDisconnect}
                  variant="outline"
                  size="sm"
                  className="border-destructive/20 text-destructive hover:bg-destructive/5 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-primary/20 text-primary hover:bg-primary/5"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-primary/10 pt-4">
            <button
              onClick={() => handleNavigation("markets")}
              className="block text-sm font-medium text-foreground hover:text-primary cursor-pointer"
            >
              Markets
            </button>
            <button
              onClick={() => handleNavigation("leaderboard")}
              className="block text-sm font-medium text-foreground hover:text-primary cursor-pointer"
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavigation("stats")}
              className="block text-sm font-medium text-foreground hover:text-primary cursor-pointer"
            >
              Stats
            </button>
            <a
              href="https://docs.somnia.network/somnia-data-streams?_gl=1*14hui2e*_ga*NTk2ODM4MTA5LjE3NjM1NTc2MjU.*_ga_VRC3ZXBRT1*czE3NjM2Nzk4ODAkbzMkZzAkdDE3NjM2Nzk4ODAkajYwJGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-foreground hover:text-primary"
            >
              Docs
            </a>
            {walletAddress && (
              <>
                <Button
                  onClick={onHistoryClick}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button
                  onClick={onDisconnect}
                  variant="outline"
                  size="sm"
                  className="w-full border-destructive/20 text-destructive hover:bg-destructive/5 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
