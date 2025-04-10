type FeatureFlags = {
  [K in keyof typeof FEATURE_KEYS]: boolean;
};

const FEATURE_KEYS = {
  FEATURE_FLAG_SEARCH: "FEATURE_FLAG_SEARCH",
  FEATURE_FLAG_PROFILE_V1: "FEATURE_FLAG_PROFILE_V1",
  // Add more feature flags here as needed
  // FEATURE_FLAG_NEW_UI: "FEATURE_FLAG_NEW_UI",
} as const;

const FEATURE_FLAGS: FeatureFlags = {
  FEATURE_FLAG_SEARCH: false,
  FEATURE_FLAG_PROFILE_V1: false,
  // Add more feature flags here as needed
  // FEATURE_FLAG_NEW_UI: true,
};

export { FEATURE_FLAGS, FEATURE_KEYS };
export type { FeatureFlags };


/*
  USAGE:
  import { isFeatureEnabled } from "./helpers/featureFlag/featureFlag";
  import { FEATURE_KEYS } from "./helpers/featureFlag/features";

  const isSearchEnabled = isFeatureEnabled(FEATURE_KEYS.FEATURE_FLAG_SEARCH);
*/