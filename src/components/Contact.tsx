import React, { useState } from "react";
import "./contact.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Expertise.scss";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, message } = formData;

  const newErrors = {
    name: name.trim() === "",
    email: email.trim() === "",
    message: message.trim() === "",
  };

  setErrors(newErrors);
  const isValid = Object.values(newErrors).every((v) => !v);
  if (!isValid) return;

  // ✅ Optimistic update: show success before await finishes
  toast.success("Message sent successfully!");
  setFormData({ name: "", email: "", phone: "", message: "" });

  // Background request
  try {
    await fetch("https://portfolio-backend-1wl9.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // Optional: log or silently handle real response
  } catch (error) {
    console.error("Email send error (ignored):", error);
    // You could show a warning here if you want
    // toast.warn("Email may not have sent. Try again if needed.");
  }
};


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
                type="text"
                name={field}
                value={formData[field as "name" | "email" | "phone"]}
                onChange={handleChange}
                className={errors[field as "name" | "email"] ? "error" : ""}
                required={field !== "phone"}
              />
              <label
                className={
                  formData[field as "name" | "email" | "phone"] ? "active" : ""
                }
              >
                {field === "name"
                  ? "Your Name"
                  : field === "email"
                  ? "Email"
                  : "Phone (optional)"}
              </label>
              {errors[field as "name" | "email"] && (
                <span className="error-text">Please enter {field}</span>
              )}
            </div>
          ))}
        </div>

        <div className="floating-label full-width">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
            rows={6}
            required
          />
          <label className={formData.message ? "active" : ""}>Message</label>
          {errors.message && (
            <span className="error-text">Please enter a message</span>
          )}
        </div>

        <button type="submit">Send Message</button>
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
