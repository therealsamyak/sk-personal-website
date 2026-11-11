// Keep the public AI privacy policy in place and redirect other URLs to the portfolio.
export default {
  fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === "/ai-privacy-policy") return env.ASSETS.fetch(request)
    if (url.pathname === "/ai-privacy-policy/" || url.pathname === "/ai-privacy-policy.html") {
      url.pathname = "/ai-privacy-policy"
    } else {
      url.protocol = "https:"
      url.host = "skakatur.dev"
      url.port = ""
    }
    return Response.redirect(url.href, 301)
  },
}
