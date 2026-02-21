-- Create applications table for Membership forms
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    year TEXT NOT NULL,
    branch TEXT NOT NULL,
    motivation TEXT NOT NULL
);

-- Create contact_messages table for Contact form
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Set Row Level Security (RLS) to allow inserts from public (anonymous) users
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to applications" ON public.applications;
CREATE POLICY "Allow public insert to applications"
ON public.applications FOR INSERT TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages"
ON public.contact_messages FOR INSERT TO public
WITH CHECK (true);
