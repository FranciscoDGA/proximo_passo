-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Journeys - tracks progress in each journey
CREATE TABLE IF NOT EXISTS user_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  journey_id TEXT NOT NULL,
  progress DECIMAL(3, 2) DEFAULT 0,
  checklist_data JSONB DEFAULT '{}',
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, journey_id)
);

-- Chat History - stores conversations with AI specialists
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  journey_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Tools - stores data for interactive tools
CREATE TABLE IF NOT EXISTS user_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,
  data_saved JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, tool_id)
);

-- Admin Logs - audit trail for admin actions
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  details JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_journeys_user_id ON user_journeys (user_id);
CREATE INDEX IF NOT EXISTS idx_user_journeys_journey_id ON user_journeys (journey_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history (user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_journey_id ON chat_history (journey_id);
CREATE INDEX IF NOT EXISTS idx_user_tools_user_id ON user_tools (user_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs (admin_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY users_select ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY users_update ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only access their own journey progress
CREATE POLICY user_journeys_select ON user_journeys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY user_journeys_insert ON user_journeys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY user_journeys_update ON user_journeys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY user_journeys_delete ON user_journeys
  FOR DELETE USING (auth.uid() = user_id);

-- Users can only access their own chat history
CREATE POLICY chat_history_select ON chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY chat_history_insert ON chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY chat_history_update ON chat_history
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only access their own tools data
CREATE POLICY user_tools_select ON user_tools
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY user_tools_insert ON user_tools
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY user_tools_update ON user_tools
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY user_tools_delete ON user_tools
  FOR DELETE USING (auth.uid() = user_id);

-- Admin logs are only accessible to admins
CREATE POLICY admin_logs_select ON admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND subscription_tier = 'admin'
    )
  );

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_tools_updated_at BEFORE UPDATE ON user_tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
