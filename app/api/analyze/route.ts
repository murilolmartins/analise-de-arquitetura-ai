import { generateText, Output } from 'ai'
import { z } from 'zod'

const architectureAnalysisSchema = z.object({
  architectureSummary: z.string().describe('Comprehensive summary of the architecture diagram'),
  detectedComponents: z.array(z.string()).describe('List of all detected infrastructure components'),
  detectedProvider: z.object({
    provider: z.enum(['AWS', 'Google Cloud', 'Microsoft Azure', 'Hybrid', 'On-premise', 'Cloud-agnostic', 'Unknown']),
    confidence: z.number().min(0).max(1).describe('Confidence level 0-1'),
  }),
  maturityLevel: z.object({
    level: z.number().min(1).max(5).describe('1-5 maturity level'),
    name: z.enum(['Basic / Monolithic', 'Structured', 'Scalable', 'Cloud Native', 'Enterprise Ready']),
    description: z.string().describe('Explanation of why the architecture fits this level'),
  }),
  pillarScores: z.array(z.object({
    name: z.enum(['Reliability', 'Scalability', 'Performance Efficiency', 'Security', 'Cost Optimization', 'Operational Excellence']),
    score: z.number().min(0).max(100),
    description: z.string(),
  })),
  strengths: z.array(z.string()).describe('Architecture strengths'),
  risks: z.array(z.string()).describe('Identified risks'),
  failurePoints: z.array(z.object({
    component: z.string(),
    severity: z.enum(['critical', 'high', 'medium', 'low']),
    description: z.string(),
    impact: z.string().describe('Real-world impact if failure occurs'),
    mitigation: z.string(),
  })),
  scalabilityAnalysis: z.object({
    currentCapacity: z.string(),
    bottlenecks: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  securityAssessment: z.object({
    exposedServices: z.array(z.string()),
    isolationIssues: z.array(z.string()),
    authenticationRisks: z.array(z.string()),
    networkSegmentationGaps: z.array(z.string()),
    overallSeverity: z.enum(['critical', 'high', 'medium', 'low']),
  }),
  costObservations: z.object({
    level: z.enum(['Low', 'Medium', 'High']),
    factors: z.array(z.string()).describe('Cost risk factors like overprovisioning, idle infrastructure, scaling inefficiencies'),
  }),
  improvementPlan: z.object({
    shortTerm: z.array(z.string()).describe('Improvements for 0-3 months'),
    mediumTerm: z.array(z.string()).describe('Improvements for 3-6 months'),
    longTerm: z.array(z.string()).describe('Improvements for 6-12 months'),
  }),
  suggestedServices: z.array(z.object({
    currentComponent: z.string(),
    suggestedService: z.string(),
    provider: z.string(),
    benefit: z.string(),
    effort: z.enum(['low', 'medium', 'high']),
  })),
  targetArchitecture: z.object({
    description: z.string(),
    newComponents: z.array(z.string()),
    migrationPath: z.array(z.string()),
  }),
  architectureFlowDescription: z.string().describe('Textual representation like: Client → Load Balancer → API Layer → Services → Database'),
  possibleUseCases: z.array(z.string()),
  overallArchitectureScore: z.number().min(0).max(100).describe('Overall architecture score'),
})

const systemPrompt = `Você é um Principal Cloud Solutions Architect realizando uma revisão profissional de arquitetura.

INSTRUÇÕES CRÍTICAS:
- Pense como um Principal Cloud Architect com mais de 15 anos de experiência
- Evite feedback genérico - seja preciso e técnico
- Forneça raciocínio de engenharia para todas as avaliações
- Assuma sistemas em escala de produção ao analisar
- Seja específico sobre serviços do provedor cloud quando identificado
- Considere cenários de falha do mundo real e seu impacto nos negócios
- TODAS AS RESPOSTAS DEVEM SER EM PORTUGUÊS BRASILEIRO

FRAMEWORK DE ANÁLISE:

1. DETECÇÃO DE COMPONENTES:
- Identifique todos os componentes de infraestrutura (servidores, bancos de dados, load balancers, caches, filas, etc.)
- Reconheça padrões de provedores cloud (AWS: EC2, Lambda, S3, RDS; GCP: Compute Engine, Cloud Functions; Azure: VMs, Functions, Blob Storage)
- Detecte direções de fluxo de dados e interações entre serviços

2. IDENTIFICAÇÃO DO PROVEDOR CLOUD:
- Procure ícones, cores e convenções de nomenclatura específicas do provedor
- Considere cenários híbridos e multi-cloud
- Forneça nível de confiança baseado na clareza visual

3. AVALIAÇÃO DE MATURIDADE:
- Nível 1 (Básico/Monolítico): Unidade de deploy única, sem separação de responsabilidades
- Nível 2 (Estruturado): Alguma separação, escalonamento básico
- Nível 3 (Escalável): Escalonamento horizontal, balanceamento de carga
- Nível 4 (Cloud Native): Containers, microsserviços, serviços gerenciados
- Nível 5 (Enterprise Ready): Redundância completa, multi-região, observabilidade, segurança em profundidade

4. PILARES WELL-ARCHITECTED (score 0-100 cada):
- Confiabilidade: Tolerância a falhas, recuperação, redundância
- Escalabilidade: Capacidade de lidar com crescimento
- Eficiência de Performance: Otimização de recursos
- Segurança: Defesa em profundidade, controle de acesso
- Otimização de Custos: Eficiência de recursos
- Excelência Operacional: Monitoramento, automação

5. ANÁLISE DE FALHAS:
- Pontos únicos de falha
- Riscos de contenção no banco de dados
- Gargalos de rede
- Redundância ausente
- Cenários de falha em cascata

6. REVISÃO DE SEGURANÇA:
- Serviços expostos à internet
- Isolamento de rede ausente
- Lacunas de autenticação/autorização
- Preocupações com proteção de dados

Forneça recomendações acionáveis e específicas que uma equipe de engenharia possa implementar. RESPONDA SEMPRE EM PORTUGUÊS.`

export async function POST(req: Request) {
  try {
    const { imageData, imageType } = await req.json()

    if (!imageData) {
      return Response.json({ error: 'No image data provided' }, { status: 400 })
    }

    const { output } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      output: Output.object({
        schema: architectureAnalysisSchema,
      }),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analise este diagrama de arquitetura cloud minuciosamente. Realize uma revisão completa de arquitetura como um Principal Solutions Architect faria. Seja específico, técnico e forneça insights acionáveis. Responda em português brasileiro.',
            },
            {
              type: 'image',
              image: imageData,
              mimeType: imageType || 'image/png',
            },
          ],
        },
      ],
    })

    return Response.json({ analysis: output })
  } catch (error) {
    console.error('Analysis error:', error)
    return Response.json(
      { error: 'Failed to analyze architecture diagram' },
      { status: 500 }
    )
  }
}
