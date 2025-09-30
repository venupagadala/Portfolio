import React, { useState } from "react";
import "./contact.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Email RegEx validation
const isValidEmail = (email: string): boolean => {
  const regex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email) && email.endsWith(".com");
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
        return isValidEmail(value) ? "" : "Enter a valid .com email";
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

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });

    try {
      await fetch("https://portfolio-backend-1wl9.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Email send error (ignored):", error);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim() &&
    (!formData.phone || /^\d{10}$/.test(formData.phone));

  return (
    <div className="contact-container" id="contact">
      <h1>Contact Me</h1>
      <p>
        Got a project waiting to be realized? Let's collaborate and make it
        happen!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="floating-label">
              <input
                type={field === "email" ? "email" : "text"}
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
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message ? "error" : ""}
            rows={6}
            required
          />
          <label className={formData.message ? "active" : ""}>Message</label>
          {touched.message && errors.message && (
            <span className="error-text">{errors.message}</span>
          )}
        </div>

        <button className="submit-btn" type="submit" disabled={!isFormValid}>
          Send Message
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
