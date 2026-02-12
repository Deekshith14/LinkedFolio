export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          username: string | null
          template_id: string | null
          linkedin_connected: boolean
          published: boolean
          updated_at: string | null
          created_at: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          is_premium: boolean
          is_admin: boolean
          plan_type: 'free' | 'pro' | 'enterprise' | null;
          visit_count: number | null;
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          username?: string | null
          template_id?: string | null
          linkedin_connected?: boolean
          published?: boolean
          updated_at?: string | null
          created_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          is_premium?: boolean
          is_admin?: boolean
          plan_type: 'free' | 'pro' | 'enterprise' | null;
          visit_count?: number | null;
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          username?: string | null
          template_id?: string | null
          linkedin_connected?: boolean
          published?: boolean
          updated_at?: string | null
          created_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          is_premium?: boolean
          is_admin?: boolean
          plan_type: 'free' | 'pro' | 'enterprise' | null;
          visit_count?: number | null;
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          hashed_password: string
          full_name: string | null
          username: string | null
          linkedin_id: string | null
          gmail_id: string | null
          last_login: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          hashed_password: string
          full_name?: string | null
          username?: string | null
          linkedin_id?: string | null
          gmail_id?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          hashed_password?: string
          full_name?: string | null
          username?: string | null
          linkedin_id?: string | null
          gmail_id?: string | null
          last_login?: string | null
        }
      }
      portfolio_templates: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          is_free: boolean
          preview_image_url: string | null
          template_structure: Json | null
          pricing_tier: "free" | "pro" | "premium"
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          is_free?: boolean
          preview_image_url?: string | null
          template_structure?: Json | null
          pricing_tier?: "free" | "pro" | "premium"
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          is_free?: boolean
          preview_image_url?: string | null
          template_structure?: Json | null
          pricing_tier?: "free" | "pro" | "premium"
        }
      }
      pricing_plans: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          price: number | null
          validity_months: number | null
          can_use_pro: boolean
          can_use_premium: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          price?: number | null
          validity_months?: number | null
          can_use_pro?: boolean
          can_use_premium?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          price?: number | null
          validity_months?: number | null
          can_use_pro?: boolean
          can_use_premium?: boolean
        }
      }
      user_portfolios: {
        Row: {
          id: string
          created_at: string
          user_id: string
          template_id: string
          portfolio_url_slug: string
          portfolio_data: Json | null
          published_at: string | null
          subscription_expiry_date: string | null
          active_subscription_plan_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          template_id: string
          portfolio_url_slug: string
          portfolio_data?: Json | null
          published_at?: string | null
          subscription_expiry_date?: string | null
          active_subscription_plan_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          template_id?: string
          portfolio_url_slug?: string
          portfolio_data?: Json | null
          published_at?: string | null
          subscription_expiry_date?: string | null
          active_subscription_plan_id?: string | null
        }
      }
      user_profile_data: {
        Row: {
          id: string
          created_at: string
          user_id: string
          personal_info: Json | null
          education: Json[] | null
          experience: Json[] | null
          skills: string[] | null
          projects: Json[] | null
          linkedin_sync_enabled: boolean | null
          linkedin_last_synced: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          personal_info?: Json | null
          education?: Json[] | null
          experience?: Json[] | null
          skills?: string[] | null
          projects?: Json[] | null
          linkedin_sync_enabled?: boolean | null
          linkedin_last_synced?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          personal_info?: Json | null
          education?: Json[] | null
          experience?: Json[] | null
          skills?: string[] | null
          projects?: Json[] | null
          linkedin_sync_enabled?: boolean | null
          linkedin_last_synced?: string | null
        }
      }
      payment_requests: {
        Row: {
          id: string
          user_id: string
          upi_reference_id: string
          amount: number
          plan_type: "pro" | "enterprise"
          status: "pending" | "approved" | "rejected"
          created_at: string
          updated_at: string
          verified_by: string | null
          verification_notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          upi_reference_id: string
          amount: number
          plan_type: "pro" | "enterprise"
          status?: "pending" | "approved" | "rejected"
          created_at?: string
          updated_at?: string
          verified_by?: string | null
          verification_notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          upi_reference_id?: string
          amount?: number
          plan_type?: "pro" | "enterprise"
          status?: "pending" | "approved" | "rejected"
          created_at?: string
          updated_at?: string
          verified_by?: string | null
          verification_notes?: string | null
        }
      }
      linkedin_sync_tokens: {
        Row: {
          id: string
          created_at: string
          user_id: string
          access_token: string | null
          refresh_token: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          access_token?: string | null
          refresh_token?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          access_token?: string | null
          refresh_token?: string | null
          expires_at?: string | null
        }
      }
      experiences: {
        Row: {
          id: string
          profile_id: string
          title: string
          company: string
          location: string | null
          start_date: string
          end_date: string | null
          current: boolean
          description: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          company: string
          location?: string | null
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          company?: string
          location?: string | null
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string[] | null
          created_at?: string | null
        }
      }
      education: {
        Row: {
          id: string
          profile_id: string
          institution: string
          degree: string
          field_of_study: string | null
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          institution: string
          degree: string
          field_of_study?: string | null
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          institution?: string
          degree?: string
          field_of_study?: string | null
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          created_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          profile_id: string
          title: string
          description: string | null
          url: string | null
          image_url: string | null
          technologies: string[] | null
          created_at: string | null
          current: boolean | null
          category: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          description?: string | null
          url?: string | null
          image_url?: string | null
          technologies?: string[] | null
          created_at?: string | null
          current?: boolean | null
          category?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          description?: string | null
          url?: string | null
          image_url?: string | null
          technologies?: string[] | null
          created_at?: string | null
          current?: boolean | null
          category?: string | null
        }
      }
      skills: {
        Row: {
          id: string
          profile_id: string
          name: string
          level: number | null
          created_at: string | null
          category: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          level?: number | null
          created_at?: string | null
          category?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          name?: string
          level?: number | null
          created_at?: string | null
          category?: string | null
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          preview_image: string | null
          is_premium: boolean
          created_at: string | null
          tier: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          preview_image?: string | null
          is_premium?: boolean
          created_at?: string | null
          tier?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          preview_image?: string | null
          is_premium?: boolean
          created_at?: string | null
          tier?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_user_access_template: {
        Args: {
          user_id_input: string
          template_id_input: string
        }
        Returns: boolean
      }
      increment_visit_count: {
        Args: {
          profile_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
