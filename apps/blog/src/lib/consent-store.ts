import { createConsentStore } from "@policystack/core/consent"
import { localStorageAdapter } from "@policystack/core/consent/storage/local-storage"
import policyStackConfig from "../../policystack"

// Shared PolicyStack store for the banner and consent-gated analytics.
export const sharedConsentStore = createConsentStore({
  ...policyStackConfig,
  consent: { adapter: localStorageAdapter() },
})
