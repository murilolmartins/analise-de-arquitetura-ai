'use client'

import { cn } from '@/lib/utils'
import type { ArchitectureAnalysis } from '@/lib/types'

interface ScoreHeroProps {
  analysis: ArchitectureAnalysis
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-[oklch(0.65_0.18_145)]'
  if (score >= 60) return 'text-[oklch(0.75_0.18_75)]'
  if (score >= 40) return 'text-[oklch(0.6_0.2_45)]'
  return 'text-destructive'
}

function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-[oklch(0.65_0.18_145)] to-[oklch(0.55_0.15_165)]'
  if (score >= 60) return 'from-[oklch(0.75_0.18_75)] to-[oklch(0.65_0.15_60)]'
  if (score >= 40) return 'from-[oklch(0.6_0.2_45)] to-[oklch(0.5_0.18_35)]'
  return 'from-destructive to-[oklch(0.45_0.2_25)]'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excelente'
  if (score >= 60) return 'Bom'
  if (score >= 40) return 'Regular'
  return 'Necessita Atenção'
}

export function ScoreHero({ analysis }: ScoreHeroProps) {
  const score = analysis.overallArchitectureScore
  const scoreColor = getScoreColor(score)
  const scoreGradient = getScoreGradient(score)
  const scoreLabel = getScoreLabel(score)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-muted/50 border shadow-lg">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          'absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-10 blur-3xl bg-gradient-to-br',
          scoreGradient
        )} />
      </div>

      <div className="relative p-8 md:p-12">
        <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
          {/* Score Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <svg className="w-36 h-36" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className={cn('stroke-current transition-all duration-1000', scoreColor)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${(score / 100) * 264} 264`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn('text-4xl font-bold', scoreColor)}>{score}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Score de Arquitetura
              </h2>
              <p className={cn('text-lg font-semibold mb-3', scoreColor)}>
                {scoreLabel}
              </p>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                {analysis.architectureSummary}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-3">
            {/* Provider Badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 border">
              <ProviderIcon provider={analysis.detectedProvider.provider} />
              <div>
                <p className="text-xs text-muted-foreground">Provider</p>
                <p className="font-semibold text-foreground">
                  {analysis.detectedProvider.provider}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(analysis.detectedProvider.confidence * 100)}% confiança
                </p>
              </div>
            </div>

            {/* Maturity Badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80 border">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg',
                analysis.maturityLevel.level >= 4 ? 'bg-[oklch(0.65_0.18_145)]/20 text-[oklch(0.65_0.18_145)]' :
                analysis.maturityLevel.level >= 3 ? 'bg-[oklch(0.75_0.18_75)]/20 text-[oklch(0.75_0.18_75)]' :
                'bg-muted text-muted-foreground'
              )}>
                L{analysis.maturityLevel.level}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Maturidade</p>
                <p className="font-semibold text-foreground">
                  {analysis.maturityLevel.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProviderIcon({ provider }: { provider: string }) {
  const colors: Record<string, string> = {
    'AWS': 'bg-[oklch(0.6_0.2_45)]/20 text-[oklch(0.6_0.2_45)]',
    'Google Cloud': 'bg-[oklch(0.55_0.22_255)]/20 text-[oklch(0.55_0.22_255)]',
    'Microsoft Azure': 'bg-[oklch(0.55_0.2_240)]/20 text-[oklch(0.55_0.2_240)]',
    'Hybrid': 'bg-[oklch(0.5_0.15_290)]/20 text-[oklch(0.5_0.15_290)]',
    'On-premise': 'bg-muted text-muted-foreground',
    'Cloud-agnostic': 'bg-[oklch(0.65_0.18_165)]/20 text-[oklch(0.65_0.18_165)]',
    'Unknown': 'bg-muted text-muted-foreground',
  }

  return (
    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm', colors[provider] || colors['Unknown'])}>
      {provider.slice(0, 2).toUpperCase()}
    </div>
  )
}
