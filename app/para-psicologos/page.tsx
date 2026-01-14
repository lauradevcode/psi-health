import Link from "next/link"
import { Brain, LineChart, AlertTriangle, TrendingDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ParaPsicologosPage() {
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
            <Link href="/painel-psicologo">
              <Button size="lg">Acessar Painel</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Brain className="w-20 h-20 mx-auto text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold text-balance">Menos achismo. Mais visão clínica.</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Tome decisões mais precisas com dados organizados sobre a evolução emocional dos seus pacientes. Identifique
            riscos antes que se tornem crises.
          </p>
          <div className="pt-4">
            <Link href="/painel-psicologo">
              <Button size="lg" className="text-base px-8 py-6">
                Cadastrar como Psicólogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O que você ganha como psicólogo</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background rounded-lg p-8 space-y-4">
              <LineChart className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Histórico emocional organizado</h3>
              <p className="text-muted-foreground text-lg">
                Veja a evolução completa de cada paciente em gráficos claros, com dados sobre humor, ansiedade e sono ao
                longo do tempo.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 space-y-4">
              <AlertTriangle className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Alertas de risco</h3>
              <p className="text-muted-foreground text-lg">
                Receba notificações quando um paciente apresentar padrões preocupantes, permitindo intervenção
                preventiva.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 space-y-4">
              <TrendingDown className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Menos abandono</h3>
              <p className="text-muted-foreground text-lg">
                O acompanhamento contínuo mantém pacientes engajados entre sessões, reduzindo drasticamente o abandono
                terapêutico.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 space-y-4">
              <Brain className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Melhor tomada de decisão</h3>
              <p className="text-muted-foreground text-lg">
                Base suas decisões clínicas em dados concretos, não apenas em memória das sessões ou relatos
                retrospectivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works for Psychologists */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como funciona na sua prática</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Cadastre-se e adicione pacientes</h3>
                <p className="text-muted-foreground text-lg">
                  Crie sua conta profissional (verificamos seu CRP) e convide seus pacientes atuais para a plataforma.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Acompanhe dados emocionais</h3>
                <p className="text-muted-foreground text-lg">
                  Seus pacientes fazem check-ins regulares. Você acessa o dashboard e vê a evolução emocional de cada um
                  em tempo real.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Receba alertas e intervenha</h3>
                <p className="text-muted-foreground text-lg">
                  Quando o sistema identifica sinais de risco, você é notificado e pode agir preventivamente, antes que
                  a situação se agrave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <Users className="w-16 h-16 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">Fortaleça sua prática clínica</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Junte-se aos psicólogos que estão transformando o cuidado em saúde mental com dados e prevenção.
          </p>
          <Link href="/painel-psicologo">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6">
              Acessar Painel do Psicólogo
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
