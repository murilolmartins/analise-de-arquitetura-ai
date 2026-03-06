export interface DetectedProvider {
  provider: 'AWS' | 'Google Cloud' | 'Microsoft Azure' | 'Hybrid' | 'On-premise' | 'Cloud-agnostic' | 'Unknown'
  confidence: number
}

export interface PillarScore {
  name: string
  score: number
  description: string
}

export interface FailurePoint {
  component: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  impact: string
  mitigation: string
}

export interface SecurityAssessment {
  exposedServices: string[]
  isolationIssues: string[]
  authenticationRisks: string[]
  networkSegmentationGaps: string[]
  overallSeverity: 'critical' | 'high' | 'medium' | 'low'
}

export interface ServiceRecommendation {
  currentComponent: string
  suggestedService: string
  provider: string
  benefit: string
  effort: 'low' | 'medium' | 'high'
}

export interface ArchitectureAnalysis {
  architectureSummary: string
  detectedComponents: string[]
  detectedProvider: DetectedProvider
  maturityLevel: {
    level: 1 | 2 | 3 | 4 | 5
    name: string
    description: string
  }
  pillarScores: PillarScore[]
  strengths: string[]
  risks: string[]
  failurePoints: FailurePoint[]
  scalabilityAnalysis: {
    currentCapacity: string
    bottlenecks: string[]
    recommendations: string[]
  }
  securityAssessment: SecurityAssessment
  costObservations: {
    level: 'Low' | 'Medium' | 'High'
    factors: string[]
  }
  improvementPlan: {
    shortTerm: string[]
    mediumTerm: string[]
    longTerm: string[]
  }
  suggestedServices: ServiceRecommendation[]
  targetArchitecture: {
    description: string
    newComponents: string[]
    migrationPath: string[]
  }
  architectureFlowDescription: string
  possibleUseCases: string[]
  overallArchitectureScore: number
}
