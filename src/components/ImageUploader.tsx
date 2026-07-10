import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label = 'Pilih atau Tarik Gambar ke Sini' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, dsb).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Convert to base64, 0.7 quality for JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          onChange(dataUrl);
        }
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2 text-secondary">{label}</label>
      
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-border group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => onChange('')}
              className="bg-danger text-white p-2 rounded-full hover:scale-110 transition-transform"
              title="Hapus Gambar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer text-center h-40
            ${isDragging ? 'border-accent-primary bg-accent-primary/10' : 'border-border hover:border-accent-primary hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-3 bg-gray-100 rounded-full text-secondary">
            <UploadCloud size={28} />
          </div>
          <div>
            <span className="font-semibold text-accent-primary">Klik untuk unggah</span>
            <span className="text-secondary"> atau drag and drop file</span>
          </div>
          <div className="text-xs text-secondary">JPG, PNG, GIF (Maks. otomatis dikompres)</div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
