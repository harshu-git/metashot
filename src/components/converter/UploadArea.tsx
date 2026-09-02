import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
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
    <div className="w-full">
      <div 
        className={`w-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer p-6 sm:p-10 active:scale-[0.99] touch-manipulation
          ${isDragging 
            ? 'bg-indigo-950/20 border-indigo-500 scale-[1.01]' 
            : 'bg-[#111]/80 border-[#2a2a2a] hover:border-indigo-500/50 hover:bg-[#151515]'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
          onChange={handleFileInput}
        />
        
        {error ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-1">Upload Failed</h3>
              <p className="text-red-400 text-sm max-w-sm">{error}</p>
            </div>
            <Button variant="secondary" size="md" onClick={(e) => { e.stopPropagation(); setError(null); }}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 pointer-events-none">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-colors duration-200 shadow-inner
              ${isDragging ? 'bg-indigo-500 text-white shadow-indigo-500/30' : 'bg-[#1e1e1e] text-indigo-400 border border-[#2e2e2e]'}`}>
              {isLoadingFile ? (
                <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {isLoadingFile ? 'Loading photo...' : 'Select your photo'}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base">
                Tap to browse from gallery or camera
              </p>
              <p className="text-zinc-500 text-xs sm:text-sm pt-1">
                Supports JPG, PNG, WEBP, HEIC (up to {MAX_FILE_SIZE_MB}MB)
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-indigo-600/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-4 h-4" />
                Choose Photo
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
