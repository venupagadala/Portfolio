import React, { useState } from "react";
import "./contact.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profile } from "../data/resume";

// ✅ Email RegEx validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim());
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  // ✅ Validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Please enter your name";
      case "email":
        return isValidEmail(value) ? "" : "Enter a valid email address";
      case "phone":
        return value && !/^\d{10}$/.test(value)
          ? "Phone number must be 10 digits"
          : "";
      case "message":
        return value.trim() ? "" : "Please enter a message";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error while typing if already touched
    if (touched[name as keyof typeof touched]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (!isValid) return;

    setSending(true);
    // The backend sleeps on its free tier, so allow a slow cold start.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45000);
    try {
      const res = await fetch("https://portfolio-backend-1wl9.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Send failed with status ${res.status}`);
      toast.success("Thanks! Your message is on its way.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTouched({ name: false, email: false, phone: false, message: false });
    } catch (error) {
      console.error("Email send error:", error);
      toast.error(`Couldn't send right now. Please email me at ${profile.email}.`);
    } finally {
      clearTimeout(timer);
      setSending(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim() &&
    (!formData.phone || /^\d{10}$/.test(formData.phone));

  return (
    <div className="contact-container" id="contact">
      <h2>Contact</h2>
      <p>
        Email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>, or use the form
        below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="floating-label">
              <input
                id={`contact-${field}`}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                inputMode={field === "phone" ? "numeric" : undefined}
                autoComplete={field === "name" ? "name" : field === "email" ? "email" : "tel"}
                aria-invalid={Boolean(touched[field as keyof typeof touched] && errors[field as keyof typeof errors])}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={
                  field === "phone"
                    ? (e) =>
                        ((e.target as HTMLInputElement).value =
                          e.currentTarget.value.replace(/\D/g, ""))
                    : undefined
                }
                className={errors[field as keyof typeof errors] ? "error" : ""}
                required={field !== "phone"}
              />
              <label
                htmlFor={`contact-${field}`}
                className={
                  formData[field as keyof typeof formData] ? "active" : ""
                }
              >
                {field === "name"
                  ? "Your Name"
                  : field === "email"
                  ? "Email"
                  : "Phone (optional)"}
              </label>

              {touched[field as keyof typeof touched] &&
                errors[field as keyof typeof errors] && (
                  <span className="error-text">
                    {errors[field as keyof typeof errors]}
                  </span>
                )}
            </div>
          ))}
        </div>

        <div className="floating-label full-width">
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message ? "error" : ""}
            rows={6}
            required
          />
          <label htmlFor="contact-message" className={formData.message ? "active" : ""}>
            Message
          </label>
          {touched.message && errors.message && (
            <span className="error-text">{errors.message}</span>
          )}
        </div>

        <button
          className="submit-btn"
          type="submit"
          disabled={!isFormValid || sending}
          aria-busy={sending}
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
    </div>
  );
}

export default Contact;
