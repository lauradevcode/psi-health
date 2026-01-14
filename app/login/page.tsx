"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Lock, Phone, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupCrp, setSignupCrp] = useState("")
  const [userType, setUserType] = useState<"psicologo" | "admin">("psicologo")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "signup") {
      setActiveTab("signup")
    }
  }, [searchParams])

  const handleLogin = async () => {
    setIsLoading(true)
    console.log("[v0] Login attempt:", { email: loginEmail, userType })

    try {
      if (loginEmail.toLowerCase() === "admin@psihealth.com" && loginPassword.toLowerCase() === "admin123") {
        console.log("[v0] Admin login detected")
        localStorage.setItem("userType", "admin")
        localStorage.setItem("userEmail", loginEmail)
        localStorage.setItem("userName", "Administrador")
        localStorage.setItem("isAuthenticated", "true")

        toast({
          title: "Admin login bem-sucedido!",
          description: "Redirecionando para o painel administrativo...",
        })

        window.location.replace("/painel-admin")
        return
      }

      if (loginEmail.toLowerCase() === "psicologo@demo.com" && loginPassword.toLowerCase() === "demo123") {
        console.log("[v0] Demo psychologist login detected")
        localStorage.setItem("userType", "psicologo")
        localStorage.setItem("userEmail", loginEmail)
        localStorage.setItem("userName", "Psicólogo Demo")
        localStorage.setItem("psychologistId", "demo-id")
        localStorage.setItem("isAuthenticated", "true")

        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao painel do psicólogo!",
        })

        window.location.replace("/painel-psicologo")
        return
      }

      console.log("[v0] Attempting Supabase authentication...")
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (error) {
        throw new Error("Email ou senha incorretos. Verifique suas credenciais e tente novamente.")
      }

      if (!data.user) {
        throw new Error("Erro ao autenticar. Tente novamente.")
      }

      const { data: psychologistData, error: psychologistError } = await supabase
        .from("psychologists")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (psychologistError) {
        console.log("[v0] Psychologist not found in database, creating profile...")

        const { error: insertError } = await supabase.from("psychologists").insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || "Psicólogo",
            phone: data.user.user_metadata?.phone || "",
            crp: data.user.user_metadata?.crp || "",
            is_active: true,
          },
        ])

        if (insertError) {
          console.error("[v0] Error creating psychologist profile:", insertError)
        }
      }

      localStorage.setItem("userType", "psicologo")
      localStorage.setItem("userEmail", data.user.email || "")
      localStorage.setItem("userName", psychologistData?.name || data.user.user_metadata?.name || "Psicólogo")
      localStorage.setItem("psychologistId", data.user.id)
      localStorage.setItem("isAuthenticated", "true")

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${psychologistData?.name || data.user.user_metadata?.name || "Psicólogo"}!`,
      })

      window.location.replace("/painel-psicologo")
    } catch (error: any) {
      console.error("[v0] Login error:", error)
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e senha.",
        variant: "destructive",
      })
      return
    }

    if (signupPassword.length < 6) {
      toast({
        title: "Senha inválida",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log("[v0] Signup attempt:", { name: signupName, email: signupEmail })

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/painel-psicologo`,
          data: {
            name: signupName,
            phone: signupPhone,
            crp: signupCrp,
          },
        },
      })

      if (error) {
        if (error.message.includes("already registered")) {
          throw new Error("Este email já está cadastrado. Faça login.")
        }
        throw error
      }

      if (!data.user) {
        throw new Error("Erro ao criar conta. Tente novamente.")
      }

      const { error: insertError } = await supabase.from("psychologists").insert([
        {
          id: data.user.id,
          email: signupEmail,
          name: signupName,
          phone: signupPhone,
          crp: signupCrp,
          is_active: true,
        },
      ])

      if (insertError) {
        console.error("[v0] Error creating psychologist profile:", insertError)
        // Não falhar o cadastro se o perfil já existe
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login com suas credenciais.",
      })

      setSignupName("")
      setSignupEmail("")
      setSignupPassword("")
      setSignupPhone("")
      setSignupCrp("")
      setActiveTab("login")
      setLoginEmail(signupEmail)
    } catch (error: any) {
      console.error("[v0] Signup error:", error)
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Acesse sua conta</h1>
            <p className="text-muted-foreground text-lg">Gestão integrada de saúde mental</p>
          </div>

          <Card className="p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="text-base">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-base">
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setUserType("psicologo")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === "psicologo" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold text-sm">Psicólogo</div>
                  </button>
                  <button
                    onClick={() => setUserType("admin")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === "admin" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold text-sm">Admin</div>
                  </button>
                </div>

                {userType === "admin" && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Credenciais de Acesso
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>
                        <strong className="text-foreground">Admin:</strong> admin@psihealth.com / admin123
                      </div>
                      <div>
                        <strong className="text-foreground">Demo:</strong> psicologo@demo.com / demo123
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10 h-12"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-border" />
                      <span className="text-muted-foreground">Lembrar de mim</span>
                    </label>
                    <Link href="#" className="text-primary hover:underline">
                      Esqueci minha senha
                    </Link>
                  </div>
                </div>

                <Button size="lg" className="w-full h-12 text-base" onClick={handleLogin} disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar na Plataforma"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Cadastro para Psicólogos</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Crie sua conta para gerenciar pacientes e acompanhar jornadas terapêuticas
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="João Silva"
                        className="pl-10 h-12"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-crp">CRP</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-crp"
                        type="text"
                        placeholder="CRP XX/XXXXX"
                        className="pl-10 h-12"
                        value={signupCrp}
                        onChange={(e) => setSignupCrp(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10 h-12"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className="pl-10 h-12"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" className="w-4 h-4 mt-1 rounded border-border" required />
                    <p className="text-sm text-muted-foreground">
                      Concordo com os{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Política de Privacidade
                      </Link>
                    </p>
                  </div>
                </div>

                <Button size="lg" className="w-full h-12 text-base" onClick={handleSignup} disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="text-center mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Pacientes:</strong> Vocês não precisam criar conta. Receberão um link único via WhatsApp para
              fazer o check-in.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
