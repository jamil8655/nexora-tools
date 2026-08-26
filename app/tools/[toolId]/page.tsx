import React from 'react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolPageClient } from '@/components/shared/ToolPageClient';

export function generateStaticParams() {
  return TOOLS_LIST.flatMap((tool) => [
    { toolId: tool.id },
    { toolId: tool.slug },
  ]);
}

export default function ToolPage({ params }: { params: { toolId: string } }) {
  return <ToolPageClient toolId={params.toolId} />;
}
