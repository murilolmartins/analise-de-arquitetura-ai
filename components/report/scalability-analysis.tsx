'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ArchitectureAnalysis } from '@/lib/types'
import { TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

interface ScalabilityAnalysisProps {
  analysis: ArchitectureAnalysis['scalabilityAnalysis']
}

export function ScalabilityAnalysis({ analysis }: ScalabilityAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          Análise de Escalabilidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-xl bg-muted/50 border">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Capacidade Atual
          </h4>
          <p className="text-foreground">{analysis.currentCapacity}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 rounded-xl bg-[oklch(0.6_0.2_45)]/5 border border-[oklch(0.6_0.2_45)]/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[oklch(0.6_0.2_45)]" />
              <h4 className="font-semibold text-foreground">Gargalos</h4>
            </div>
            <ul className="space-y-2">
              {analysis.bottlenecks.map((bottleneck, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.6_0.2_45)] mt-2 flex-shrink-0" />
                  {bottleneck}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[oklch(0.65_0.18_145)]/5 border border-[oklch(0.65_0.18_145)]/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[oklch(0.65_0.18_145)]" />
              <h4 className="font-semibold text-foreground">Recomendações</h4>
            </div>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_145)] mt-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
