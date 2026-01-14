"use client"

import Link from "next/link"
import { AlertCircle, LineChart, Brain, Activity, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-xl z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-2 md:py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/images/logo1.png"
                  alt="Psi Health"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Psi Health
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="#beneficios"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Benefícios
              </Link>
              <Link
                href="#como-funciona"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Como funciona
              </Link>
              <Link
                href="#para-quem"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Para quem é
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/login">
                <Button size="sm" variant="outline" className="text-xs md:text-sm px-4 md:px-5 h-9 bg-transparent">
                  Entrar
                </Button>
              </Link>
              <Link href="/login?tab=signup" className="hidden md:block">
                <Button size="sm" className="text-sm px-5 h-9">
                  Começar agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 lg:px-6 py-8 md:py-12 lg:py-16">
        <div
          className={`max-w-4xl mx-auto text-center space-y-4 md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs md:text-sm font-medium text-primary">
            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Healthtech de cuidado preventivo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight tracking-tight">
            Controle real da saúde mental com dados que antecipam riscos
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Uma plataforma para psicólogos e empresas acompanharem jornadas, padrões e alertas antes da crise.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4">
            <Link href="/login?tab=signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base font-medium px-8 h-12 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Começar agora
              </Button>
            </Link>
            <a
              href="https://wa.me/5561998548265?text=Olá! Gostaria de agendar uma demonstração da plataforma Psi Health"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base font-medium px-8 h-12 bg-transparent"
              >
                Agendar Demonstração
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="beneficios" className="container mx-auto px-4 lg:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          <div
            className={`bg-card border rounded-xl p-6 md:p-8 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">Visão clínica integrada</h3>
            <p className="text-muted-foreground leading-relaxed">
              Centralize histórico terapêutico, psiquiátrico e jornadas ativas.
            </p>
          </div>

          <div
            className={`bg-card border rounded-xl p-6 md:p-8 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <LineChart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">Insights acionáveis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Alertas simples que mostram o que precisa de atenção agora.
            </p>
          </div>

          <div
            className={`bg-card border rounded-xl p-6 md:p-8 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">Ação antes da crise</h3>
            <p className="text-muted-foreground leading-relaxed">Decisões humanas apoiadas por dados organizados.</p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-muted/40 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto">
              Como funciona na prática
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Um fluxo simples que transforma dados em cuidado real
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Mobile: Stack vertical */}
            <div className="md:hidden space-y-4">
              {[
                { icon: Users, title: "Psicólogo ou empresa cria conta", desc: "Cadastro rápido e acesso ao painel" },
                { icon: Activity, title: "Define jornadas e check-ins", desc: "Cria acompanhamentos personalizados" },
                {
                  icon: LineChart,
                  title: "Sistema coleta dados simples",
                  desc: "Paciente responde via link, sem login",
                },
                {
                  icon: AlertCircle,
                  title: "Alertas destacam padrões",
                  desc: "Sistema sinaliza o que precisa atenção",
                },
                { icon: CheckCircle, title: "Profissional decide a ação", desc: "Decisão humana com dados claros" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-xl font-bold shadow-md">
                    {i + 1}
                  </div>
                  <div className="space-y-2 pt-1">
                    <h3 className="font-semibold text-base">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Timeline horizontal */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-6">
              {[
                { icon: Users, title: "Psicólogo ou empresa cria conta", desc: "Cadastro rápido e acesso ao painel" },
                { icon: Activity, title: "Define jornadas e check-ins", desc: "Cria acompanhamentos personalizados" },
                {
                  icon: LineChart,
                  title: "Sistema coleta dados simples",
                  desc: "Paciente responde via link, sem login",
                },
                {
                  icon: AlertCircle,
                  title: "Alertas destacam padrões",
                  desc: "Sistema sinaliza o que precisa atenção",
                },
                { icon: CheckCircle, title: "Profissional decide a ação", desc: "Decisão humana com dados claros" },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="relative">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-14 h-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm leading-tight">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                    {i < 4 && (
                      <div className="absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-primary/20 hidden lg:block" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="para-quem" className="container mx-auto px-4 lg:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Para quem decide acompanhar, não apenas atender
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border rounded-xl p-6 md:p-8 space-y-6 hover:shadow-lg hover:border-primary/50 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">Psicólogos Autônomos</h3>
            <div className="space-y-4 text-sm md:text-base">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Organize</span> pacientes, jornadas e check-ins em um
                painel claro.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Acompanhe</span> evolução emocional sem depender só da
                memória.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Decida</span> com mais clareza clínica e menos retrabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="container mx-auto px-4 lg:px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 md:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">Quer ver a plataforma funcionando?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Agende uma demonstração personalizada e veja como a Psi Health pode transformar sua forma de acompanhar
                pacientes.
              </p>
              <a
                href="https://wa.me/5561998548265?text=Olá! Gostaria de agendar uma demonstração da plataforma Psi Health"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="text-base font-medium px-8 h-12 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Agendar Demonstração
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">Exclusivo para psicólogos. Resposta em até 24h.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-4 lg:px-6 text-center space-y-4 md:space-y-6 relative z-10">
          <Brain className="w-12 h-12 md:w-16 md:h-16 mx-auto opacity-90" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto">
            Comece a acompanhar seus pacientes com mais clareza
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            Cadastre-se agora e tenha acesso ao painel profissional de gestão de saúde mental
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/login?tab=signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base font-medium px-8 h-12 bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                Começar agora
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base font-medium px-8 h-12 border-primary-foreground/20 hover:bg-primary-foreground/10 bg-transparent"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 py-6 md:py-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/logo1.png"
                  alt="Psi Health"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                © 2025 Psi Health. Healthtech de cuidado preventivo.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#beneficios" className="hover:text-foreground transition-colors">
                Benefícios
              </Link>
              <Link href="#como-funciona" className="hover:text-foreground transition-colors">
                Como funciona
              </Link>
              <Link href="#para-quem" className="hover:text-foreground transition-colors">
                Para quem é
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
