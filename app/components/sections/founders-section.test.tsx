import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FoundersSection } from "@/components/sections/founders-section";
import { site } from "@/lib/content";

describe("FoundersSection", () => {
  it("shows the founders portrait beside their names and roles", () => {
    render(<FoundersSection />);

    expect(screen.getByRole("img", { name: site.about.photoAlt })).toBeVisible();
    for (const founder of site.founders) {
      expect(screen.getByRole("heading", { name: founder.name })).toBeVisible();
      if (founder.role) expect(screen.getByText(founder.role)).toBeVisible();
    }
  });
});
