'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ArchitectureAnalysis } from '@/lib/types'
import { Target, CheckCircle2, Clock, Calendar } from 'lucide-react'

interface ImprovementPlanProps {
  plan: ArchitectureAnalysis['improvementPlan']
  targetArchitecture: ArchitectureAnalysis['targetArchitecture']
}

export function ImprovementPlan({ plan, targetArchitecture }: ImprovementPlanProps) {
  const phases = [
    {
      title: 'Curto Prazo',
      subtitle: '0-3 meses',
      icon: Clock,
      items: plan.shortTerm,
      color: 'bg-[oklch(0.65_0.18_145)]',
      bgColor: 'bg-[oklch(0.65_0.18_145)]/10',
    },
    {
      title: 'Médio Prazo',
      subtitle: '3-6 meses',
      icon: Calendar,
      items: plan.mediumTerm,
      color: 'bg-[oklch(0.55_0.22_255)]',
      bgColor: 'bg-[oklch(0.55_0.22_255)]/10',
    },
    {
      title: 'Longo Prazo',
      subtitle: '6-12 meses',
      icon: Target,
      items: plan.longTerm,
      color: 'bg-[oklch(0.5_0.15_290)]',
      bgColor: 'bg-[oklch(0.5_0.15_290)]/10',
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            Plano de Melhoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {phases.map((phase) => {
              const Icon = phase.icon
              return (
                <div
                  key={phase.title}
                  className="relative p-4 rounded-xl border bg-card"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${phase.color}`} />
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${phase.bgColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{phase.title}</h4>
                      <p className="text-xs text-muted-foreground">{phase.subtitle}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {phase.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Target className="w-5 h-5 text-accent" />
            </div>
            Arquitetura Alvo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {targetArchitecture.description}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 rounded-xl bg-[oklch(0.65_0.18_145)]/5 border border-[oklch(0.65_0.18_145)]/20">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-[oklch(0.65_0.18_145)]">+</span>
                Novos Componentes
              </h4>
              <div className="flex flex-wrap gap-2">
                {targetArchitecture.newComponents.map((component, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[oklch(0.65_0.18_145)]/10">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-3">
                Caminho de Migração
              </h4>
              <ol className="space-y-2">
                {targetArchitecture.migrationPath.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
