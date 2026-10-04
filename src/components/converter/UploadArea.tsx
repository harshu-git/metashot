import { useState, useRef } from 'react';
import { Image as ImageIcon, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import type { ImageFile } from '../../types';
import { isValidImageType, isFileTooLarge, getImageDimensions, MAX_FILE_SIZE_MB } from '../../utils/helpers';
import { Button } from '../ui/Button';

interface UploadAreaProps {
  onFileSelected: (imageFile: ImageFile) => void;
}

export function UploadArea({ onFileSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setIsLoadingFile(true);
    
    if (!isValidImageType(file)) {
      setError('Invalid file format. Please upload JPG, PNG, WEBP, or HEIC.');
      setIsLoadingFile(false);
      return;
    }
    
    if (isFileTooLarge(file)) {
      setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
      setIsLoadingFile(false);
      return;
    }
    
    try {
      let processedFile = file;
      
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (ext === '.heic' || ext === '.heif' || file.type === 'image/heic' || file.type === 'image/heif') {
        try {
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          processedFile = new File([blob], file.name.replace(/\.hei[cf]$/i, '.jpg'), { type: 'image/jpeg' });
        } catch (err) {
          setError('Failed to process HEIC photo. Please try a JPG or PNG.');
          setIsLoadingFile(false);
          return;
        }
      }

      const dimensions = await getImageDimensions(processedFile);
      const previewUrl = URL.createObjectURL(processedFile);
      
      onFileSelected({
        file: processedFile,
        previewUrl,
        name: processedFile.name,
        width: dimensions.width,
        height: dimensions.height,
        size: processedFile.size,
        type: processedFile.type
      });
    } catch (err) {
      setError('Failed to load image. Please select another photo.');
    } finally {
      setIsLoadingFile(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div 
        className={`w-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer p-6 sm:p-12 relative overflow-hidden group touch-manipulation backdrop-blur-2xl
          ${isDragging 
            ? 'bg-indigo-950/40 border-indigo-400 scale-[1.01] shadow-2xl shadow-indigo-500/25' 
            : 'glass-panel-interactive border-white/[0.12] hover:border-indigo-500/50 shadow-2xl'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Subtle background radial glow */}
        <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none group-hover:opacity-100 transition-opacity" />

        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
          onChange={handleFileInput}
        />
        
        {error ? (
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-1">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Unable to Load Image</h3>
              <p className="text-red-400/90 text-sm max-w-sm">{error}</p>
            </div>
            <Button variant="secondary" size="md" onClick={(e) => { e.stopPropagation(); setError(null); }}>
              Select Another Photo
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-5 relative z-10 pointer-events-none">
            {/* Animated Icon Container */}
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl
              ${isDragging 
                ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white scale-110 shadow-indigo-500/40' 
                : 'glass-card-subtle text-indigo-400 border border-white/[0.12] group-hover:border-indigo-500/50 group-hover:scale-105'}`}>
              {isLoadingFile ? (
                <div className="w-9 h-9 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ImageIcon className="w-10 h-10" />
              )}
            </div>
            
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isLoadingFile ? 'Decoding photo in browser...' : 'Choose your photo'}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Tap anywhere to browse from gallery or camera roll
              </p>
            </div>

            {/* Format Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              {['JPG', 'PNG', 'WEBP', 'Apple HEIC'].map((format) => (
                <span 
                  key={format}
                  className="px-3 py-1 rounded-xl glass-pill text-zinc-300 font-medium"
                >
                  {format}
                </span>
              ))}
            </div>

            {/* Visual Action Button */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-[1.02] transition-all border border-white/20 animate-shimmer">
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Select Photo</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Privacy Badge */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 glass-pill px-4 py-2 rounded-full border border-white/[0.08] shadow-md">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>100% On-Device Processing. No photos are uploaded to any server.</span>
      </div>
    </div>
  );
}
