"use server"

export async function submitQuoteRequest(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    description: formData.get("description"),
  }

  // In a real app, you would save this to your database
  console.log("Quote request submitted:", data)

  // Simulate success
  return { success: true }
}

export async function submitContactForm(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  // In a real app, you would save this to your database
  console.log("Contact form submitted:", data)

  // Simulate success
  return { success: true }
}
