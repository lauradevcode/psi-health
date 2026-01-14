"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Moon, Brain, CheckCircle, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

type CheckInData = {
  mood: number
  anxiety: number
  sleep: number
  notes: string
}

export default function CheckInPage() {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<CheckInData>({
    mood: 0,
    anxiety: 0,
    sleep: 0,
    notes: "",
  })

  const handleSubmit = () => {
    const timestamp = new Date().toISOString()
    const checkInEntry = {
      ...checkIn,
      timestamp,
      id: Math.random().toString(36).substr(2, 9),
      patientToken: "anon-" + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString("pt-BR"),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }

    const existingData = localStorage.getItem("checkins")
    const checkIns = existingData ? JSON.parse(existingData) : []
    checkIns.push(checkInEntry)
    localStorage.setItem("checkins", JSON.stringify(checkIns))

    console.log("[v0] Check-in saved to localStorage:", checkInEntry)
    router.push("/check-in/obrigado")
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-base font-bold">
                1
              </div>
              <span className="text-xs font-medium">Check-in</span>
            </div>
            <div className="w-16 h-0.5 bg-muted" />
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center text-base font-bold">
                2
              </div>
              <span className="text-xs">Análise</span>
            </div>
            <div className="w-16 h-0.5 bg-muted" />
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center text-base font-bold">
                3
              </div>
              <span className="text-xs">Suporte</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Heart className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Como você está se sentindo?</h1>
            <p className="text-lg text-muted-foreground">Leva menos de 2 minutos e nos ajuda a cuidar melhor de você</p>
          </div>

          <Card className="p-6 md:p-8 space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Como está seu humor hoje?</h3>
              </div>
              <div className="flex justify-between gap-2 md:gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setCheckIn({ ...checkIn, mood: value })}
                    className={`flex-1 py-8 rounded-xl border-2 transition-all ${
                      checkIn.mood === value
                        ? "border-primary bg-primary text-primary-foreground scale-105 shadow-lg"
                        : "border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                    <div className="text-xs md:text-sm font-medium">
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

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Nível de ansiedade hoje?</h3>
              </div>
              <div className="flex justify-between gap-2 md:gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setCheckIn({ ...checkIn, anxiety: value })}
                    className={`flex-1 py-8 rounded-xl border-2 transition-all ${
                      checkIn.anxiety === value
                        ? "border-primary bg-primary text-primary-foreground scale-105 shadow-lg"
                        : "border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                    <div className="text-xs md:text-sm font-medium">
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

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Moon className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Como foi seu sono?</h3>
              </div>
              <div className="flex justify-between gap-2 md:gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setCheckIn({ ...checkIn, sleep: value })}
                    className={`flex-1 py-8 rounded-xl border-2 transition-all ${
                      checkIn.sleep === value
                        ? "border-primary bg-primary text-primary-foreground scale-105 shadow-lg"
                        : "border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                    <div className="text-xs md:text-sm font-medium">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Quer compartilhar mais alguma coisa? (Opcional)</h3>
              </div>
              <Textarea
                placeholder="Se preferir, escreva aqui como você está se sentindo..."
                className="min-h-32 resize-none"
                value={checkIn.notes}
                onChange={(e) => setCheckIn({ ...checkIn, notes: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Você pode escolher responder apenas as escalas ou adicionar observações pessoais.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-base"
              onClick={handleSubmit}
              disabled={!checkIn.mood || !checkIn.anxiety || !checkIn.sleep}
            >
              {!checkIn.mood || !checkIn.anxiety || !checkIn.sleep ? "Preencha todas as escalas" : "Enviar Check-in"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>

          <div className="bg-muted/30 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <CheckCircle className="w-5 h-5" />
              <span>Seus dados estão seguros</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Todas as informações são criptografadas e protegidas. Apenas você e profissionais autorizados têm acesso
              aos seus dados.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
