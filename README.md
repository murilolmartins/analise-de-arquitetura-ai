# Cloud Architecture Review

Plataforma avançada de revisão de arquiteturas cloud com inteligência artificial. Faça upload de diagramas de arquitetura e receba avaliações profissionais detalhadas sobre segurança, escalabilidade, custos e recomendações de melhorias.

## Link com o deploy
https://www.trustedkmonitor.xyz/

## Funcionalidades

- **Detecção Automática de Provider**: Identifica AWS, Google Cloud, Azure, ambientes híbridos ou on-premise
- **Score de Maturidade**: Avaliação em 5 níveis (Básico a Enterprise Ready)
- **Pilares Well-Architected**: Scores de 0-100 para Confiabilidade, Escalabilidade, Performance, Segurança, Custos e Excelência Operacional
- **Análise de Pontos de Falha**: Identificação de SPOFs com severidade e mitigações
- **Avaliação de Segurança**: Serviços expostos, isolamento de rede, riscos de autenticação
- **Análise de Escalabilidade**: Gargalos e capacidade atual
- **Recomendações de Serviços**: Sugestões de serviços gerenciados com esforço de implementação
- **Plano de Melhoria**: Ações de curto, médio e longo prazo
- **Arquitetura Alvo**: Descrição da arquitetura ideal e caminho de migração
- **Exportação em JSON**: Download do relatório completo

## Como Funciona

1. **Upload**: Arraste ou selecione um diagrama de arquitetura (PNG, JPG, WebP)
2. **Análise**: A IA processa a imagem usando o modelo GPT-4o via Vercel AI Gateway
3. **Relatório**: Receba um relatório detalhado com todas as métricas e recomendações

## Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API Route que processa a análise com AI SDK
│   ├── globals.css               # Estilos globais e design tokens
│   ├── layout.tsx                # Layout principal da aplicação
│   └── page.tsx                  # Página principal com upload e relatório
├── components/
│   ├── architecture-report.tsx   # Componente wrapper do relatório
│   ├── architecture-upload.tsx   # Componente de upload drag & drop
│   └── report/
│       ├── components-list.tsx       # Lista de componentes detectados
│       ├── failure-points.tsx        # Pontos de falha identificados
│       ├── improvement-plan.tsx      # Plano de melhorias em fases
│       ├── pillar-scores.tsx         # Scores dos pilares Well-Architected
│       ├── scalability-analysis.tsx  # Análise de escalabilidade
│       ├── score-hero.tsx            # Hero com score geral e resumo
│       ├── security-assessment.tsx   # Avaliação de segurança
│       └── service-recommendations.tsx # Recomendações de serviços
├── lib/
│   ├── types.ts                  # Tipos TypeScript para a análise
│   └── utils.ts                  # Utilitários (cn para classes)
└── public/
    └── favicon.jpg               # Favicon da aplicação
```

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **AI SDK 6** - SDK da Vercel para integração com modelos de IA
- **Vercel AI Gateway** - Gateway para acesso aos modelos (GPT-4o)
- **Tailwind CSS v4** - Framework de estilos utilitários
- **shadcn/ui** - Biblioteca de componentes
- **Zod** - Validação de schemas para output estruturado
- **Lucide React** - Biblioteca de ícones

## Variáveis de Ambiente

A aplicação utiliza o **Vercel AI Gateway** que não requer configuração adicional quando executada na Vercel.

Para desenvolvimento local ou uso de outros providers, configure:

```env
# Opcional - Para usar AI Gateway com outros providers
AI_GATEWAY_API_KEY=sua_chave_aqui

# Alternativa - Usar OpenAI diretamente (requer alteração no código)
OPENAI_API_KEY=sua_chave_openai
```

### Configuração do AI Gateway

O AI Gateway está configurado para usar `openai/gpt-4o` por padrão. Para alterar o modelo, edite o arquivo `app/api/analyze/route.ts`:

```typescript
const result = await generateText({
  model: 'openai/gpt-4o', // ou 'anthropic/claude-3-opus', 'google/gemini-pro', etc.
  // ...
})
```

## Como Rodar

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd cloud-architecture-review

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente (opcional para Vercel)
cp .env.example .env.local
# Edite .env.local com suas chaves

# Inicie o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Build de Produção

```bash
# Gere o build
pnpm build

# Inicie em modo produção
pnpm start
```

## Deploy na Vercel

1. Faça push do código para um repositório GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. O AI Gateway funciona automaticamente sem configuração adicional
4. Deploy automático a cada push

## Tipos de Análise Retornados

A API retorna um objeto `ArchitectureAnalysis` com:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `overallArchitectureScore` | number | Score geral de 0-100 |
| `maturityLevel` | object | Nível de maturidade (1-5) |
| `detectedProvider` | object | Provider identificado + confiança |
| `pillarScores` | array | 6 pilares Well-Architected |
| `failurePoints` | array | Pontos de falha com severidade |
| `securityAssessment` | object | Avaliação completa de segurança |
| `scalabilityAnalysis` | object | Capacidade e gargalos |
| `suggestedServices` | array | Recomendações de serviços |
| `improvementPlan` | object | Plano em 3 fases |
| `targetArchitecture` | object | Arquitetura alvo e migração |

## Licença

MIT
