'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { TOOLS_LIST } from '@/lib/tools-config';
import ToolPage from '../tools/[toolId]/page';

export default function ToolSlugPage() {
  const params = useParams();
  const toolSlug = params.toolSlug as string;

  const matchedTool = TOOLS_LIST.find(
    (t) => t.slug === toolSlug || t.id === toolSlug
  );

  if (!matchedTool) {
    notFound();
  }

  return <ToolPage />;
}
