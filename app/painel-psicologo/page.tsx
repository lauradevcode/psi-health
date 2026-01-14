"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Minus,
  Bell,
  AlertTriangle,
  User,
  Heart,
  Brain,
  Moon,
  Send,
  UserPlus,
  Activity,
  Menu,
  X,
  Calendar,
  MessageSquare,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Patient = {
  id: string
  name: string
  status: "risk" | "stable" | "attention"
  lastCheckIn: string
  trend: "up" | "down" | "stable"
  data: {
    mood: number[]
    anxiety: number[]
    sleep: number[]
    dates?: string[]
  }
  notes?: string
  checkInHistory?: Array<{
    date: string
    time: string
    mood: number
    anxiety: number
    sleep: number
    notes?: string
  }>
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Ana Silva",
    status: "risk",
    lastCheckIn: "Hoje às 14:30",
    trend: "down",
    data: {
      mood: [4, 3, 2, 2, 1],
      anxiety: [2, 3, 4, 4, 5],
      sleep: [3, 2, 2, 1, 1],
    },
  },
  {
    id: "2",
    name: "Carlos Mendes",
    status: "attention",
    lastCheckIn: "Hoje às 10:15",
    trend: "down",
    data: {
      mood: [4, 4, 3, 3, 2],
      anxiety: [2, 2, 3, 3, 4],
      sleep: [4, 3, 3, 2, 2],
    },
  },
  {
    id: "3",
    name: "Marina Costa",
    status: "stable",
    lastCheckIn: "Ontem às 19:00",
    trend: "up",
    data: {
      mood: [3, 3, 4, 4, 5],
      anxiety: [3, 3, 2, 2, 1],
      sleep: [3, 4, 4, 5, 5],
    },
  },
]

