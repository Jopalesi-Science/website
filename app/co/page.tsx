import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Contact — Jopalesi",
};

export default function ContactPage() {
  return (
    <PageTemplate title="Contact" code="co">
      <p>
        For enquiries, proposals, and correspondence.
      </p>
      <p>
        <a
          href="mailto:hello@jopalesi.com"
          className="underline underline-offset-4 hover:opacity-100 opacity-70 transition-opacity"
        >
          hello@jopalesi.com
        </a>
      </p>
    </PageTemplate>
  );
}
