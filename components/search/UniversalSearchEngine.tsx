'use client';

import React from 'react';
import { UnifiedSearchModal } from './UnifiedSearchModal';

interface UniversalSearchEngineProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function UniversalSearchEngine(props: UniversalSearchEngineProps) {
  return <UnifiedSearchModal {...props} />;
}