export default function PainelPsicologoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)
  const [isSimulateCheckInOpen, setIsSimulateCheckInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)
  const [newPatientName, setNewPatientName] = useState("")
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [checkIns, setCheckIns] = useState<any[]>([])
  const [isWhatsAppBotDemoOpen, setIsWhatsAppBotDemoOpen] = useState(false)
  const [botMessages, setBotMessages] = useState<
    Array<{ id: string; sender: "bot" | "user"; text: string; options?: string[] }>
  >([
    {
      id: "1",
      sender: "bot",
      text: "Olá! 👋 Sou o assistente da Psi Health. Como posso ajudar você hoje?",
      options: ["Fazer check-in emocional", "Falar com psicólogo", "Ver minha evolução", "Agendar consulta"],
    },
  ])
  const [selectedBotOption, setSelectedBotOption] = useState<string | null>(null)

  const [simulateCheckIn, setSimulateCheckIn] = useState({
    mood: 0,
    anxiety: 0,
    sleep: 0,
    notes: "",
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userType = localStorage.getItem("userType")

    console.log("[v0] Psychologist panel auth check:", { userType, isAuthenticated })

    if (!isAuthenticated || isAuthenticated !== "true") {
      console.log("[v0] Not authenticated, redirecting to login")
      router.replace("/login")
      return
    }

    if (userType === "admin") {
      console.log("[v0] Admin detected, redirecting to admin panel")
      router.replace("/painel-admin")
      return
    }

    const userEmail = localStorage.getItem("userEmail")
    if (userEmail) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const updatedUsers = registeredUsers.map((u: any) => {
        if (u.email === userEmail && u.type === "psicologo") {
          return { ...u, lastAccess: new Date().toISOString() }
        }
        return u
      })
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
    }

    const storedCheckIns = localStorage.getItem("checkins")
    if (storedCheckIns) {
      const parsedCheckIns = JSON.parse(storedCheckIns)
      setCheckIns(parsedCheckIns)
      console.log("[v0] Loaded check-ins:", parsedCheckIns.length)

      const anonymousPatients = parsedCheckIns.map((checkIn: any, index: number) => {
        const avgMood = checkIn.mood
        const avgAnxiety = checkIn.anxiety
        const avgSleep = checkIn.sleep

        let status: "risk" | "stable" | "attention" = "stable"
        if (avgMood <= 2 || avgAnxiety >= 4) status = "risk"
        else if (avgMood === 3 || avgAnxiety === 3) status = "attention"

        let trend: "up" | "down" | "stable" = "stable"
        if (avgMood <= 2) trend = "down"
        else if (avgMood >= 4) trend = "up"

        return {
          id: checkIn.id || `anon-${index}`,
          name: `Paciente Anônimo #${index + 1}`,
          status,
          lastCheckIn: `${checkIn.date || "Hoje"} às ${checkIn.time || "agora"}`,
          trend,
          notes: checkIn.notes || "",
          data: {
            mood: [avgMood],
            anxiety: [avgAnxiety],
            sleep: [avgSleep],
          },
        }
      })

      setPatients([...anonymousPatients, ...mockPatients])
    }
  }, [router])

  const handleAddPatient = () => {
    toast({
      title: "Paciente cadastrado!",
      description: `${newPatientName} foi adicionado à sua lista.`,
    })
    setIsAddPatientOpen(false)
    setNewPatientName("")
  }

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
      description: "O check-in foi registrado. Recarregue a página para ver os dados atualizados.",
    })

    setIsSimulateCheckInOpen(false)
    setSimulateCheckIn({ mood: 0, anxiety: 0, sleep: 0, notes: "" })

    window.location.reload()
  }

  const handleSendJourneyLink = () => {
    toast({
      title: "Link enviado!",
      description: "O link da jornada foi enviado para o paciente via WhatsApp.",
    })
    setSelectedPatient(null)
  }

  const handleSendCheckIn = () => {
    toast({
      title: "Check-in enviado!",
      description: "Link de check-in enviado para o paciente via WhatsApp.",
    })
  }

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter((p) => p.id !== patientId))
    toast({
      title: "Paciente removido",
      description: "O paciente foi removido da sua lista.",
    })
    setIsPatientModalOpen(false)
    setSelectedPatient(null)
  }

  const getStatusColor = (status: string) => {
    if (status === "risk") return "text-red-600 bg-red-50 border-red-200"
    if (status === "attention") return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getStatusLabel = (status: string) => {
    if (status === "risk") return "Risco"
    if (status === "attention") return "Atenção"
    return "Estável"
  }

  const tooltipConfig = {
    "simulate-checkin": {
      title: "Simular Check-in",
      description:
        "Use esta função para testar como os check-ins funcionam. As respostas aparecerão no seu dashboard e você verá como os alertas são gerados.",
    },
    "add-patient": {
      title: "Cadastrar Paciente",
      description:
        "Cadastre um novo paciente na plataforma. Você receberá um link único para enviar via WhatsApp, permitindo que ele faça check-ins sem precisar de login.",
    },
  }

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return "😔"
    if (mood === 3) return "😐"
    if (mood === 4) return "🙂"
    return "😊"
  }

  const calculateAverage = (values: number[]) => {
    if (values.length === 0) return 0
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
  }

  const renderMoodTimeline = (patient: Patient) => {
    const maxValue = 5
    const moodData = patient.data.mood.slice(-7) // Last 7 entries

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Evolução do Humor (últimos 7 dias)</h4>
          <span className="text-xs text-muted-foreground">Escala de 1 a 5</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-32 border-b border-l border-muted pb-2 pl-2">
          {moodData.map((value, index) => {
            const heightPercent = (value / maxValue) * 100
            const color = value <= 2 ? "bg-red-500" : value === 3 ? "bg-yellow-500" : "bg-green-500"

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full group">
                  <div
                    className={`w-full ${color} rounded-t transition-all hover:opacity-80`}
                    style={{ height: `${Math.max(heightPercent, 10)}%`, minHeight: "8px" }}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {value}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground mt-auto">
                  {patient.data.dates?.[index] || `D${index + 1}`}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>Mais antigo</span>
          <span>Mais recente</span>
        </div>
      </div>
    )
  }

  const handleBotOptionClick = (option: string) => {
    setSelectedBotOption(option)

    const userMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: option,
    }
    setBotMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      let botResponse

      if (option === "Fazer check-in emocional") {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot" as const,
          text: "Ótimo! Vamos fazer um check-in rápido. Como você avaliaria seu humor hoje de 1 a 5? (1 = muito mal, 5 = muito bem)",
          options: ["1", "2", "3", "4", "5"],
        }
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot" as const,
          text: "Obrigado pela sua resposta! O que mais posso fazer por você?",
          options: ["Fazer check-in emocional", "Falar com psicólogo", "Ver minha evolução"],
        }
      }

      setBotMessages((prev) => [...prev, botResponse])
      setSelectedBotOption(null)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <Button
            className="w-full justify-start"
            size="lg"
            onClick={() => {
              setIsAddPatientOpen(true)
              setIsMobileMenuOpen(false)
            }}
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Cadastrar Paciente
          </Button>
          <Button
            className="w-full justify-start"
            size="lg"
            onClick={() => {
              setIsWhatsAppBotDemoOpen(true)
              setIsMobileMenuOpen(false)
            }}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Demo Bot WhatsApp
          </Button>
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Dashboard do Psicólogo</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Acompanhe jornadas terapêuticas e receba alertas de cuidado
              </p>
            </div>

            <div className="hidden md:flex gap-3">
              <Dialog open={isSimulateCheckInOpen} onOpenChange={setIsSimulateCheckInOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Activity className="w-5 h-5 mr-2" />
                    Simular Check-in
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Simular Check-in de Paciente</DialogTitle>
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
                      Simular e Ver Resultados no Painel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Cadastrar Paciente
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Nome do Paciente ou Código Interno</Label>
                      <Input
                        id="patient-name"
                        placeholder="Ex: Maria Silva ou Paciente #123"
                        value={newPatientName}
                        onChange={(e) => setNewPatientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">WhatsApp (opcional)</Label>
                      <Input id="patient-phone" type="tel" placeholder="(11) 99999-9999" />
                    </div>
                    <Button className="w-full" onClick={handleAddPatient}>
                      Cadastrar e Gerar Link de Check-in
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isWhatsAppBotDemoOpen} onOpenChange={setIsWhatsAppBotDemoOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Demo Bot WhatsApp
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Simulação Bot WhatsApp</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Veja como nosso assistente automatizado funciona no WhatsApp para seus pacientes
                    </p>
                    <div className="bg-[#e5ddd5] p-4 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto space-y-3">
                      {botMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user" ? "bg-[#dcf8c6]" : "bg-white shadow"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            {message.options && (
                              <div className="mt-3 space-y-2">
                                {message.options.map((option, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleBotOptionClick(option)}
                                    disabled={selectedBotOption !== null}
                                    className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition text-sm font-medium disabled:opacity-50"
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground">
                      <p>
                        💡 <strong>Demonstração:</strong> Este é um exemplo de como o bot funciona no WhatsApp real. Ele
                        responde automaticamente aos check-ins e direciona para profissionais quando necessário.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Alerts Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Card className="p-6 border-red-200 bg-red-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertas Urgentes</p>
                  <p className="text-3xl font-bold text-red-600">1</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </Card>
            <Card className="p-6 border-yellow-200 bg-yellow-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Precisam Atenção</p>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </div>
                <Bell className="w-10 h-10 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-6 border-green-200 bg-green-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pacientes Estáveis</p>
                  <p className="text-3xl font-bold text-green-600">1</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Patients List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold">Seus Pacientes</h2>
            </div>
            <div className="grid gap-4">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className="p-4 md:p-6 cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
                  onClick={() => {
                    setSelectedPatient(patient)
                    setIsPatientModalOpen(true)
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base md:text-lg">{patient.name}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">{patient.lastCheckIn}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(patient.status)}`}
                        >
                          {getStatusLabel(patient.status)}
                        </div>
                        {patient.trend === "up" && <TrendingUp className="w-5 h-5 text-green-600" />}
                        {patient.trend === "down" && <TrendingDown className="w-5 h-5 text-red-600" />}
                        {patient.trend === "stable" && <Minus className="w-5 h-5 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Mini mood chart preview */}
                    <div className="flex items-center gap-6 pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Humor:</span>
                        <span className="text-lg font-bold">
                          {getMoodEmoji(patient.data.mood[patient.data.mood.length - 1])}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {patient.data.mood[patient.data.mood.length - 1]}/5
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Ansiedade:</span>
                        <span className="text-sm font-bold">
                          {patient.data.anxiety[patient.data.anxiety.length - 1]}/5
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Sono:</span>
                        <span className="text-sm font-bold">{patient.data.sleep[patient.data.sleep.length - 1]}/5</span>
                      </div>
                    </div>

                    {/* Mini bar chart for mood trend */}
                    <div className="flex items-end gap-1 h-8">
                      {patient.data.mood.slice(-7).map((value, index) => {
                        const heightPercent = (value / 5) * 100
                        const color = value <= 2 ? "bg-red-500" : value === 3 ? "bg-yellow-500" : "bg-green-500"
                        return (
                          <div
                            key={index}
                            className={`flex-1 ${color} rounded-t transition-all`}
                            style={{ height: `${Math.max(heightPercent, 15)}%` }}
                          />
                        )
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isPatientModalOpen} onOpenChange={setIsPatientModalOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPatient && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <User className="w-6 h-6" />
                  {selectedPatient.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Status Overview */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status Atual</p>
                      <div
                        className={`inline-block px-4 py-2 rounded-full border text-sm font-medium mt-2 ${getStatusColor(selectedPatient.status)}`}
                      >
                        {getStatusLabel(selectedPatient.status)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Último Check-in</p>
                      <p className="font-semibold mt-1">{selectedPatient.lastCheckIn}</p>
                    </div>
                  </div>
                </Card>

                {/* Mood Timeline Graph */}
                <Card className="p-6">{renderMoodTimeline(selectedPatient)}</Card>

                {/* Current Metrics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Humor</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          {selectedPatient.data.mood[selectedPatient.data.mood.length - 1]}
                        </span>
                        <span className="text-muted-foreground text-sm">/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Média: {calculateAverage(selectedPatient.data.mood)}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Ansiedade</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          {selectedPatient.data.anxiety[selectedPatient.data.anxiety.length - 1]}
                        </span>
                        <span className="text-muted-foreground text-sm">/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Média: {calculateAverage(selectedPatient.data.anxiety)}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Moon className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Qualidade do Sono</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          {selectedPatient.data.sleep[selectedPatient.data.sleep.length - 1]}
                        </span>
                        <span className="text-muted-foreground text-sm">/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Média: {calculateAverage(selectedPatient.data.sleep)}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Check-in History */}
                {selectedPatient.checkInHistory && selectedPatient.checkInHistory.length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Histórico de Check-ins
                    </h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedPatient.checkInHistory.map((entry, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/30 border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {entry.date} às {entry.time}
                            </span>
                            <div className="flex gap-2 text-xs">
                              <span className="px-2 py-1 rounded bg-background">😊 {entry.mood}</span>
                              <span className="px-2 py-1 rounded bg-background">🧠 {entry.anxiety}</span>
                              <span className="px-2 py-1 rounded bg-background">🌙 {entry.sleep}</span>
                            </div>
                          </div>
                          {entry.notes && <p className="text-sm text-muted-foreground italic">{entry.notes}</p>}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Notes */}
                {selectedPatient.notes && (
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Observações do Paciente
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedPatient.notes}</p>
                  </Card>
                )}

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    onClick={() => {
                      handleSendJourneyLink()
                      setIsPatientModalOpen(false)
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Jornada Terapêutica
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleSendCheckIn}>
                    <Activity className="w-4 h-4 mr-2" />
                    Enviar Link de Check-in
                  </Button>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDeletePatient(selectedPatient.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remover Paciente
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
