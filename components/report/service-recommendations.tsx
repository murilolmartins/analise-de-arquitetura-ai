'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ServiceRecommendation } from '@/lib/types'
import { ArrowRight, Lightbulb, Zap } from 'lucide-react'

interface ServiceRecommendationsProps {
  recommendations: ServiceRecommendation[]
}

const effortColors = {
  low: 'bg-[oklch(0.65_0.18_145)] text-white',
  medium: 'bg-[oklch(0.75_0.18_75)] text-[oklch(0.2_0.02_75)]',
  high: 'bg-[oklch(0.6_0.2_45)] text-white',
}

const effortLabels = {
  low: 'Baixo Esforço',
  medium: 'Médio Esforço',
  high: 'Alto Esforço',
}

export function ServiceRecommendations({ recommendations }: ServiceRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[oklch(0.65_0.18_165)]/10">
            <Lightbulb className="w-5 h-5 text-accent" />
          </div>
          Recomendações de Serviços
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-muted/50 border hover:bg-muted/80 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-muted">
                    <span className="text-sm font-mono text-muted-foreground">
                      {rec.currentComponent.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-foreground truncate">
                    {rec.currentComponent}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block flex-shrink-0" />

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-medium text-primary block truncate">
                      {rec.suggestedService}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {rec.provider}
                    </span>
                  </div>
                </div>

                <Badge className={cn('flex-shrink-0', effortColors[rec.effort])}>
                  {effortLabels[rec.effort]}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mt-3 pl-11">
                {rec.benefit}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
