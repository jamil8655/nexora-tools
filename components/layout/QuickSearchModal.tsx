'use client';

import React from 'react';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Re-exports the canonical UnifiedSearchModal for backwards compatibility and deduplication.
 */
export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  return <UnifiedSearchModal isOpen={isOpen} onClose={onClose} />;
}
