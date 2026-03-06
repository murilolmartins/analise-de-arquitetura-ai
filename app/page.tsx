'use client'

import { useState } from 'react'
import { ArchitectureUpload } from '@/components/architecture-upload'
import { ArchitectureReport } from '@/components/architecture-report'
import type { ArchitectureAnalysis } from '@/lib/types'
import { Cloud, Sparkles, Shield, TrendingUp, Zap, FileSearch } from 'lucide-react'

export default function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ArchitectureAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (imageData: string, imageType: string) => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData, imageType }),
      })

      if (!response.ok) {
        throw new Error('Falha ao analisar diagrama')
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setAnalysis(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Cloud Architecture Review
                </h1>
                <p className="text-xs text-muted-foreground">
                  Análise Inteligente de Arquiteturas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              Powered by AI
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysis ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <FileSearch className="w-4 h-4" />
                Revisão Automatizada de Arquitetura
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
                Analise sua Arquitetura Cloud como um Principal Solutions Architect
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Carregue seu diagrama de arquitetura e receba uma análise profissional completa,
                incluindo avaliação de segurança, escalabilidade, custos e recomendações de melhoria.
              </p>
            </div>

            {/* Upload Section */}
            <ArchitectureUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

            {/* Error Message */}
            {error && (
              <div className="max-w-3xl mx-auto p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center">
                {error}
              </div>
            )}

            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-3 pt-8">
              <FeatureCard
                icon={Shield}
                title="Avaliação Well-Architected"
                description="Análise baseada nos 6 pilares do framework Well-Architected: Confiabilidade, Escalabilidade, Performance, Segurança, Custos e Excelência Operacional."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Detecção de Maturidade"
                description="Classificação do nível de maturidade da sua arquitetura de 1 (Monolítica) a 5 (Enterprise Ready), com explicações detalhadas."
              />
              <FeatureCard
                icon={Zap}
                title="Recomendações Acionáveis"
                description="Sugestões específicas de serviços gerenciados, plano de melhoria por fases e caminho de migração para arquitetura alvo."
              />
            </div>
          </div>
        ) : (
          <ArchitectureReport analysis={analysis} onReset={handleReset} />
        )}
      </div>
    </main>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
      <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
