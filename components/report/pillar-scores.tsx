'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { PillarScore } from '@/lib/types'
import {
  Shield,
  TrendingUp,
  Zap,
  Lock,
  DollarSign,
  Settings,
} from 'lucide-react'

interface PillarScoresProps {
  scores: PillarScore[]
}

const pillarIcons: Record<string, React.ReactNode> = {
  'Reliability': <Shield className="w-5 h-5" />,
  'Scalability': <TrendingUp className="w-5 h-5" />,
  'Performance Efficiency': <Zap className="w-5 h-5" />,
  'Security': <Lock className="w-5 h-5" />,
  'Cost Optimization': <DollarSign className="w-5 h-5" />,
  'Operational Excellence': <Settings className="w-5 h-5" />,
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-[oklch(0.65_0.18_145)]'
  if (score >= 60) return 'bg-[oklch(0.75_0.18_75)]'
  if (score >= 40) return 'bg-[oklch(0.6_0.2_45)]'
  return 'bg-destructive'
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return 'text-[oklch(0.65_0.18_145)]'
  if (score >= 60) return 'text-[oklch(0.75_0.18_75)]'
  if (score >= 40) return 'text-[oklch(0.6_0.2_45)]'
  return 'text-destructive'
}

export function PillarScores({ scores }: PillarScoresProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          Well-Architected Framework
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scores.map((pillar) => (
            <div
              key={pillar.name}
              className="relative p-4 rounded-xl bg-muted/50 border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-background">
                    {pillarIcons[pillar.name]}
                  </div>
                  <span className="font-medium text-sm">{pillar.name}</span>
                </div>
                <span className={cn('text-2xl font-bold', getScoreTextColor(pillar.score))}>
                  {pillar.score}
                </span>
              </div>

              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', getScoreColor(pillar.score))}
                  style={{ width: `${pillar.score}%` }}
                />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
