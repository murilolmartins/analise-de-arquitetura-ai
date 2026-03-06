'use client'

import type { ArchitectureAnalysis } from '@/lib/types'
import { ScoreHero } from './report/score-hero'
import { PillarScores } from './report/pillar-scores'
import { FailurePoints } from './report/failure-points'
import { SecurityAssessment } from './report/security-assessment'
import { ServiceRecommendations } from './report/service-recommendations'
import { ImprovementPlan } from './report/improvement-plan'
import { ComponentsList } from './report/components-list'
import { ScalabilityAnalysis } from './report/scalability-analysis'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'

interface ArchitectureReportProps {
  analysis: ArchitectureAnalysis
  onReset: () => void
}

export function ArchitectureReport({ analysis, onReset }: ArchitectureReportProps) {
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(analysis, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = 'architecture-analysis.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Nova Análise
        </Button>
        <Button variant="outline" onClick={handleExportJSON} className="gap-2">
          <Download className="w-4 h-4" />
          Exportar JSON
        </Button>
      </div>

      {/* Score Hero */}
      <ScoreHero analysis={analysis} />

      {/* Pillar Scores */}
      <PillarScores scores={analysis.pillarScores} />

      {/* Scalability Analysis */}
      <ScalabilityAnalysis analysis={analysis.scalabilityAnalysis} />

      {/* Components and Flow */}
      <ComponentsList
        components={analysis.detectedComponents}
        strengths={analysis.strengths}
        risks={analysis.risks}
        flowDescription={analysis.architectureFlowDescription}
        costObservations={analysis.costObservations}
        useCases={analysis.possibleUseCases}
      />

      {/* Failure Points */}
      <FailurePoints failurePoints={analysis.failurePoints} />

      {/* Security Assessment */}
      <SecurityAssessment assessment={analysis.securityAssessment} />

      {/* Service Recommendations */}
      <ServiceRecommendations recommendations={analysis.suggestedServices} />

      {/* Improvement Plan */}
      <ImprovementPlan
        plan={analysis.improvementPlan}
        targetArchitecture={analysis.targetArchitecture}
      />

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-sm text-muted-foreground">
          Relatório gerado por Cloud Architecture Review AI
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date().toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
