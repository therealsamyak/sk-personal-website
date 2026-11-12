// Load cookieless Umami on HTTPS pages; keep HTTP previews out of analytics.
if (location.protocol === "https:") {
  const tracker = document.createElement("script")
  tracker.src = "https://analytics.azurlaneecgc.com/script.js"
  tracker.async = true
  tracker.dataset.websiteId = "3f600b40-6f1d-4c9f-85d4-24ca5a8920de"
  tracker.dataset.domains = location.hostname
  tracker.dataset.doNotTrack = "true"
  tracker.dataset.excludeSearch = "true"
  tracker.dataset.excludeHash = "true"
  document.head.appendChild(tracker)
}
