"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
  Heart,
  Brain,
  Moon,
  BarChart3,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ContextualTooltip } from "@/components/contextual-tooltip"

export default function PainelEmpresaPage() {
  const { toast } = useToast()
  const [isSimulateCheckInOpen, setIsSimulateCheckInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [simulateCheckIn, setSimulateCheckIn] = useState({
    mood: 0,
    anxiety: 0,
    sleep: 0,
    notes: "",
  })

  const [checkIns, setCheckIns] = useState<any[]>([])
  const [aggregatedData, setAggregatedData] = useState({
    totalCollaborators: 248,
    engagement: 87,
    attention: 12,
    avgMood: 3.8,
    avgAnxiety: 2.9,
    avgSleep: 3.6,
  })

  useEffect(() => {
    const storedCheckIns = localStorage.getItem("checkins")
    if (storedCheckIns) {
      const parsedCheckIns = JSON.parse(storedCheckIns)
      setCheckIns(parsedCheckIns)

      // Calculate aggregated metrics
      if (parsedCheckIns.length > 0) {
        const totalMood = parsedCheckIns.reduce((sum: number, ci: any) => sum + (ci.mood || 0), 0)
        const totalAnxiety = parsedCheckIns.reduce((sum: number, ci: any) => sum + (ci.anxiety || 0), 0)
        const totalSleep = parsedCheckIns.reduce((sum: number, ci: any) => sum + (ci.sleep || 0), 0)
        const count = parsedCheckIns.length

        const attentionCount = parsedCheckIns.filter((ci: any) => ci.mood <= 2 || ci.anxiety >= 4).length

        setAggregatedData({
          totalCollaborators: 248 + count,
          engagement: Math.min(95, 87 + Math.floor(count / 2)),
          attention: 12 + attentionCount,
          avgMood: (totalMood / count).toFixed(1) as any,
          avgAnxiety: (totalAnxiety / count).toFixed(1) as any,
          avgSleep: (totalSleep / count).toFixed(1) as any,
        })
      }
    }
  }, [])

  const handleSimulateCheckIn = () => {
    if (!simulateCheckIn.mood || !simulateCheckIn.anxiety || !simulateCheckIn.sleep) {
      toast({
        title: "Erro",
        description: "Preencha todas as escalas antes de simular.",
        variant: "destructive",
      })
      return
    }

    const timestamp = new Date().toISOString()
    const checkInEntry = {
      ...simulateCheckIn,
      timestamp,
      id: Math.random().toString(36).substr(2, 9),
      patientToken: "simulated-" + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString("pt-BR"),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }

    const existingData = localStorage.getItem("checkins")
    const checkIns = existingData ? JSON.parse(existingData) : []
    checkIns.push(checkInEntry)
    localStorage.setItem("checkins", JSON.stringify(checkIns))

    toast({
      title: "Check-in simulado!",
      description: "O check-in foi registrado. Recarregue a página para ver os dados agregados atualizados.",
    })

    setIsSimulateCheckInOpen(false)
    setSimulateCheckIn({ mood: 0, anxiety: 0, sleep: 0, notes: "" })

    // Reload page to show new data
    window.location.reload()
  }

  const tooltipConfig = {
    "simulate-checkin-empresa": {
      title: "Simular Check-in de Colaborador",
      description:
        "Teste como os check-ins dos colaboradores afetam os dados agregados. Lembre-se: todos os dados são anônimos e você só vê médias gerais, nunca respostas individuais.",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
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

            <div className="flex items-center gap-2">
              <Link href="/" className="hidden md:block">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-background z-40 md:hidden p-4 space-y-3 overflow-y-auto">
          <ContextualTooltip id="simulate-checkin-empresa" config={tooltipConfig}>
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
              size="lg"
              onClick={() => {
                setIsSimulateCheckInOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              <Activity className="w-5 h-5 mr-3" />
              Simular Check-in
            </Button>
          </ContextualTooltip>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <ArrowLeft className="w-5 h-5 mr-3" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Dashboard Corporativo</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Visão agregada de saúde mental - Dados anônimos e coletivos
              </p>
            </div>

            <div className="hidden md:flex justify-end">
              <ContextualTooltip id="simulate-checkin-empresa" config={tooltipConfig}>
                <Dialog open={isSimulateCheckInOpen} onOpenChange={setIsSimulateCheckInOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <Activity className="w-5 h-5 mr-2" />
                      Simular Check-in de Colaborador
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Simular Check-in Anônimo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <Label>Como está seu humor hoje?</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => setSimulateCheckIn({ ...simulateCheckIn, mood: value })}
                              className={`py-4 md:py-6 rounded-lg border-2 transition-all ${
                                simulateCheckIn.mood === value
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="text-xl md:text-2xl font-bold mb-1">{value}</div>
                              <div className="text-[10px] md:text-xs leading-tight">
                                {value === 1 && "Muito mal"}
                                {value === 2 && "Mal"}
                                {value === 3 && "Ok"}
                                {value === 4 && "Bem"}
                                {value === 5 && "Muito bem"}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Nível de ansiedade hoje?</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => setSimulateCheckIn({ ...simulateCheckIn, anxiety: value })}
                              className={`py-4 md:py-6 rounded-lg border-2 transition-all ${
                                simulateCheckIn.anxiety === value
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="text-xl md:text-2xl font-bold mb-1">{value}</div>
                              <div className="text-[10px] md:text-xs leading-tight">
                                {value === 1 && "Nenhuma"}
                                {value === 2 && "Baixa"}
                                {value === 3 && "Média"}
                                {value === 4 && "Alta"}
                                {value === 5 && "Muito alta"}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Como foi seu sono?</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => setSimulateCheckIn({ ...simulateCheckIn, sleep: value })}
                              className={`py-4 md:py-6 rounded-lg border-2 transition-all ${
                                simulateCheckIn.sleep === value
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="text-xl md:text-2xl font-bold mb-1">{value}</div>
                              <div className="text-[10px] md:text-xs leading-tight">
                                {value === 1 && "Muito mal"}
                                {value === 2 && "Mal"}
                                {value === 3 && "Ok"}
                                {value === 4 && "Bom"}
                                {value === 5 && "Muito bom"}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="simulate-notes">Observações (opcional)</Label>
                        <Textarea
                          id="simulate-notes"
                          placeholder="Adicione observações sobre como está se sentindo..."
                          value={simulateCheckIn.notes}
                          onChange={(e) => setSimulateCheckIn({ ...simulateCheckIn, notes: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <Button className="w-full" size="lg" onClick={handleSimulateCheckIn}>
                        Simular e Ver Dados Agregados
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </ContextualTooltip>
            </div>
          </div>

          {/* Indicadores Agregados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Colaboradores</p>
                  <p className="text-3xl font-bold">{aggregatedData.totalCollaborators}</p>
                </div>
                <Users className="w-10 h-10 text-primary" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engajamento</p>
                  <p className="text-3xl font-bold">{aggregatedData.engagement}%</p>
                </div>
                <Activity className="w-10 h-10 text-primary" />
              </div>
            </Card>
            <Card className="p-6 border-yellow-200 bg-yellow-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Atenção</p>
                  <p className="text-3xl font-bold text-yellow-600">{aggregatedData.attention}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tendência Geral</p>
                  <p className="text-3xl font-bold text-green-600">↑</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Tendências Emocionais Gerais */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Tendências Emocionais Coletivas</h2>
            </div>
            <p className="text-sm text-muted-foreground">Dados agregados e anônimos dos últimos 30 dias</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Humor Médio
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-4xl font-bold text-primary mb-2">{aggregatedData.avgMood}</div>
                  <p className="text-sm text-muted-foreground">de 5.0 - Estável</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Nível de Ansiedade
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{aggregatedData.avgAnxiety}</div>
                  <p className="text-sm text-muted-foreground">de 5.0 - Moderado</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Moon className="w-5 h-5 text-primary" />
                  Qualidade do Sono
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{aggregatedData.avgSleep}</div>
                  <p className="text-sm text-muted-foreground">de 5.0 - Bom</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Alertas Coletivos */}
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Alertas e Recomendações</h2>

            <div className="space-y-4">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-yellow-600">Aumento de casos com padrão de atenção</h3>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      Identificamos um aumento de 15% nos indicadores de ansiedade entre colaboradores nas últimas 2
                      semanas. Recomendamos:
                    </p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1 ml-2">
                      <li>Avaliar sobrecarga de trabalho</li>
                      <li>Oferecer sessões de mindfulness</li>
                      <li>Reforçar comunicação sobre recursos de apoio</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-600">Engajamento em jornadas de cuidado em alta</h3>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      87% dos colaboradores completaram pelo menos uma jornada de cuidado este mês. Continue
                      incentivando a participação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Indicadores de Risco Psicossocial */}
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Indicadores de Risco Psicossocial</h2>
            <p className="text-sm text-muted-foreground">
              Análise baseada em padrões coletivos - sem identificação individual
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sobrecarga de trabalho</span>
                  <span className="text-sm text-muted-foreground">Moderado</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Relacionamento interpessoal</span>
                  <span className="text-sm text-muted-foreground">Baixo</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Equilíbrio vida-trabalho</span>
                  <span className="text-sm text-muted-foreground">Moderado</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "55%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ambiente organizacional</span>
                  <span className="text-sm text-muted-foreground">Baixo</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-muted/50 rounded-xl p-6 border-2 border-muted">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Nota sobre privacidade:</strong> Todos os dados apresentados são agregados e anônimos. Não é
              possível identificar colaboradores individuais. As recomendações são informativas e a decisão de ação cabe
              à gestão de RH e saúde ocupacional.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
