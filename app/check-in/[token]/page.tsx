"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Heart, Brain, Moon, MessageSquare, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function CheckInTokenPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [mood, setMood] = useState<number | null>(null)
  const [anxiety, setAnxiety] = useState<number | null>(null)
  const [sleep, setSleep] = useState<number | null>(null)
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    toast({
      title: "Check-in enviado com sucesso!",
      description: "Suas respostas foram registradas. Obrigado pela participação.",
    })

    setTimeout(() => {
      router.push("/check-in/obrigado")
    }, 1500)
  }

  const renderScale = (
    value: number | null,
    setValue: (val: number) => void,
    icon: React.ReactNode,
    title: string,
    lowLabel: string,
    highLabel: string,
  ) => (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setValue(num)}
                className={`h-20 rounded-xl text-2xl font-bold transition-all ${
                  value === num
                    ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                    : "bg-muted hover:bg-muted/80 hover:scale-105"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground px-1">
            <span>{lowLabel}</span>
            <span>{highLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  )

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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">Check-in Emocional</h1>
            <p className="text-muted-foreground text-lg">
              Como você está se sentindo hoje? Suas respostas ajudam no seu acompanhamento.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 4 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>

          {step === 1 &&
            renderScale(
              mood,
              (val) => {
                setMood(val)
                setTimeout(() => setStep(2), 300)
              },
              <Heart className="w-8 h-8 text-primary" />,
              "Como está seu humor hoje?",
              "Muito baixo",
              "Muito alto",
            )}

          {step === 2 && (
            <>
              <Button variant="ghost" onClick={() => setStep(1)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              {renderScale(
                anxiety,
                (val) => {
                  setAnxiety(val)
                  setTimeout(() => setStep(3), 300)
                },
                <Brain className="w-8 h-8 text-primary" />,
                "Qual seu nível de ansiedade?",
                "Muito baixo",
                "Muito alto",
              )}
            </>
          )}

          {step === 3 && (
            <>
              <Button variant="ghost" onClick={() => setStep(2)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              {renderScale(
                sleep,
                (val) => {
                  setSleep(val)
                  setTimeout(() => setStep(4), 300)
                },
                <Moon className="w-8 h-8 text-primary" />,
                "Como foi seu sono?",
                "Muito ruim",
                "Excelente",
              )}
            </>
          )}

          {step === 4 && (
            <>
              <Button variant="ghost" onClick={() => setStep(3)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Quer compartilhar algo? (opcional)</h3>
                </div>
                <Textarea
                  placeholder="Escreva aqui se preferir compartilhar algo sobre como está se sentindo..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  className="text-base"
                />
                <Button size="lg" className="w-full h-14 text-lg" onClick={handleSubmit}>
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Check-in
                </Button>
              </Card>
            </>
          )}

          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>Suas respostas são confidenciais e serão compartilhadas apenas com seu psicólogo.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
