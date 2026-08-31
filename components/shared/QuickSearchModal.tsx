'use client';

import React from 'react';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function QuickSearchModal(props: QuickSearchModalProps) {
  return <UnifiedSearchModal {...props} />;
}
