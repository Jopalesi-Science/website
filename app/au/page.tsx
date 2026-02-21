import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "About — Jopalesi",
};

export default function AboutPage() {
  return (
    <PageTemplate title="About" code="au">
      <p>
        We are a collective working at the edges of form, material, and idea.
      </p>
      <p>
        Based somewhere between places. Working across disciplines.
      </p>
    </PageTemplate>
  );
}
