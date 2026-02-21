import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Program — Jopalesi",
};

export default function ProgramPage() {
  return (
    <PageTemplate title="Program" code="pro">
      <p>
        Current and upcoming projects, events, and collaborations.
      </p>
      <p>
        Nothing announced yet.
      </p>
    </PageTemplate>
  );
}
