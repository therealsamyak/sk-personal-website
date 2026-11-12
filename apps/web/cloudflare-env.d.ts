// Declare dashboard-managed contact secrets available only in the Worker runtime.
declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SECRET_KEY?: string
    RESEND_API_KEY?: string
    FROM_EMAIL?: string
    NOTIFICATION_EMAIL?: string
  }
}
