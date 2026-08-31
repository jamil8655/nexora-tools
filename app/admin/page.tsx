import React from 'react';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AdminGuard } from '@/lib/auth/admin-guard';
import { LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminGuard>
        <Breadcrumbs items={[{ label: 'System Admin Dashboard' }]} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              NEXORA Pro Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              System performance telemetry, storage limits, global feature switches, and audit logs
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>System Healthy • Node 24.19</span>
          </div>
        </div>

        <AdminAnalytics />
      </AdminGuard>
    </div>
  );
}
