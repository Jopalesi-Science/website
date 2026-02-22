"use client";

import PageTemplate from "@/components/PageTemplate";
import { useI18n }  from "@/lib/i18n";

export default function ProjectsPage() {
  const { t } = useI18n();
  return <PageTemplate title={t.nav.projects} code="projects" />;
}
