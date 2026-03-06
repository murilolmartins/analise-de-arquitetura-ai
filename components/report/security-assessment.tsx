'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SecurityAssessment as SecurityAssessmentType } from '@/lib/types'
import { Lock, Globe, Network, Key, Shield } from 'lucide-react'

interface SecurityAssessmentProps {
  assessment: SecurityAssessmentType
}

const severityColors = {
  critical: 'bg-destructive text-destructive-foreground',
  high: 'bg-[oklch(0.6_0.2_45)] text-white',
  medium: 'bg-[oklch(0.75_0.18_75)] text-[oklch(0.2_0.02_75)]',
  low: 'bg-[oklch(0.65_0.18_145)] text-white',
}

const severityLabels = {
  critical: 'Crítico',
  high: 'Alto',
  medium: 'Médio',
  low: 'Baixo',
}

export function SecurityAssessment({ assessment }: SecurityAssessmentProps) {
  const sections = [
    {
      title: 'Serviços Expostos',
      icon: Globe,
      items: assessment.exposedServices,
      emptyMessage: 'Nenhum serviço exposto desnecessariamente',
    },
    {
      title: 'Problemas de Isolamento',
      icon: Network,
      items: assessment.isolationIssues,
      emptyMessage: 'Isolamento adequado detectado',
    },
    {
      title: 'Riscos de Autenticação',
      icon: Key,
      items: assessment.authenticationRisks,
      emptyMessage: 'Autenticação bem configurada',
    },
    {
      title: 'Lacunas de Segmentação',
      icon: Shield,
      items: assessment.networkSegmentationGaps,
      emptyMessage: 'Segmentação de rede adequada',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[oklch(0.55_0.22_255)]/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            Avaliação de Segurança
          </CardTitle>
          <Badge className={cn('text-sm', severityColors[assessment.overallSeverity])}>
            Risco {severityLabels[assessment.overallSeverity]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon
            const hasIssues = section.items.length > 0

            return (
              <div
                key={section.title}
                className={cn(
                  'p-4 rounded-xl border',
                  hasIssues ? 'bg-destructive/5 border-destructive/20' : 'bg-[oklch(0.65_0.18_145)]/5 border-[oklch(0.65_0.18_145)]/20'
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={cn(
                    'w-4 h-4',
                    hasIssues ? 'text-destructive' : 'text-[oklch(0.65_0.18_145)]'
                  )} />
                  <h4 className="font-medium text-sm">{section.title}</h4>
                  {hasIssues && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {section.items.length}
                    </Badge>
                  )}
                </div>

                {hasIssues ? (
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[oklch(0.65_0.18_145)]">
                    {section.emptyMessage}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
