export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Job {
  id: string;
  userId: string;
  name: string;
  description: string;
  address?: string;
  customerName?: string;
  createdAt: Date;
  updatedAt: Date;
  photos: string[];
  notes: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  unit: string;
}

export interface InspectionReport {
  id: string;
  jobId: string;
  type: 'boiler' | 'pump' | 'heat_exchanger' | 'mua';
  findings: string;
  photos: string[];
  signature?: string;
  createdAt: Date;
}
