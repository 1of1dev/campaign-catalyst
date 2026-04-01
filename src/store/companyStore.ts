import { create } from 'zustand';

export interface Company {
  id: string;
  name: string;
  industry: string;
  logo?: string;
  website?: string;
  socialLinks?: { twitter?: string; linkedin?: string; instagram?: string };
}

interface CompanyState {
  companies: Company[];
  activeCompany: Company | null;
  isLoading: boolean;
  setActiveCompany: (company: Company) => void;
  fetchCompanies: () => Promise<void>;
  createCompany: (data: Partial<Company>) => Promise<void>;
  updateCompany: (id: string, data: Partial<Company>) => Promise<void>;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'Acme Corp', industry: 'Technology', website: 'https://acme.com' },
  { id: '2', name: 'Stellar Marketing', industry: 'Marketing', website: 'https://stellar.io' },
];

export const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  activeCompany: null,
  isLoading: false,

  setActiveCompany: (company) => set({ activeCompany: company }),

  fetchCompanies: async () => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));
    set({ companies: mockCompanies, activeCompany: mockCompanies[0], isLoading: false });
  },

  createCompany: async (data) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    const newCompany: Company = { id: Date.now().toString(), name: data.name || '', industry: data.industry || '', ...data };
    set((s) => ({ companies: [...s.companies, newCompany], isLoading: false }));
  },

  updateCompany: async (id, data) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    set((s) => ({
      companies: s.companies.map((c) => (c.id === id ? { ...c, ...data } : c)),
      activeCompany: s.activeCompany?.id === id ? { ...s.activeCompany, ...data } : s.activeCompany,
      isLoading: false,
    }));
  },
}));
