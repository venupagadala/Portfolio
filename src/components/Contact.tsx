import React, { useEffect, useState } from "react";
import "./contact.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profile } from "../data/resume";
import { Mailbox } from "./Scenery";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/min";

// ✅ Email RegEx validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim());
};

// Phone is optional. Numbers are validated against Google's libphonenumber
// rules for the chosen country (default United States). A number typed with
// its own "+code" is checked against that code instead.
const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;
const countryName = (cc: CountryCode) => regionNames?.of(cc) ?? cc;
const flag = (cc: string) =>
  cc.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
const COUNTRIES = getCountries()
  .map((cc) => ({ cc, name: countryName(cc), dial: getCountryCallingCode(cc) }))
  .sort((a, b) => (a.cc === "US" ? -1 : b.cc === "US" ? 1 : a.name.localeCompare(b.name)));
const parsePhone = (value: string, cc: CountryCode) => parsePhoneNumberFromString(value, cc);

const API_BASE = "https://portfolio-backend-1wl9.onrender.com";

function Contact() {
  // The backend sleeps on Render's free plan. Wake it as soon as this section
  // loads so it's ready by the time the visitor presses Send.
  useEffect(() => {
    fetch(`${API_BASE}/health`).catch(() => {
      /* best effort only */
    });
  }, []);

  const [country, setCountry] = useState<CountryCode>("US");
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
  const validateField = (name: string, value: string, cc: CountryCode = country): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Please enter your name";
      case "email":
        if (!value.trim()) return "Please enter your email";
        return isValidEmail(value) ? "" : "That email doesn't look right. Try name@example.com";
      case "phone":
        if (!value.trim()) return "";
        return parsePhone(value, cc)?.isValid()
          ? ""
          : `Enter a valid ${countryName(cc)} phone number (or pick another country code)`;
      case "message":
        return value.trim() ? "" : "Please write a message";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Errors appear on blur, not while typing. While typing we only clear an
    // existing error once the field becomes valid.
    const key = name as keyof typeof errors;
    if (errors[key] && !validateField(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

    // Tidy a valid phone number into its usual format, e.g. (470) 500-9074.
    if (name === "phone" && value.trim()) {
      const parsed = parsePhone(value, country);
      if (parsed?.isValid()) {
        const pretty =
          parsed.country === country ? parsed.formatNational() : parsed.formatInternational();
        setFormData((prev) => ({ ...prev, phone: pretty }));
      }
    }
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

    const firstInvalid = (Object.keys(newErrors) as (keyof typeof newErrors)[]).find(
      (k) => newErrors[k]
    );
    if (firstInvalid) {
      // Take the visitor straight to the first thing that needs fixing.
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSending(true);
    // The backend sleeps on its free tier, so allow a slow cold start.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45000);
    try {
      const res = await fetch(`${API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Send the full international number, e.g. +14705009074.
          phone: formData.phone ? parsePhone(formData.phone, country)?.number ?? formData.phone : "",
        }),
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

  // Send is enabled only when every required field is valid (and the
  // optional phone, if entered, is valid too).
  const canSend = (Object.keys(formData) as (keyof typeof formData)[]).every(
    (k) => !validateField(k, formData[k])
  );

  // Name only what's still missing or wrong, e.g. "To send, add your email."
  const stillNeeded = [
    !formData.name.trim() && "your name",
    !formData.email.trim()
      ? "your email"
      : !isValidEmail(formData.email) && "a valid email",
    !formData.message.trim() && "a message",
    formData.phone.trim() && validateField("phone", formData.phone) && "a valid phone number (or leave it empty)",
  ].filter(Boolean) as string[];
  const sendHint = stillNeeded.length
    ? `To send, add ${
        stillNeeded.length === 1
          ? stillNeeded[0]
          : `${stillNeeded.slice(0, -1).join(", ")} and ${stillNeeded[stillNeeded.length - 1]}`
      }.`
    : "";

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <header className="section-head">
        <p className="kicker">Say hello</p>
        <h2 id="contact-title">Contact</h2>
        <p>
          The easiest way to reach me is email:{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>. Or leave a note below and it
          will land in my inbox.
        </p>
      </header>

      <div className="contact__layout">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          {["name", "email", "phone"].map((field) => (
            <div
              key={field}
              className={`floating-label${field === "phone" ? " floating-label--phone" : ""}`}
            >
              {field === "phone" && (
                <span className="phone-country">
                  <span aria-hidden="true">
                    {flag(country)} +{getCountryCallingCode(country)}
                  </span>
                  <select
                    aria-label="Country code"
                    value={country}
                    onChange={(e) => {
                      const cc = e.target.value as CountryCode;
                      setCountry(cc);
                      if (touched.phone) {
                        setErrors((prev) => ({ ...prev, phone: validateField("phone", formData.phone, cc) }));
                      }
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.cc} value={c.cc}>
                        {flag(c.cc)} {c.name} (+{c.dial})
                      </option>
                    ))}
                  </select>
                </span>
              )}
              <input
                id={`contact-${field}`}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                inputMode={field === "phone" ? "tel" : undefined}
                autoComplete={field === "name" ? "name" : field === "email" ? "email" : "tel"}
                aria-invalid={Boolean(touched[field as keyof typeof touched] && errors[field as keyof typeof errors])}
                aria-describedby={`contact-${field}-error`}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={
                  field === "phone"
                    ? (e) =>
                        ((e.target as HTMLInputElement).value =
                          e.currentTarget.value.replace(/[^\d+()\-.\s]/g, ""))
                    : undefined
                }
                className={errors[field as keyof typeof errors] ? "error" : ""}
                required={field !== "phone"}
              />
              <label
                htmlFor={`contact-${field}`}
                className={
                  field === "phone" || formData[field as keyof typeof formData] ? "active" : ""
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
                  <span className="error-text" id={`contact-${field}-error`}>
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
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby="contact-message-error"
            rows={6}
            required
          />
          <label htmlFor="contact-message" className={formData.message ? "active" : ""}>
            Message
          </label>
          {touched.message && errors.message && (
            <span className="error-text" id="contact-message-error">
              {errors.message}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            className="submit-btn"
            type="submit"
            disabled={!canSend || sending}
            aria-busy={sending}
            aria-describedby={canSend ? undefined : "contact-send-hint"}
          >
            {sending ? "Sending…" : "Send message"}
          </button>
          {!canSend && !sending && (
            <span className="form-hint" id="contact-send-hint">
              {sendHint}
            </span>
          )}
        </div>
      </form>
      <Mailbox />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
    </section>
  );
}

export default Contact;
