import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore, type CampaignType } from '@/store/campaignStore';
import { Upload, X, Loader2 } from 'lucide-react';

export default function CampaignCreate() {
  const navigate = useNavigate();
  const { createCampaign, isLoading } = useCampaignStore();

  const [name, setName] = useState('');
  const [type, setType] = useState<CampaignType>('product');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((f) => {
      const url = URL.createObjectURL(f);
      setImages((prev) => [...prev, url]);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach((f) => {
      const url = URL.createObjectURL(f);
      setImages((prev) => [...prev, url]);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const campaign = await createCampaign({ name, type, description, startDate, endDate, images });
    navigate(`/campaigns/${campaign.id}`);
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <h1 className="page-header">Create Campaign</h1>
      <p className="page-subheader mb-6">Set up a new marketing campaign</p>

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground">Campaign Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as CampaignType)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-foreground">Images</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop images or click to browse</p>
            <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          {images.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-border">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-0.5 right-0.5 p-0.5 bg-foreground/60 rounded-full text-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isLoading} className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Campaign'}
          </button>
          <button type="button" onClick={() => navigate('/campaigns')} className="h-10 px-6 rounded-lg border border-input bg-card text-sm font-medium text-foreground hover:bg-muted transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
