import React from 'react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolPageClient } from '@/components/shared/ToolPageClient';

export function generateStaticParams() {
  return TOOLS_LIST.flatMap((tool) => [
    { toolSlug: tool.slug },
    { toolSlug: tool.id },
  ]);
}

export default function ToolSlugPage({ params }: { params: { toolSlug: string } }) {
  return <ToolPageClient toolId={params.toolSlug} />;
}
