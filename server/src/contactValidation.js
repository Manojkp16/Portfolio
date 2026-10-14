const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(body) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 100) {
    return { valid: false, error: "Name is required and must be 100 characters or fewer." };
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { valid: false, error: "Enter a valid email address." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { valid: false, error: "Message must be between 10 and 5000 characters." };
  }

  return { valid: true, value: { name, email, message } };
}
