"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, TrendingUp, Heart, Brain, Moon, AlertTriangle, Activity, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type CheckInEntry = {
  mood: number
  anxiety: number
  sleep: number
  notes: string
  timestamp: string
  id: string
  patientToken: string
  date: string
  time: string
}

export default function ObrigadoPage() {
  const [lastCheckIn, setLastCheckIn] = useState<CheckInEntry | null>(null)
  const [riskLevel, setRiskLevel] = useState<"high" | "medium" | "stable">("stable")
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    const checkIns = JSON.parse(localStorage.getItem("checkins") || "[]")
    if (checkIns.length > 0) {
      const last = checkIns[checkIns.length - 1]
      setLastCheckIn(last)

      if (last.mood <= 2 || last.anxiety >= 4) {
        setRiskLevel("high")
        setRecommendations([
          "Entre em contato com seu psicólogo hoje mesmo",
          "Pratique respiração profunda por 5 minutos",
          "Evite tomar decisões importantes agora",
          "Converse com alguém de confiança sobre como se sente",
        ])
      } else if (last.mood === 3 || last.anxiety === 3) {
        setRiskLevel("medium")
        setRecommendations([
          "Mantenha check-ins diários para acompanhamento",
          "Dedique 10 minutos para autocuidado hoje",
          "Considere praticar uma atividade física leve",
          "Mantenha contato com seu psicólogo",
        ])
      } else {
        setRiskLevel("stable")
        setRecommendations([
          "Continue com os hábitos que estão funcionando",
          "Mantenha check-ins regulares para monitoramento",
          "Celebre seus progressos, mesmo os pequenos",
          "Compartilhe sua evolução com seu psicólogo",
        ])
      }
    }
  }, [])

  if (!lastCheckIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando sua análise...</p>
      </div>
    )
  }

  const getMoodLabel = (mood: number) => {
    if (mood === 1) return "Muito mal"
    if (mood === 2) return "Mal"
    if (mood === 3) return "Neutro"
    if (mood === 4) return "Bem"
    return "Muito bem"
  }

  const getAnxietyLabel = (anxiety: number) => {
    if (anxiety === 1) return "Nenhuma"
    if (anxiety === 2) return "Baixa"
    if (anxiety === 3) return "Média"
    if (anxiety === 4) return "Alta"
    return "Muito alta"
  }

  const getSleepLabel = (sleep: number) => {
    if (sleep === 1) return "Muito mal"
    if (sleep === 2) return "Mal"
    if (sleep === 3) return "Regular"
    if (sleep === 4) return "Bom"
    return "Muito bom"
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo1.png"
                alt="Psi Health Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              Psi Health
            </span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                riskLevel === "high" ? "bg-red-100" : riskLevel === "medium" ? "bg-yellow-100" : "bg-green-100"
              }`}
            >
              <CheckCircle
                className={`w-10 h-10 ${
                  riskLevel === "high" ? "text-red-600" : riskLevel === "medium" ? "text-yellow-600" : "text-green-600"
                }`}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Check-in registrado!</h1>
            <p className="text-muted-foreground">Aqui está sua análise emocional de hoje</p>
          </div>

          {riskLevel === "high" && (
            <Card className="p-6 bg-red-50 border-2 border-red-200">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-red-900">Seu psicólogo será notificado</h3>
                  <p className="text-sm text-red-800 leading-relaxed">
                    Identificamos que você pode estar passando por um momento difícil. Seu psicólogo receberá um alerta
                    e entrará em contato em breve. Você não está sozinho nessa jornada.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {riskLevel === "medium" && (
            <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
              <div className="flex items-start gap-4">
                <Activity className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-yellow-900">Continue monitorando</h3>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    Suas respostas indicam alguns desafios. Continue fazendo check-ins diários para acompanharmos sua
                    evolução de perto.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Humor</h3>
              <div className="text-5xl font-bold mb-2">{lastCheckIn.mood}</div>
              <p className="text-sm text-muted-foreground">{getMoodLabel(lastCheckIn.mood)}</p>
            </Card>

            <Card className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Ansiedade</h3>
              <div className="text-5xl font-bold mb-2">{lastCheckIn.anxiety}</div>
              <p className="text-sm text-muted-foreground">{getAnxietyLabel(lastCheckIn.anxiety)}</p>
            </Card>

            <Card className="p-6 text-center">
              <Moon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Sono</h3>
              <div className="text-5xl font-bold mb-2">{lastCheckIn.sleep}</div>
              <p className="text-sm text-muted-foreground">{getSleepLabel(lastCheckIn.sleep)}</p>
            </Card>
          </div>

          {lastCheckIn.notes && (
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Suas observações</h3>
              <p className="text-muted-foreground italic leading-relaxed">{lastCheckIn.notes}</p>
            </Card>
          )}

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-lg">Recomendações para você</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/check-in" className="block">
              <Button variant="outline" size="lg" className="w-full h-14 bg-transparent">
                Fazer novo check-in amanhã
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button size="lg" className="w-full h-14">
                Voltar ao início
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p>
              Seus dados são anônimos e apenas seu psicólogo terá acesso a eles. Em caso de emergência, ligue 188 (CVV).
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
