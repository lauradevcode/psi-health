import Link from "next/link"
import { ArrowLeft, CheckCircle, Heart, Bell, MessageCircle, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">Ψ</span>
              <span>Psi Telemedicina</span>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Como funciona o cuidado contínuo</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Nossa plataforma usa dados simples para prevenir crises e apoiar seu bem-estar emocional
            </p>
          </div>

          {/* Flow Steps */}
          <div className="space-y-8">
            <Card className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
                  1
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Você faz check-ins emocionais</h3>
                  </div>
                  <p className="text-muted-foreground">
                    De forma rápida e simples, você responde 3 perguntas sobre humor, ansiedade e sono. Leva menos de 2
                    minutos e pode ser feito pelo celular, quando quiser.
                  </p>
                  <div className="pt-2">
                    <Link href="/check-in">
                      <Button variant="outline">Experimentar Check-in</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Sistema analisa seus padrões</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nossa plataforma identifica automaticamente padrões de risco, estabilidade ou abandono. Quanto mais
                    check-ins você faz, melhor entendemos sua jornada emocional.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-green-900">Padrão Estável</div>
                        <div className="text-sm text-green-700">Evolução positiva, tudo sob controle</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Bell className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-yellow-900">Padrão de Atenção</div>
                        <div className="text-sm text-yellow-700">Sinais de alerta detectados</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-red-900">Padrão de Risco</div>
                        <div className="text-sm text-red-700">Deterioração emocional identificada</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
                  3
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Ações automáticas são acionadas</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Baseado nos padrões identificados, o sistema toma ações para apoiar você:
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Mensagens de apoio via WhatsApp</strong> - Lembretes gentis e motivacionais
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Recomendações de conteúdo</strong> - Artigos e técnicas úteis para o momento
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Alertas ao psicólogo</strong> - Em casos de risco, seu profissional é notificado
                      </span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/whatsapp-bot">
                      <Button variant="outline">Ver Simulação do Bot</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
                  4
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Seu psicólogo acompanha tudo</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Profissionais têm acesso a um painel com sua evolução emocional em tempo real, permitindo
                    intervenções mais precisas e no momento certo.
                  </p>
                  <div className="pt-2">
                    <Link href="/painel-psicologo">
                      <Button variant="outline">Ver Painel do Psicólogo</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Principles */}
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-6">Nossos Princípios</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl">🔒</div>
                <h3 className="font-semibold">Privacidade absoluta</h3>
                <p className="text-sm text-muted-foreground">
                  Seus dados são criptografados e protegidos pelo sigilo profissional
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🤝</div>
                <h3 className="font-semibold">Apoio, não substituição</h3>
                <p className="text-sm text-muted-foreground">A tecnologia apoia o profissional, nunca o substitui</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">📊</div>
                <h3 className="font-semibold">Dados simples, insights poderosos</h3>
                <p className="text-sm text-muted-foreground">
                  Informações básicas podem prevenir crises e salvar vidas
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">💚</div>
                <h3 className="font-semibold">Linguagem humana</h3>
                <p className="text-sm text-muted-foreground">
                  Sem jargões técnicos, apenas comunicação clara e acolhedora
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold">Pronto para começar?</h2>
            <p className="text-muted-foreground">
              Faça seu primeiro check-in agora e comece a cuidar da sua saúde mental
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/check-in">
                <Button size="lg" className="w-full sm:w-auto">
                  Fazer Check-in Agora
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
