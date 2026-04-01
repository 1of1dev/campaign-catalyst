import { create } from 'zustand';

export type CampaignStatus = 'draft' | 'analysis' | 'strategy' | 'content' | 'approved' | 'published';
export type CampaignType = 'product' | 'service';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  description: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  images: string[];
  companyId: string;
  analysis?: string;
  strategy?: CampaignStrategy;
  content?: GeneratedContent[];
}

export interface CampaignStrategy {
  platforms: string[];
  budget: number;
  duration: string;
  postType: 'organic' | 'ads' | 'hybrid';
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  date: string;
  platform: string;
  type: string;
}

export interface GeneratedContent {
  id: string;
  platform: string;
  caption: string;
  imageUrl?: string;
}

interface CampaignState {
  campaigns: Campaign[];
  isLoading: boolean;
  fetchCampaigns: () => Promise<void>;
  createCampaign: (data: Partial<Campaign>) => Promise<Campaign>;
  updateCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  runAnalysis: (id: string) => Promise<void>;
  generateStrategy: (id: string) => Promise<void>;
  generateContent: (id: string) => Promise<void>;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1', name: 'Summer Product Launch', type: 'product', description: 'Launch campaign for our new summer collection',
    status: 'content', startDate: '2026-04-15', endDate: '2026-05-15', images: [], companyId: '1',
    analysis: '## Market Analysis\n\n### Key Findings\n- Target demographic: 25-40 professionals\n- Peak engagement: Tues-Thurs, 10am-2pm\n- Top hashtags: #SummerLaunch #NewCollection #TechStyle\n\n### Audience Insights\n| Segment | Size | Engagement |\n|---------|------|------------|\n| Young Professionals | 45% | High |\n| Tech Enthusiasts | 30% | Medium |\n| Early Adopters | 25% | Very High |\n\n### Trends\n- Video content performing 3x better than static\n- Stories driving 40% more engagement\n- User-generated content boosting trust by 60%',
    strategy: { platforms: ['Instagram', 'LinkedIn', 'Twitter'], budget: 5000, duration: '30 days', postType: 'hybrid', schedule: [
      { date: '2026-04-15', platform: 'Instagram', type: 'Story' },
      { date: '2026-04-16', platform: 'LinkedIn', type: 'Article' },
      { date: '2026-04-17', platform: 'Twitter', type: 'Thread' },
      { date: '2026-04-18', platform: 'Instagram', type: 'Reel' },
      { date: '2026-04-20', platform: 'LinkedIn', type: 'Post' },
      { date: '2026-04-22', platform: 'Twitter', type: 'Poll' },
    ] },
    content: [
      { id: 'c1', platform: 'Instagram', caption: '🚀 Exciting news! Our summer collection is here. Discover cutting-edge designs that blend style with innovation. #SummerLaunch #NewCollection' },
      { id: 'c2', platform: 'LinkedIn', caption: 'We\'re thrilled to announce our latest product line. Built with the modern professional in mind, our summer collection combines functionality with sleek design.' },
      { id: 'c3', platform: 'Twitter', caption: 'The wait is over! ☀️ Our summer collection just dropped. Check it out → #TechStyle #SummerVibes' },
    ],
  },
  {
    id: '2', name: 'Brand Awareness Q2', type: 'service', description: 'Quarterly brand awareness campaign',
    status: 'analysis', startDate: '2026-04-01', endDate: '2026-06-30', images: [], companyId: '1',
  },
  {
    id: '3', name: 'Holiday Special', type: 'product', description: 'End of year holiday promotions',
    status: 'draft', startDate: '2026-11-15', endDate: '2026-12-31', images: [], companyId: '1',
  },
];

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  isLoading: false,

  fetchCampaigns: async () => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));
    set({ campaigns: mockCampaigns, isLoading: false });
  },

  createCampaign: async (data) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    const campaign: Campaign = {
      id: Date.now().toString(), name: data.name || '', type: data.type || 'product',
      description: data.description || '', status: 'draft', startDate: data.startDate || '',
      endDate: data.endDate || '', images: data.images || [], companyId: data.companyId || '1',
    };
    set((s) => ({ campaigns: [...s.campaigns, campaign], isLoading: false }));
    return campaign;
  },

  updateCampaign: async (id, data) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 400));
    set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...data } : c)), isLoading: false }));
  },

  deleteCampaign: async (id) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 400));
    set((s) => ({ campaigns: s.campaigns.filter((c) => c.id !== id), isLoading: false }));
  },

  runAnalysis: async (id) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 2000));
    const analysis = '## Market Analysis\n\n### Key Findings\n- Strong market opportunity identified\n- Target audience highly engaged on social media\n- Competitor analysis reveals content gaps\n\n### Recommendations\n1. Focus on video content\n2. Leverage influencer partnerships\n3. Optimize posting schedule for peak engagement';
    set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, analysis, status: 'analysis' as CampaignStatus } : c)), isLoading: false }));
  },

  generateStrategy: async (id) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 1500));
    const strategy: CampaignStrategy = {
      platforms: ['Instagram', 'LinkedIn', 'Twitter'], budget: 3000, duration: '30 days', postType: 'hybrid',
      schedule: [
        { date: '2026-04-15', platform: 'Instagram', type: 'Post' },
        { date: '2026-04-17', platform: 'LinkedIn', type: 'Article' },
        { date: '2026-04-19', platform: 'Twitter', type: 'Thread' },
      ],
    };
    set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, strategy, status: 'strategy' as CampaignStatus } : c)), isLoading: false }));
  },

  generateContent: async (id) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 2000));
    const content: GeneratedContent[] = [
      { id: 'g1', platform: 'Instagram', caption: '✨ Discover something new today. Our latest offering is designed with you in mind. #Innovation' },
      { id: 'g2', platform: 'LinkedIn', caption: 'We are excited to share our newest initiative. Designed for modern professionals seeking excellence.' },
    ];
    set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, content, status: 'content' as CampaignStatus } : c)), isLoading: false }));
  },
}));
