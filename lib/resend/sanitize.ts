export const sanitizeInput = (input: string): string => {
  const trimmed = input.trim()
  return trimmed
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0)
      return code > 31 && code !== 127
    })
    .join("")
}

export const sanitizeContactData = (data: { name: string; email: string; message: string }) => ({
  name: sanitizeInput(data.name),
  email: sanitizeInput(data.email),
  message: sanitizeInput(data.message),
})
