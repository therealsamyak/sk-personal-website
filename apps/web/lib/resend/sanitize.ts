const sanitizeInput = (input: string): string => {
  const trimmed = input.trim()
  return trimmed
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0)
      return code > 31 && code !== 127
    })
    .join("")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

// Sanitize contact text before inserting it into HTML email templates.
export const sanitizeContactData = (data: { name: string; email: string; message: string }) => ({
  name: sanitizeInput(data.name),
  email: data.email.trim(),
  message: sanitizeInput(data.message),
})
