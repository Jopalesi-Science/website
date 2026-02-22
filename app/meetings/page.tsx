"use client";

import PageTemplate from "@/components/PageTemplate";
import { useI18n }  from "@/lib/i18n";

export default function MeetingsPage() {
  const { t } = useI18n();
  return (
    <PageTemplate title={t.nav.meetings} code="meetings">
      <p>{t.meetings.intro}</p>
    </PageTemplate>
  );
}
