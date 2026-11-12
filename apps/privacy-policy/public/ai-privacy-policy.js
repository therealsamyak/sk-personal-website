// Load the existing cookieless Umami tracker for this public policy page.
const tracker = document.createElement("script")
tracker.src = "https://analytics.azurlaneecgc.com/script.js"
tracker.async = true
tracker.dataset.websiteId = "3f600b40-6f1d-4c9f-85d4-24ca5a8920de"
tracker.dataset.domains = "privacy-policy.example.com"
tracker.dataset.doNotTrack = "true"
tracker.dataset.excludeSearch = "true"
tracker.dataset.excludeHash = "true"
document.head.appendChild(tracker)
