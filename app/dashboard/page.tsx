'use client';

import React from 'react';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'User Dashboard' }]} />
      <UserDashboard />
    </div>
  );
}
