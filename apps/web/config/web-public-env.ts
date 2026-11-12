// Define shared Umami public production values for builds and the Worker.
export const websiteUmamiEnv = {
  NEXT_PUBLIC_UMAMI_BASE_URL: "https://analytics.azurlaneecgc.com",
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: "6870dce5-8778-47e1-b4f7-5ee887df95a6",
}

// Define the website public defaults shared by the build and Worker configuration.
export const websitePublicEnv = {
  NEXT_PUBLIC_BASE_URL: "https://skakatur.dev",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAABunVtq2F8mV8IF1",
  ...websiteUmamiEnv,
}
