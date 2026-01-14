-- Função para criar perfil de psicólogo automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_psychologist()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.psychologists (id, name, email, phone, crp)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Novo Psicólogo'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    COALESCE(NEW.raw_user_meta_data->>'crp', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_psychologist_created ON auth.users;

CREATE TRIGGER on_auth_psychologist_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_psychologist();
