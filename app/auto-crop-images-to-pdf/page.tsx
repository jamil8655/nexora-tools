import React from 'react';
import { Metadata } from 'next';
import { AutoCropImagesToPdfStudio } from '@/components/image/AutoCropImagesToPdfStudio';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Auto Cut Images to PDF — Smart Multi-Image Crop & Numbered PDF Maker',
  description: 'Upload multiple document photos or scans, split half pages (top/bottom, left/right), trim margins, and generate a cleanly formatted, numbered PDF document.',
};

export default function AutoCropImagesToPdfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Image Studio', href: '/tools?cat=image' },
          { label: 'Auto Cut Images to PDF' },
        ]}
      />
      <AutoCropImagesToPdfStudio />
    </div>
  );
}
