import * as React from 'react';

import Dashboard from '@/components/dashboard';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <Dashboard>
      {children}
    </Dashboard>
  )
}
