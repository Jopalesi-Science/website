"use client";

import PageTemplate from "@/components/PageTemplate";
import { useI18n }  from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <PageTemplate title={t.nav.contact} code="contact">
      <p>{t.contact.intro}</p>
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
