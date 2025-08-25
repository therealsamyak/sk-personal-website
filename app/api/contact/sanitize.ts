export const sanitizeInput = (input: string): string => {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: Intentional control character removal for security
  return input.trim().replace(/[\x00-\x1F\x7F]/g, "")
}

export const sanitizeContactData = (data: { name: string; email: string; message: string }) => ({
  name: sanitizeInput(data.name),
  email: sanitizeInput(data.email),
  message: sanitizeInput(data.message),
})
