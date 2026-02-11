"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Activity,
  TrendingUp,
  Calendar,
  Search,
  Download,
  Eye,
  Trash2,
  UserCheck,
  Clock,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Psychologist {
  id: string
  name: string
  email: string
  crp?: string
  phone?: string
  created_at: string
  last_login?: string
  patientsCount: number
  checkInsReceived: number
  is_active: boolean
}

interface PlatformStats {
  totalPsychologists: number
  activePsychologists: number
  totalPatients: number
  totalCheckIns: number
  checkInsToday: number
  checkInsWeek: number
}

// Dados simulados para demonstração
const mockPsychologists: Psychologist[] = [
  {
    id: "demo-id",
    name: "Psicólogo Demo",
    email: "psicologo@demo.com",
    crp: "CRP 06/12345",
    phone: "(11) 99999-0001",
    created_at: "2025-01-15T10:00:00Z",
    last_login: new Date().toISOString(),
    patientsCount: 3,
    checkInsReceived: 12,
    is_active: true,
  },
  {
    id: "psy-2",
    name: "Dra. Mariana Oliveira",
    email: "mariana@email.com",
    crp: "CRP 06/67890",
    phone: "(11) 99999-0002",
    created_at: "2025-02-20T14:00:00Z",
    last_login: "2025-12-10T08:00:00Z",
    patientsCount: 5,
    checkInsReceived: 28,
    is_active: true,
  },
  {
    id: "psy-3",
    name: "Dr. Ricardo Santos",
    email: "ricardo@email.com",
    crp: "CRP 01/11223",
    phone: "(61) 98888-0003",
    created_at: "2025-03-10T09:00:00Z",
    last_login: "2025-11-05T16:00:00Z",
    patientsCount: 2,
    checkInsReceived: 8,
    is_active: false,
  },
]

function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  } catch {
    return []
  }
}

