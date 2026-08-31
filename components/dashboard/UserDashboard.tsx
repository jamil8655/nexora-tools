'use client';

import React from 'react';
import AccountPage from '@/app/account/page';

/**
 * Re-exports the unified Account & User Hub component to eliminate duplicate user dashboard state.
 */
export function UserDashboard() {
  return <AccountPage />;
}
