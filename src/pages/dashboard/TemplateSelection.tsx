"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Eye, Filter, Lock, Search, X, ChevronDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import { useAuth } from "@/context/AuthContext"
import DashboardLayout from "@/components/layout/DashboardLayout"
import TemplatePlaceholder from "@/components/ui/TemplatePlaceholder"

type Template = Database["public"]["Tables"]["templates"]["Row"]

const TemplateSelection = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTier, setActiveTier] = useState<string>("all")

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const { data: templatesData, error: templatesError } = await supabase
          .from("templates")
          .select("*")
          .order("tier", { ascending: true })

        if (templatesError) throw templatesError
        setTemplates(templatesData || [])
        setFilteredTemplates(templatesData || [])

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError
        setUserProfile(profileData)
        setSelectedTemplate(profileData?.template_id || null)
      } catch (error: any) {
        toast({
          title: "Error loading templates",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    // Apply filters whenever dependencies change
    let results = [...templates]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (template) =>
          template.name?.toLowerCase().includes(query) || template.description?.toLowerCase().includes(query),
      )
    }

    // Filter by tier
    if (activeTier !== "all") {
      results = results.filter((template) => template.tier === activeTier)
    }

    setFilteredTemplates(results)
  }, [templates, searchQuery, activeTier])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleSaveTemplate = async () => {
    if (!user || !selectedTemplate) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          template_id: selectedTemplate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Template selected!",
        description: "Your portfolio template has been updated.",
      })

      if (!userProfile?.full_name || !userProfile?.email) {
        navigate("/profile")
      } else {
        navigate("/preview")
      }
    } catch (error: any) {
      toast({
        title: "Error saving template",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const canAccessTemplate = (template: Template) => {
    const tier = userProfile?.plan_type || "free"
    if (template.tier === "free") return true
    if (template.tier === "pro") return tier === "pro" || tier === "enterprise"
    if (template.tier === "enterprise") return tier === "enterprise"
    return false
  }

  const handlePreviewTemplate = (template: Template) => {
    if (!user || !userProfile?.username) {
      toast({
        title: "Cannot preview",
        description: "Please complete your profile first.",
        variant: "destructive",
      })
      return
    }

    const previewUrl = `/preview/portfolio/${userProfile.username}/${user.id}?template=${template.id}`
    window.open(previewUrl, "_blank")
  }

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "pro":
        return {
          badge: "bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0",
          card: "border-violet-200 hover:border-violet-300",
          accent: "bg-gradient-to-r from-violet-500 to-purple-500",
          button: "bg-violet-500 hover:bg-violet-600 text-white",
        }
      case "enterprise":
        return {
          badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0",
          card: "border-amber-200 hover:border-amber-300",
          accent: "bg-gradient-to-r from-amber-500 to-orange-500",
          button: "bg-amber-500 hover:bg-amber-600 text-white",
        }
      default:
        return {
          badge: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0",
          card: "border-emerald-200 hover:border-emerald-300",
          accent: "bg-gradient-to-r from-emerald-500 to-teal-500",
          button: "bg-emerald-500 hover:bg-emerald-600 text-white",
        }
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Choose a Template">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Choose a Template">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Perfect Template</h1>
            <p className="text-slate-600 mb-6">
              Select a template that best showcases your work and skills. Preview any template before making your final
              decision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full bg-white"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2 whitespace-nowrap">
                    <Filter className="h-4 w-4" />
                    {activeTier === "all"
                      ? "All Tiers"
                      : `${activeTier.charAt(0).toUpperCase() + activeTier.slice(1)} Tier`}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTier("all")}>All Tiers</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTier("free")}>Free Tier</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTier("pro")}>Pro Tier</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTier("enterprise")}>Enterprise Tier</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
          <Button
            variant={activeTier === "all" ? "default" : "outline"}
            className="rounded-full px-6"
            onClick={() => setActiveTier("all")}
          >
            All Tiers
          </Button>
          <Button
            variant={activeTier === "free" ? "default" : "outline"}
            className={`rounded-full px-6 ${activeTier === "free" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
            onClick={() => setActiveTier("free")}
          >
            Free
          </Button>
          <Button
            variant={activeTier === "pro" ? "default" : "outline"}
            className={`rounded-full px-6 ${activeTier === "pro" ? "bg-violet-500 hover:bg-violet-600" : ""}`}
            onClick={() => setActiveTier("pro")}
          >
            Pro
          </Button>
          <Button
            variant={activeTier === "enterprise" ? "default" : "outline"}
            className={`rounded-full px-6 ${activeTier === "enterprise" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
            onClick={() => setActiveTier("enterprise")}
          >
            Enterprise
          </Button>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl shadow-sm">
            <div className="rounded-full bg-slate-100 p-3 mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setActiveTier("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const hasAccess = canAccessTemplate(template)
              const isSelected = selectedTemplate === template.id
              const tierStyles = getTierStyles(template.tier || "free")

              return (
                <Card
                  key={template.id}
                  className={`group overflow-hidden transition-all hover:shadow-lg ${isSelected ? "ring-2 ring-primary" : tierStyles.card
                    }`}
                >
                  <div className="relative">
                    <div className={`absolute inset-x-0 top-0 h-1.5 ${tierStyles.accent}`} />

                    <div className="aspect-[16/10] relative bg-slate-50 overflow-hidden">
                      <TemplatePlaceholder name={template.name} />

                      {!hasAccess && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                          <Lock className="h-8 w-8 mb-2 opacity-90" />
                          <p className="text-sm font-medium capitalize mb-2">{template.tier} Plan Required</p>
                          <Button
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                            onClick={() => navigate("/payment/request")}
                          >
                            Upgrade Now
                          </Button>
                        </div>
                      )}

                      <div className="absolute top-3 right-3">
                        <Badge className={`capitalize ${tierStyles.badge}`}>{template.tier}</Badge>
                      </div>

                      {isSelected && (
                        <div className="absolute top-3 left-3 bg-primary text-white p-1 rounded-full">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{template.description}</p>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        Preview
                      </Button>

                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelectTemplate(template.id)}
                        disabled={!hasAccess}
                        className={hasAccess ? (isSelected ? "" : tierStyles.button) : "opacity-50 cursor-not-allowed"}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Sticky Action Bar */}
        <div className="sticky bottom-4 flex justify-center mt-8 z-10">
          <Card className="w-full max-w-md shadow-lg border-primary/20 bg-white">
            <CardContent className="p-4 flex gap-4 items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">{selectedTemplate ? "Template selected" : "No template selected"}</p>
                <p className="text-xs text-slate-500">
                  {selectedTemplate ? "Click continue to save your selection" : "Select a template to continue"}
                </p>
              </div>
              <Button onClick={handleSaveTemplate} disabled={!selectedTemplate || isSaving} className="min-w-[140px]">
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TemplateSelection
