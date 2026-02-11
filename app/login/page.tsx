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

interface RegisteredUser {
  id: string
  name: string
  email: string
  password: string
  phone: string
  crp: string
  type: "psicologo" | "admin"
  createdAt: string
}

function getRegisteredUsers(): RegisteredUser[] {
  try {
    return JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  } catch {
    return []
  }
}

function saveRegisteredUsers(users: RegisteredUser[]) {
  localStorage.setItem("registeredUsers", JSON.stringify(users))
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

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
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha email e senha.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Admin fixo
      if (loginEmail.toLowerCase() === "admin@psihealth.com" && loginPassword === "admin123") {
        localStorage.setItem("userType", "admin")
        localStorage.setItem("userEmail", loginEmail)
        localStorage.setItem("userName", "Administrador")
        localStorage.setItem("isAuthenticated", "true")

        toast({
          title: "Login admin bem-sucedido!",
          description: "Redirecionando para o painel administrativo...",
        })

        router.push("/painel-admin")
        return
      }

      // Demo psicólogo fixo
      if (loginEmail.toLowerCase() === "psicologo@demo.com" && loginPassword === "demo123") {
        localStorage.setItem("userType", "psicologo")
        localStorage.setItem("userEmail", loginEmail)
        localStorage.setItem("userName", "Psicólogo Demo")
        localStorage.setItem("psychologistId", "demo-id")
        localStorage.setItem("isAuthenticated", "true")

        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao painel do psicólogo!",
        })

        router.push("/painel-psicologo")
        return
      }

      // Buscar nos usuários cadastrados localmente
      const users = getRegisteredUsers()
      const user = users.find(
        (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword,
      )

      if (!user) {
        throw new Error("Email ou senha incorretos. Verifique suas credenciais ou crie uma conta.")
      }

      localStorage.setItem("userType", user.type)
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userName", user.name)
      localStorage.setItem("psychologistId", user.id)
      localStorage.setItem("isAuthenticated", "true")

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${user.name}!`,
      })

      if (user.type === "admin") {
        router.push("/painel-admin")
      } else {
        router.push("/painel-psicologo")
      }
    } catch (error: any) {
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

    try {
      const users = getRegisteredUsers()

      // Verificar se email já existe
      if (users.some((u) => u.email.toLowerCase() === signupEmail.toLowerCase())) {
        throw new Error("Este email já está cadastrado. Faça login.")
      }

      const newUser: RegisteredUser = {
        id: `psy-${Date.now()}`,
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
        crp: signupCrp,
        type: "psicologo",
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      saveRegisteredUsers(users)

      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login com suas credenciais.",
      })

      // Logar automaticamente após cadastro
      localStorage.setItem("userType", "psicologo")
      localStorage.setItem("userEmail", newUser.email)
      localStorage.setItem("userName", newUser.name)
      localStorage.setItem("psychologistId", newUser.id)
      localStorage.setItem("isAuthenticated", "true")

      router.push("/painel-psicologo")
    } catch (error: any) {
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
