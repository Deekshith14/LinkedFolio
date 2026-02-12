export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      education: {
        Row: {
          created_at: string | null
          current: boolean | null
          degree: string | null
          description: string | null
          end_date: string | null
          field_of_study: string | null
          id: string
          institution: string | null
          profile_id: string | null
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          current?: boolean | null
          degree?: string | null
          description?: string | null
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string | null
          profile_id?: string | null
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          current?: boolean | null
          degree?: string | null
          description?: string | null
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string | null
          profile_id?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string | null
          created_at: string | null
          current: boolean | null
          description: string[] | null
          end_date: string | null
          id: string
          location: string | null
          profile_id: string | null
          start_date: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          current?: boolean | null
          description?: string[] | null
          end_date?: string | null
          id?: string
          location?: string | null
          profile_id?: string | null
          start_date?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          current?: boolean | null
          description?: string[] | null
          end_date?: string | null
          id?: string
          location?: string | null
          profile_id?: string | null
          start_date?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      linkedin_sync_tokens: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          refresh_token: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          refresh_token?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          refresh_token?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_sync_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_requests: {
        Row: {
          amount: number
          created_at: string
          id: string
          plan_type: string
          status: string
          updated_at: string
          upi_reference_id: string
          user_id: string
          verification_notes: string | null
          verified_by: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          plan_type: string
          status?: string
          updated_at?: string
          upi_reference_id: string
          user_id: string
          verification_notes?: string | null
          verified_by?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          plan_type?: string
          status?: string
          updated_at?: string
          upi_reference_id?: string
          user_id?: string
          verification_notes?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_requests_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_free: boolean
          name: string
          preview_image_url: string | null
          pricing_tier: string
          template_structure: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_free?: boolean
          name: string
          preview_image_url?: string | null
          pricing_tier?: string
          template_structure?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_free?: boolean
          name?: string
          preview_image_url?: string | null
          pricing_tier?: string
          template_structure?: Json | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          can_use_premium: boolean
          can_use_pro: boolean
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          validity_months: number | null
        }
        Insert: {
          can_use_premium?: boolean
          can_use_pro?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          validity_months?: number | null
        }
        Update: {
          can_use_premium?: boolean
          can_use_pro?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          validity_months?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          achievements: Json | null
          avatar_url: string | null
          bio: string | null
          certificates: Json | null
          created_at: string | null
          email: string | null
          full_name: string | null
          github_url: string | null
          id: string
          instagram_url: string | null
          is_admin: boolean | null
          is_premium: boolean | null
          linkedin_connected: boolean | null
          linkedin_url: string | null
          phone: string | null
          plan_type: string | null
          published: boolean | null
          template_id: string | null
          twitter_url: string | null
          updated_at: string | null
          username: string | null
          visit_count: number | null
          website: string | null
        }
        Insert: {
          achievements?: Json | null
          avatar_url?: string | null
          bio?: string | null
          certificates?: Json | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          github_url?: string | null
          id: string
          instagram_url?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          linkedin_connected?: boolean | null
          linkedin_url?: string | null
          phone?: string | null
          plan_type?: string | null
          published?: boolean | null
          template_id?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          visit_count?: number | null
          website?: string | null
        }
        Update: {
          achievements?: Json | null
          avatar_url?: string | null
          bio?: string | null
          certificates?: Json | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          github_url?: string | null
          id?: string
          instagram_url?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          linkedin_connected?: boolean | null
          linkedin_url?: string | null
          phone?: string | null
          plan_type?: string | null
          published?: boolean | null
          template_id?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
          visit_count?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          current: boolean | null
          description: string | null
          id: string
          image_url: string | null
          profile_id: string | null
          technologies: string[] | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          current?: boolean | null
          description?: string | null
          id?: string
          image_url?: string | null
          profile_id?: string | null
          technologies?: string[] | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          current?: boolean | null
          description?: string | null
          id?: string
          image_url?: string | null
          profile_id?: string | null
          technologies?: string[] | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          level: number | null
          name: string | null
          profile_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          level?: number | null
          name?: string | null
          profile_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          level?: number | null
          name?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          preview_image: string | null
          tier: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          preview_image?: string | null
          tier?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_image?: string | null
          tier?: string
        }
        Relationships: []
      }
      user_portfolios: {
        Row: {
          active_subscription_plan_id: string | null
          created_at: string | null
          id: string
          portfolio_data: Json | null
          portfolio_url_slug: string
          published_at: string | null
          subscription_expiry_date: string | null
          template_id: string
          user_id: string
        }
        Insert: {
          active_subscription_plan_id?: string | null
          created_at?: string | null
          id?: string
          portfolio_data?: Json | null
          portfolio_url_slug: string
          published_at?: string | null
          subscription_expiry_date?: string | null
          template_id: string
          user_id: string
        }
        Update: {
          active_subscription_plan_id?: string | null
          created_at?: string | null
          id?: string
          portfolio_data?: Json | null
          portfolio_url_slug?: string
          published_at?: string | null
          subscription_expiry_date?: string | null
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_portfolios_active_subscription_plan_id_fkey"
            columns: ["active_subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_portfolios_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "portfolio_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_portfolios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile_data: {
        Row: {
          created_at: string | null
          education: Json[] | null
          experience: Json[] | null
          id: string
          linkedin_last_synced: string | null
          linkedin_sync_enabled: boolean | null
          personal_info: Json | null
          projects: Json[] | null
          skills: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          education?: Json[] | null
          experience?: Json[] | null
          id?: string
          linkedin_last_synced?: string | null
          linkedin_sync_enabled?: boolean | null
          personal_info?: Json | null
          projects?: Json[] | null
          skills?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          education?: Json[] | null
          experience?: Json[] | null
          id?: string
          linkedin_last_synced?: string | null
          linkedin_sync_enabled?: boolean | null
          personal_info?: Json | null
          projects?: Json[] | null
          skills?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          gmail_id: string | null
          hashed_password: string | null
          id: string
          last_login: string | null
          linkedin_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gmail_id?: string | null
          hashed_password?: string | null
          id?: string
          last_login?: string | null
          linkedin_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gmail_id?: string | null
          hashed_password?: string | null
          id?: string
          last_login?: string | null
          linkedin_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_user_access_template: {
        Args: { user_id_input: string; template_id_input: string }
        Returns: boolean
      }
      increment_visit_count: {
        Args: { profile_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