export default function AdminPanel() {
  const router = useRouter()
  const { toast } = useToast()

  const [psychologists, setPsychologists] = useState<Psychologist[]>([])
  const [stats, setStats] = useState<PlatformStats>({
    totalPsychologists: 0,
    activePsychologists: 0,
    totalPatients: 0,
    totalCheckIns: 0,
    checkInsToday: 0,
    checkInsWeek: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = () => {
    const userType = localStorage.getItem("userType")
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (userType !== "admin" || isAuthenticated !== "true") {
      router.push("/login")
      return
    }

    loadAdminData()
    setIsLoading(false)
  }

  const loadAdminData = () => {
    // Combinar psicólogos mock + cadastrados localmente
    const registeredUsers = getRegisteredUsers()
    const registeredPsychologists: Psychologist[] = registeredUsers
      .filter((u: any) => u.type === "psicologo")
      .map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        crp: u.crp || "",
        phone: u.phone || "",
        created_at: u.createdAt || new Date().toISOString(),
        last_login: u.lastAccess || undefined,
        patientsCount: 0,
        checkInsReceived: 0,
        is_active: true,
      }))

    const allPsychologists = [...mockPsychologists, ...registeredPsychologists]
    setPsychologists(allPsychologists)

    // Estatísticas simuladas
    const totalPatients = allPsychologists.reduce((sum, p) => sum + p.patientsCount, 0)
    const totalCheckIns = allPsychologists.reduce((sum, p) => sum + p.checkInsReceived, 0)

    setStats({
      totalPsychologists: allPsychologists.length,
      activePsychologists: allPsychologists.filter((p) => p.is_active).length,
      totalPatients,
      totalCheckIns,
      checkInsToday: 4,
      checkInsWeek: 18,
    })
  }

  const filteredPsychologists = psychologists.filter(
    (psy) =>
      psy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psy.crp?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePsychologistStatus = (id: string) => {
    const psy = psychologists.find((p) => p.id === id)
    if (!psy) return

    setPsychologists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p)),
    )

    toast({
      title: "Status atualizado",
      description: `Psicólogo ${psy.is_active ? "desativado" : "ativado"} com sucesso.`,
    })
  }

  const deletePsychologist = (id: string) => {
    if (!confirm("Tem certeza que deseja remover este psicólogo? Esta ação não pode ser desfeita.")) {
      return
    }

    setPsychologists((prev) => prev.filter((p) => p.id !== id))

    toast({
      title: "Psicólogo removido",
      description: "O psicólogo foi removido com sucesso.",
    })
  }

  const exportData = () => {
    const data = {
      psychologists,
      stats,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `psihealth-admin-export-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("psychologistId")
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl z-50 shadow-sm sticky top-0">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo1.png" alt="Psi Health Logo" width={40} height={40} />
            <span className="text-xl md:text-2xl font-semibold">Psi Health Admin</span>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">Controle completo da plataforma Psi Health</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalPsychologists}</div>
            <div className="text-sm text-muted-foreground">Psicólogos Cadastrados</div>
            <div className="mt-2 text-xs text-primary">{stats.activePsychologists} ativos</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalPatients}</div>
            <div className="text-sm text-muted-foreground">Pacientes Cadastrados</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalCheckIns}</div>
            <div className="text-sm text-muted-foreground">Check-ins Realizados</div>
            <div className="mt-2 text-xs text-primary">{stats.checkInsToday} hoje</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">7 dias</span>
            </div>
            <div className="text-3xl font-bold">{stats.checkInsWeek}</div>
            <div className="text-sm text-muted-foreground">Check-ins esta semana</div>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="p-6">
          <Tabs defaultValue="psychologists" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="psychologists">Psicólogos</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            {/* Psychologists Tab */}
            <TabsContent value="psychologists" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou CRP..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={exportData} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>

              <div className="space-y-3">
                {filteredPsychologists.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum psicólogo encontrado</p>
                  </div>
                ) : (
                  filteredPsychologists.map((psy) => (
                    <Card key={psy.id} className="p-4">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{psy.name}</h3>
                            {psy.is_active ? (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Ativo</span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Inativo</span>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Email: {psy.email}</p>
                            {psy.crp && <p>CRP: {psy.crp}</p>}
                            {psy.phone && <p>Telefone: {psy.phone}</p>}
                            <p>Cadastro: {new Date(psy.created_at).toLocaleDateString("pt-BR")}</p>
                            {psy.last_login && (
                              <p>Último acesso: {new Date(psy.last_login).toLocaleDateString("pt-BR")}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 text-center">
                          <div className="text-2xl font-bold text-primary">{psy.patientsCount}</div>
                          <div className="text-xs text-muted-foreground">Pacientes</div>
                        </div>

                        <div className="flex flex-col gap-2 text-center">
                          <div className="text-2xl font-bold text-primary">{psy.checkInsReceived}</div>
                          <div className="text-xs text-muted-foreground">Check-ins</div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePsychologistStatus(psy.id)}
                            title={psy.is_active ? "Desativar" : "Ativar"}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deletePsychologist(psy.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Atividade Recente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Check-ins hoje</span>
                      <span className="font-semibold text-primary">{stats.checkInsToday}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Check-ins esta semana</span>
                      <span className="font-semibold text-primary">{stats.checkInsWeek}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Total de check-ins</span>
                      <span className="font-semibold text-primary">{stats.totalCheckIns}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Estatísticas Gerais
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Taxa de ativação</span>
                      <span className="font-semibold text-primary">
                        {stats.totalPsychologists > 0
                          ? Math.round((stats.activePsychologists / stats.totalPsychologists) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Média pacientes/psicólogo</span>
                      <span className="font-semibold text-primary">
                        {stats.totalPsychologists > 0 ? Math.round(stats.totalPatients / stats.totalPsychologists) : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Média check-ins/paciente</span>
                      <span className="font-semibold text-primary">
                        {stats.totalPatients > 0 ? Math.round(stats.totalCheckIns / stats.totalPatients) : 0}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Relatórios Personalizados</h3>
                <p className="text-muted-foreground mb-6">Gere relatórios detalhados sobre o uso da plataforma</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={exportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Todos os Dados
                  </Button>
                  <Button variant="outline" onClick={() => alert("Funcionalidade em desenvolvimento")}>
                    Relatório de Uso
                  </Button>
                  <Button variant="outline" onClick={() => alert("Funcionalidade em desenvolvimento")}>
                    Relatório de Engajamento
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
