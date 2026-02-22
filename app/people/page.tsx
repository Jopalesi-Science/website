"use client";

import PageTemplate from "@/components/PageTemplate";
import { useI18n }  from "@/lib/i18n";

export default function PeoplePage() {
  const { t } = useI18n();
  return <PageTemplate title={t.nav.people} code="people" />;
}
