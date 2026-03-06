'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { FailurePoint } from '@/lib/types'
import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react'

interface FailurePointsProps {
  failurePoints: FailurePoint[]
}

const severityConfig = {
  critical: {
    icon: XCircle,
    color: 'bg-destructive/10 text-destructive border-destructive/30',
    badge: 'bg-destructive text-destructive-foreground',
    label: 'Crítico',
  },
  high: {
    icon: AlertTriangle,
    color: 'bg-[oklch(0.6_0.2_45)]/10 text-[oklch(0.6_0.2_45)] border-[oklch(0.6_0.2_45)]/30',
    badge: 'bg-[oklch(0.6_0.2_45)] text-white',
    label: 'Alto',
  },
  medium: {
    icon: AlertCircle,
    color: 'bg-[oklch(0.75_0.18_75)]/10 text-[oklch(0.75_0.18_75)] border-[oklch(0.75_0.18_75)]/30',
    badge: 'bg-[oklch(0.75_0.18_75)] text-[oklch(0.2_0.02_75)]',
    label: 'Médio',
  },
  low: {
    icon: Info,
    color: 'bg-[oklch(0.55_0.22_255)]/10 text-[oklch(0.55_0.22_255)] border-[oklch(0.55_0.22_255)]/30',
    badge: 'bg-[oklch(0.55_0.22_255)] text-white',
    label: 'Baixo',
  },
}

export function FailurePoints({ failurePoints }: FailurePointsProps) {
  // Sort by severity
  const sortedPoints = [...failurePoints].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 }
    return order[a.severity] - order[b.severity]
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          Pontos de Falha Potenciais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPoints.map((point, index) => {
            const config = severityConfig[point.severity]
            const Icon = config.icon

            return (
              <div
                key={index}
                className={cn(
                  'p-4 rounded-xl border-l-4 bg-card',
                  config.color
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">{point.component}</h4>
                  </div>
                  <Badge className={config.badge}>{config.label}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {point.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Impacto Real
                    </p>
                    <p className="text-sm text-foreground">{point.impact}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[oklch(0.65_0.18_145)]/5 border border-[oklch(0.65_0.18_145)]/20">
                    <p className="text-xs font-medium text-[oklch(0.65_0.18_145)] mb-1">
                      Mitigação
                    </p>
                    <p className="text-sm text-foreground">{point.mitigation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
