import Link from "next/link"
import { Heart, Calendar, Bell, Shield, BookOpen, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ParaPacientesPage() {
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
          <Heart className="w-20 h-20 mx-auto text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Você não é atendido só na sessão. Você é acompanhado no processo.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Com o PSI Telemedicina, você tem apoio contínuo entre as sessões, conteúdos personalizados e a segurança de
            estar sendo cuidado mesmo nos momentos difíceis.
          </p>
          <div className="pt-4">
            <Link href="/check-in">
              <Button size="lg" className="text-base px-8 py-6">
                Acessar Acompanhamento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O que você ganha</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-background rounded-lg p-6 space-y-4">
              <Activity className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-bold">Check-ins simples</h3>
              <p className="text-muted-foreground">
                Responda perguntas rápidas sobre como você está se sentindo. Leva menos de 2 minutos.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 space-y-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-bold">Conteúdos de apoio</h3>
              <p className="text-muted-foreground">
                Receba materiais personalizados baseados nos seus padrões emocionais para te ajudar entre sessões.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 space-y-4">
              <Bell className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-bold">Lembretes</h3>
              <p className="text-muted-foreground">
                Nunca mais esqueça de fazer seu check-in ou perder uma sessão com lembretes gentis e pontuais.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 space-y-4">
              <Shield className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-bold">Mais segurança emocional</h3>
              <p className="text-muted-foreground">
                Saiba que seu psicólogo está acompanhando sua evolução e será alertado se precisar de mais apoio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works for Patients */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como funciona na prática</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Cadastro e primeiro check-in</h3>
                <p className="text-muted-foreground text-lg">
                  Você se cadastra na plataforma e responde seu primeiro check-in emocional. São perguntas simples sobre
                  humor, ansiedade e sono.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Acompanhamento regular</h3>
                <p className="text-muted-foreground text-lg">
                  Ao longo dos dias, você recebe lembretes para fazer novos check-ins. Isso cria um histórico que ajuda
                  a identificar padrões.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Receba apoio personalizado</h3>
                <p className="text-muted-foreground text-lg">
                  Com base nos seus dados, você recebe conteúdos de apoio e, se necessário, seu psicólogo é alertado
                  para oferecer suporte extra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <Calendar className="w-16 h-16 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">Comece seu acompanhamento hoje</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Transforme o cuidado da sua saúde mental em um processo contínuo, preventivo e acolhedor.
          </p>
          <Link href="/check-in">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6">
              Fazer Primeiro Check-in
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
