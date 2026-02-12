
import Free1Template from './free1';
import Free2Template from './free2';
import Pro1Template from './pro1';
import Enterprise1Template from './enterprise1';
import { PortfolioProps } from '@/types/portfolio';

// Map template IDs to their corresponding component
const templateComponents = {
  free1: Free1Template,
  free2: Free2Template,
  pro1: Pro1Template,
  enterprise1: Enterprise1Template,
};

// Map database UUIDs to template IDs - CRITICAL for correct template lookup
const templateIdMapping: Record<string, string> = {
  // Free templates
  'a6367315-3772-48cf-8e47-8ce1939e6d64': 'free1',
  '87a762bd-5dd8-49a9-a134-a2c3f98d90e0': 'free2',

  // Pro templates
  'dd03cc41-fb3d-4d3f-8fdd-4c7ae36eb3ae': 'pro1',

  // Enterprise templates
  '0480b20a-e6da-4f8e-b450-e6b72e09804a': 'enterprise1',
};

// Direct mapping of template IDs to tiers
const templateTierMapping: Record<string, string> = {
  'free1': 'free',
  'free2': 'free',
  'pro1': 'pro',
  'enterprise1': 'enterprise',
  
  // Also add UUID mappings
  'a6367315-3772-48cf-8e47-8ce1939e6d64': 'free',
  '87a762bd-5dd8-49a9-a134-a2c3f98d90e0': 'free',
  'dd03cc41-fb3d-4d3f-8fdd-4c7ae36eb3ae': 'pro',
  '0480b20a-e6da-4f8e-b450-e6b72e09804a': 'enterprise',
};

export type TemplateId = keyof typeof templateComponents;

/**
 * Get the template component based on the template ID
 * @param templateId - The ID of the template to render
 * @returns The React component for the template
 */
export const getTemplateComponent = (templateId: string | null) => {
  if (!templateId) {
    console.log("No template ID provided, defaulting to free1");
    return templateComponents.free1;
  }

  // Map UUID to template ID if needed
  const mappedId = templateIdMapping[templateId] || templateId;
  console.log(`Mapping template: ${templateId} → ${mappedId}`);

  // Check if the mapped ID exists in our components
  if (!Object.keys(templateComponents).includes(mappedId)) {
    console.log(`Template ID ${mappedId} not found, defaulting to free1`);
    return templateComponents.free1;
  }

  console.log(`Rendering template: ${mappedId}`);
  return templateComponents[mappedId as TemplateId];
};

/**
 * Check if a template is premium (pro or enterprise tier)
 * @param templateId - The ID of the template to check
 * @returns Whether the template is premium
 */
export const isTemplatePremium = (templateId: string | null): boolean => {
  if (!templateId) return false;

  const tier = getTemplateTier(templateId);
  return tier === 'pro' || tier === 'enterprise';
};

/**
 * Get the tier of a template
 * @param templateId - The ID of the template to check
 * @returns The tier of the template (free, pro, enterprise)
 */
export const getTemplateTier = (templateId: string | null): string => {
  if (!templateId) return 'free';

  // Direct lookup in tier mapping
  if (templateTierMapping[templateId]) {
    return templateTierMapping[templateId];
  }
  
  // Map UUID to template ID if needed
  const mappedId = templateIdMapping[templateId] || templateId;

  // Return tier based on template ID prefix
  if (mappedId.startsWith('free')) return 'free';
  if (mappedId.startsWith('pro')) return 'pro';
  if (mappedId.startsWith('enterprise')) return 'enterprise';

  return 'free';
};

/**
 * Check if a user can access a template based on their plan type
 * @param templateId - The ID of the template to check
 * @param userPlanType - The user's plan type (free, pro, enterprise)
 * @returns Whether the user can access the template
 */
export const canUserAccessTemplate = (templateId: string | null, userPlanType: string): boolean => {
  if (!templateId) return true; // Default template is accessible to everyone
  
  const templateTier = getTemplateTier(templateId);
  
  // Free templates are accessible to everyone
  if (templateTier === 'free') return true;
  
  // Pro templates are accessible to pro and enterprise users
  if (templateTier === 'pro') return userPlanType === 'pro' || userPlanType === 'enterprise';
  
  // Enterprise templates are only accessible to enterprise users
  if (templateTier === 'enterprise') return userPlanType === 'enterprise';
  
  return false;
};
