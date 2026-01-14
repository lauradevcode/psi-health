import Link from "next/link"
import { Shield, Lock, Eye, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TecnologiaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="text-3xl">Ψ</span>
            <span>PSI Telemedicina</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/como-funciona" className="text-foreground/80 hover:text-foreground transition">
              Como funciona
            </Link>
            <Link href="/para-pacientes" className="text-foreground/80 hover:text-foreground transition">
              Para Pacientes
            </Link>
            <Link href="/para-psicologos" className="text-foreground/80 hover:text-foreground transition">
              Para Psicólogos
            </Link>
            <Link href="/tecnologia" className="text-foreground/80 hover:text-foreground transition">
              Tecnologia
            </Link>
            <Link href="/check-in">
              <Button size="lg">Acessar Plataforma</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Shield className="w-20 h-20 mx-auto text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold text-balance">Tecnologia & Dados</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Entenda como usamos dados de forma ética, segura e transparente para fortalecer o cuidado em saúde mental.
          </p>
        </div>
      </section>

      {/* Main Principle */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto">
            Dados não substituem o humano. Eles fortalecem o cuidado.
          </p>
        </div>
      </section>

      {/* Principles Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nossos Princípios</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-muted/30 rounded-lg p-8 space-y-4">
            <Lock className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Coleta ética de dados</h3>
            <p className="text-muted-foreground text-lg">
              Coletamos apenas informações essenciais para o cuidado: humor, ansiedade e sono. Nada mais. Você sempre
              sabe o que está sendo coletado e por quê.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-8 space-y-4">
            <Shield className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Privacidade e consentimento</h3>
            <p className="text-muted-foreground text-lg">
              Seus dados são criptografados e protegidos. Você controla quem tem acesso e pode revogar permissões a
              qualquer momento. Seu consentimento é sempre necessário.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-8 space-y-4">
            <Eye className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Prevenção, não vigilância</h3>
            <p className="text-muted-foreground text-lg">
              Não vigiamos comportamentos nem julgamos escolhas. Usamos dados para identificar padrões de risco e apoiar
              decisões clínicas que beneficiam você.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-8 space-y-4">
            <TrendingUp className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Regras de leitura simples</h3>
            <p className="text-muted-foreground text-lg">
              Não prometemos inteligência artificial complexa. Usamos regras claras e compreensíveis para identificar
              mudanças emocionais significativas ao longo do tempo.
            </p>
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como usamos os dados</h2>
            <div className="space-y-8">
              <div className="bg-background rounded-lg p-8 space-y-4">
                <h3 className="text-2xl font-bold">1. Coleta</h3>
                <p className="text-muted-foreground text-lg">
                  Você responde perguntas simples sobre seu estado emocional: "Como está seu humor hoje?" (escala de 1 a
                  5), "Como está sua ansiedade?" e "Como está dormindo?". Leva menos de 2 minutos.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 space-y-4">
                <h3 className="text-2xl font-bold">2. Organização</h3>
                <p className="text-muted-foreground text-lg">
                  Suas respostas são organizadas em um histórico temporal que mostra tendências ao longo dos dias e
                  semanas. Transformamos respostas em gráficos claros e compreensíveis.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 space-y-4">
                <h3 className="text-2xl font-bold">3. Análise de padrões</h3>
                <p className="text-muted-foreground text-lg">
                  Identificamos padrões como: piora consistente do humor por 3+ dias, aumento significativo de
                  ansiedade, ou redução drástica no engajamento com check-ins.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 space-y-4">
                <h3 className="text-2xl font-bold">4. Apoio à decisão</h3>
                <p className="text-muted-foreground text-lg">
                  Quando identificamos sinais de alerta, alertamos o psicólogo responsável, que pode então avaliar e
                  decidir sobre a melhor intervenção. Você também recebe conteúdos de apoio personalizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Lock className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">Segurança e Conformidade</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seguimos rigorosos padrões de segurança e privacidade, incluindo criptografia de dados, acesso controlado e
            conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
          <ul className="text-left max-w-2xl mx-auto space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Criptografia ponta a ponta de todas as comunicações</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Armazenamento seguro com backup automatizado</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Acesso restrito apenas a profissionais autorizados</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Transparência total sobre uso de dados</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Direito de exclusão de dados a qualquer momento</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Dúvidas sobre como usamos seus dados?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Estamos sempre disponíveis para esclarecer qualquer questão sobre privacidade, segurança e uso de dados.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6">
              Voltar à Página Inicial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 PSI Telemedicina. Saúde mental orientada por dados, prevenção e cuidado contínuo.</p>
        </div>
      </footer>
    </div>
  )
}
