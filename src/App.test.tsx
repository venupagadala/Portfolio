import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Experience from "./components/Experience";
import FeaturedWork from "./components/FeaturedWork";
import { experience } from "./data/resume";

describe("Experience", () => {
  test("renders every role from the resume", () => {
    render(<Experience />);
    experience.forEach((role) => {
      expect(screen.getByRole("heading", { level: 3, name: role.role })).toBeInTheDocument();
    });
  });

  test("expands and collapses extra highlights accessibly", () => {
    render(<Experience />);
    const [toggle] = screen.getAllByRole("button", { name: /more details/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Performance & caching/i)).toBeVisible();
  });
});

test("featured work links to the live HD Supply storefront", () => {
  render(<FeaturedWork />);
  const link = screen.getByRole("link", { name: /hdsupplysolutions\.com/i });
  expect(link).toHaveAttribute("href", "https://hdsupplysolutions.com");
  expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
});
