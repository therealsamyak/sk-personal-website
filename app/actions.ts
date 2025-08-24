"use server"

export const submitContactForm = async (formData: FormData) => {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return {
      message: "Please fill in all fields.",
      success: false,
    }
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })

    const result = await response.json()

    if (response.ok) {
      return {
        message: result.message,
        success: result.success,
      }
    }

    return {
      message: result.message || "Something went wrong. Please try again.",
      success: false,
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      message: "Something went wrong. Please try again or contact me directly.",
      success: false,
    }
  }
}
