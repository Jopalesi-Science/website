"use client";

import PageTemplate from "@/components/PageTemplate";
import { useI18n }  from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <PageTemplate title={t.about.title}>
      <p style={{ whiteSpace: "pre-line" }}>{t.about.body}</p>
    </PageTemplate>
  );
}
