-- Tabela de psicólogos
CREATE TABLE IF NOT EXISTS public.psychologists (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  crp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id UUID REFERENCES public.psychologists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birth_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de check-ins
CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  psychologist_id UUID REFERENCES public.psychologists(id) ON DELETE CASCADE,
  humor INTEGER NOT NULL CHECK (humor >= 1 AND humor <= 5),
  anxiety INTEGER NOT NULL CHECK (anxiety >= 1 AND anxiety <= 5),
  sleep INTEGER NOT NULL CHECK (sleep >= 1 AND humor <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de jornadas terapêuticas
CREATE TABLE IF NOT EXISTS public.journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id UUID REFERENCES public.psychologists(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL,
  whatsapp_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.psychologists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para psychologists
CREATE POLICY "Psychologists can view their own profile"
  ON public.psychologists FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Psychologists can update their own profile"
  ON public.psychologists FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all psychologists"
  ON public.psychologists FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'is_admin' = 'true'
    )
  );

-- Políticas RLS para patients
CREATE POLICY "Psychologists can view their own patients"
  ON public.patients FOR SELECT
  USING (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can insert their own patients"
  ON public.patients FOR INSERT
  WITH CHECK (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can update their own patients"
  ON public.patients FOR UPDATE
  USING (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can delete their own patients"
  ON public.patients FOR DELETE
  USING (psychologist_id = auth.uid());

-- Políticas RLS para check_ins
CREATE POLICY "Psychologists can view check-ins from their patients"
  ON public.check_ins FOR SELECT
  USING (psychologist_id = auth.uid());

CREATE POLICY "Allow anonymous check-ins insert"
  ON public.check_ins FOR INSERT
  WITH CHECK (true);

-- Políticas RLS para journeys
CREATE POLICY "Psychologists can view their own journeys"
  ON public.journeys FOR SELECT
  USING (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can insert their own journeys"
  ON public.journeys FOR INSERT
  WITH CHECK (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can update their own journeys"
  ON public.journeys FOR UPDATE
  USING (psychologist_id = auth.uid());

CREATE POLICY "Psychologists can delete their own journeys"
  ON public.journeys FOR DELETE
  USING (psychologist_id = auth.uid());

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_patients_psychologist ON public.patients(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_patient ON public.check_ins(patient_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_psychologist ON public.check_ins(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON public.check_ins(created_at);
CREATE INDEX IF NOT EXISTS idx_journeys_psychologist ON public.journeys(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_journeys_patient ON public.journeys(patient_id);
