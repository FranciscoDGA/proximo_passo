import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

let supabase: any = null;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.warn('Supabase client initialization failed:', error);
}

export { supabase };

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          subscription_tier: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          subscription_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          subscription_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_journeys: {
        Row: {
          id: string;
          user_id: string;
          journey_id: string;
          progress: number;
          checklist_data: Record<string, boolean>;
          saved_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          journey_id: string;
          progress?: number;
          checklist_data?: Record<string, boolean>;
          saved_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          journey_id?: string;
          progress?: number;
          checklist_data?: Record<string, boolean>;
          saved_at?: string;
          created_at?: string;
        };
      };
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          journey_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          journey_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          journey_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          created_at?: string;
        };
      };
      user_tools: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          data_saved: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_id: string;
          data_saved?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_id?: string;
          data_saved?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          resource: string;
          details: Record<string, unknown> | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          resource: string;
          details?: Record<string, unknown> | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          resource?: string;
          details?: Record<string, unknown> | null;
          timestamp?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
