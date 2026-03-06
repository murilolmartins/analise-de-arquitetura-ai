'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ArchitectureAnalysis } from '@/lib/types'
import { Boxes, CheckCircle, AlertCircle, ArrowRight, DollarSign } from 'lucide-react'

interface ComponentsListProps {
  components: string[]
  strengths: string[]
  risks: string[]
  flowDescription: string
  costObservations: ArchitectureAnalysis['costObservations']
  useCases: string[]
}

const costColors = {
  Low: 'bg-[oklch(0.65_0.18_145)] text-white',
  Medium: 'bg-[oklch(0.75_0.18_75)] text-[oklch(0.2_0.02_75)]',
  High: 'bg-destructive text-destructive-foreground',
}

export function ComponentsList({
  components,
  strengths,
  risks,
  flowDescription,
  costObservations,
  useCases,
}: ComponentsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Components Detected */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Boxes className="w-5 h-5 text-primary" />
            </div>
            Componentes Detectados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {components.map((component, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {component}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Architecture Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
            Fluxo de Arquitetura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50 font-mono text-sm text-foreground leading-relaxed">
            {flowDescription}
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[oklch(0.65_0.18_145)]/10">
              <CheckCircle className="w-5 h-5 text-[oklch(0.65_0.18_145)]" />
            </div>
            Pontos Fortes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_145)] mt-2 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            Riscos Identificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {risks.map((risk, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Cost Observations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[oklch(0.75_0.18_75)]/10">
                <DollarSign className="w-5 h-5 text-[oklch(0.75_0.18_75)]" />
              </div>
              Observações de Custo
            </CardTitle>
            <Badge className={costColors[costObservations.level]}>
              Risco {costObservations.level === 'Low' ? 'Baixo' : costObservations.level === 'Medium' ? 'Médio' : 'Alto'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {costObservations.factors.map((factor, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.18_75)] mt-2 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[oklch(0.5_0.15_290)]/10">
              <Boxes className="w-5 h-5 text-[oklch(0.5_0.15_290)]" />
            </div>
            Casos de Uso Possíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {useCases.map((useCase, idx) => (
              <Badge key={idx} variant="outline" className="whitespace-normal text-left">
                {useCase}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
