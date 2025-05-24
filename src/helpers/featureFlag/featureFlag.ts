import { FEATURE_FLAGS } from './features'
import type { FeatureFlags } from './features'

export const isFeatureEnabled = (featureName: keyof FeatureFlags): boolean => {
  return !!FEATURE_FLAGS[featureName]
}
