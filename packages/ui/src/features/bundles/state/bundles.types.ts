import type { EntityState } from '@reduxjs/toolkit';

export interface Bundle {
  id: string;
  loading: boolean;
  error: string | null;
  content: string | null;
}

export interface BundlesState {
  data: EntityState<Bundle>;
}

export interface CreateBundleInput {
  cellId: string;
  code: string;
}
