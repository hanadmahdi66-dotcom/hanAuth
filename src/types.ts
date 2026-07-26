export interface UserAccount {
  user_id: string;
  email: string;
  created_at: string;
  plan?: string;
  organization?: string;
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  user_id: string;
  created_at: string;
  status: 'active' | 'revoked' | 'expired';
  prefix: string;
  last_used?: string;
  environment: 'live' | 'test';
  permissions?: string[];
  requests_count?: number;
}

export type ViewState = 'landing' | 'register' | 'login' | 'dashboard';

export type DashboardTab = 'keys' | 'playground' | 'logs' | 'analytics' | 'docs' | 'settings';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

export interface ApiLogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  method: 'POST' | 'GET' | 'DELETE';
  status: number;
  ip: string;
  latency: number;
  key_prefix: string;
}
