import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "./Contact";

// Only count /send calls; the component also pings /health on mount.
const sendCalls = () =>
  (global.fetch as jest.Mock).mock.calls.filter(([url]) => String(url).endsWith("/send"));

const field = (label: RegExp) => screen.getByLabelText(label);
const type = (label: RegExp, value: string) => fireEvent.change(field(label), { target: { value } });
const leave = (label: RegExp) => fireEvent.blur(field(label));
const sendButton = () => screen.getByRole("button", { name: /send message/i });

const fillRequired = () => {
  type(/your name/i, "Venu Pagadala");
  type(/^email$/i, "venupagadala.ui@gmail.com");
  type(/message/i, "Hello there");
};

describe("Contact form", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;
  });

  test("send is disabled, with a hint, until the required fields are filled", () => {
    render(<Contact />);
    expect(sendButton()).toBeDisabled();
    expect(screen.getByText("To send, add your name, your email and a message.")).toBeInTheDocument();

    type(/your name/i, "Venu");
    type(/message/i, "Hello");
    expect(screen.getByText("To send, add your email.")).toBeInTheDocument();

    type(/^email$/i, "venu@");
    expect(screen.getByText("To send, add a valid email.")).toBeInTheDocument();

    type(/^email$/i, "venupagadala.ui@gmail.com");
    expect(sendButton()).toBeEnabled();
    expect(screen.queryByText(/to send, add/i)).not.toBeInTheDocument();
  });

  test("errors appear on blur, not while typing, and clear once fixed", () => {
    render(<Contact />);
    type(/^email$/i, "not-an-email");
    expect(screen.queryByText(/doesn't look right/i)).not.toBeInTheDocument();

    leave(/^email$/i);
    expect(screen.getByText(/that email doesn't look right/i)).toBeInTheDocument();

    type(/^email$/i, "v@example.com");
    expect(screen.queryByText(/doesn't look right/i)).not.toBeInTheDocument();
  });

  test("leaving a required field empty names that field", () => {
    render(<Contact />);
    leave(/your name/i);
    leave(/^email$/i);
    leave(/message/i);
    expect(screen.getByText("Please enter your name")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
    expect(screen.getByText("Please write a message")).toBeInTheDocument();
  });

  test("defaults to the US country code", () => {
    render(<Contact />);
    expect(field(/country code/i)).toHaveValue("US");
  });

  test("an invalid optional phone keeps send disabled and explains why on blur", () => {
    render(<Contact />);
    fillRequired();
    type(/^phone/i, "12345");
    expect(sendButton()).toBeDisabled();
    expect(screen.getByText(/to send, add a valid phone number/i)).toBeInTheDocument();
    leave(/^phone/i);
    expect(screen.getByText(/valid united states phone number/i)).toBeInTheDocument();
  });

  test("sends a US number with country code as +1…", async () => {
    render(<Contact />);
    fillRequired();
    type(/^phone/i, "14705009074");
    fireEvent.click(sendButton());
    await waitFor(() => expect(sendCalls()).toHaveLength(1));
    expect(JSON.parse(sendCalls()[0][1].body).phone).toBe("+14705009074");
  });

  test("validates against the chosen country", async () => {
    render(<Contact />);
    fillRequired();
    type(/^phone/i, "07911 123456");
    expect(sendButton()).toBeDisabled();

    fireEvent.change(field(/country code/i), { target: { value: "GB" } });
    expect(sendButton()).toBeEnabled();
    fireEvent.click(sendButton());
    await waitFor(() => expect(sendCalls()).toHaveLength(1));
    expect(JSON.parse(sendCalls()[0][1].body).phone).toBe("+447911123456");
  });
});
