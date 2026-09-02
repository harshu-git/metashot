import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { ArrowLeft, RotateCcw, RotateCw, Sparkles, ZoomIn, ZoomOut, RefreshCw, Glasses, Check } from 'lucide-react';
import type { ImageFile, ProcessingOptions, CropArea } from '../../types';
import { CROP_PRESETS, DEFAULT_QUALITY } from '../../utils/helpers';
import { META_PROFILES } from '../../services/metadataProcessor';
import { Button } from '../ui/Button';

interface ImageEditorProps {
  imageFile: ImageFile;
  onProcess: (options: ProcessingOptions) => void;
  onBack: () => void;
  isProcessing: boolean;
}

export function ImageEditor({ imageFile, onProcess, onBack, isProcessing }: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [aspect, setAspect] = useState<number | undefined>(3 / 4); // Default to 3:4 (standard Ray-Ban Meta orientation)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [selectedProfile, setSelectedProfile] = useState('rayban_meta_gen2');

  const handleProcess = () => {
    const activeCrop = croppedAreaPixels || {
      x: 0,
      y: 0,
      width: imageFile.width || 1080,
      height: imageFile.height || 1440,
    };

    onProcess({
      crop: activeCrop,
      zoom,
      rotation,
      quality,
      outputFormat: 'image/jpeg',
      profileId: selectedProfile,
    });
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(3 / 4);
  };

  const adjustZoom = (delta: number) => {
    setZoom((prev) => Math.min(3, Math.max(1, parseFloat((prev + delta).toFixed(1)))));
  };

  return (
    <div className="w-full flex flex-col space-y-4 sm:space-y-6">
      {/* File Info Bar */}
      <div className="flex justify-between items-center bg-[#141414] px-4 py-2.5 rounded-xl border border-[#222] text-xs sm:text-sm text-zinc-400">
        <span className="truncate max-w-[55%] font-medium text-zinc-300">{imageFile.name}</span>
        <div className="flex items-center gap-3 shrink-0">
          <span>{imageFile.width} × {imageFile.height}</span>
          <button
            onClick={handleReset}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-[#222] transition-colors"
            title="Reset crop & rotation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Cropper Container - Optimized for mobile viewport */}
      <div className="relative w-full h-[38vh] min-h-[260px] max-h-[460px] md:h-[450px] rounded-2xl overflow-hidden bg-[#0d0d0d] border border-[#222] touch-none">
        <Cropper
          image={imageFile.previewUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          showGrid={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
          classes={{ containerClassName: 'rounded-2xl' }}
          style={{
            containerStyle: { background: '#0d0d0d' },
            cropAreaStyle: { border: '2px solid rgba(99, 102, 241, 0.8)', borderRadius: '8px' }
          }}
        />
      </div>
      
      {/* Controls Card */}
      <div className="bg-[#141414] rounded-2xl p-4 sm:p-6 flex flex-col space-y-5 border border-[#222] shadow-xl">
        
        {/* Meta Device Profile Selector */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Glasses className="w-4 h-4" />
              Meta Camera Profile
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.values(META_PROFILES).map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => setSelectedProfile(profile.id)}
                className={`p-3 rounded-xl text-left transition-all duration-150 border flex items-start justify-between
                  ${selectedProfile === profile.id 
                    ? 'bg-indigo-950/30 border-indigo-500 text-white shadow-sm' 
                    : 'bg-[#1a1a1a] border-[#282828] text-zinc-400 hover:text-zinc-200 hover:bg-[#202020]'}`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    {profile.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    {profile.lensModel}
                  </div>
                </div>
                {selectedProfile === profile.id && (
                  <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio Presets */}
        <div className="flex flex-col space-y-2 pt-2 border-t border-[#222]">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Crop Presets</label>
            <span className="text-xs text-zinc-500">3:4 Meta glasses standard</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CROP_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setAspect(preset.value)}
                className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 text-center
                  ${aspect === preset.value 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'bg-[#1e1e1e] text-zinc-400 hover:text-zinc-200 hover:bg-[#282828] border border-[#2a2a2a]'}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom & Rotation Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 border-t border-[#222]">
          {/* Zoom */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs">Zoom</label>
              <span className="text-indigo-400 font-mono font-medium">{zoom.toFixed(1)}x</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustZoom(-0.2)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1e1e1e] hover:bg-[#282828] text-zinc-300 border border-[#2a2a2a] active:scale-95 shrink-0"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-[#222] rounded-lg h-2 appearance-none cursor-pointer"
              />
              <button
                type="button"
                onClick={() => adjustZoom(0.2)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1e1e1e] hover:bg-[#282828] text-zinc-300 border border-[#2a2a2a] active:scale-95 shrink-0"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rotate */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs">Rotate</label>
              <span className="text-zinc-500 font-mono text-xs">{rotation}°</span>
            </div>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setRotation(r => r - 90)}
                className="flex-1 h-9 flex items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] text-zinc-300 border border-[#2a2a2a] text-xs sm:text-sm font-medium active:scale-95 transition-transform"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                -90°
              </button>
              <button 
                type="button"
                onClick={() => setRotation(r => r + 90)}
                className="flex-1 h-9 flex items-center justify-center gap-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] text-zinc-300 border border-[#2a2a2a] text-xs sm:text-sm font-medium active:scale-95 transition-transform"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                +90°
              </button>
            </div>
          </div>
        </div>

        {/* Quality Slider */}
        <div className="flex flex-col space-y-2 pt-2 border-t border-[#222]">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs">Output Quality</label>
            <span className="text-indigo-400 font-mono font-medium">{quality}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            step={1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-[#222] rounded-lg h-2 appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Faster file size</span>
            <span>Ultra HD (Recommended)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={onBack} 
          icon={<ArrowLeft className="w-4 h-4" />}
          className="shrink-0 px-4 sm:px-6 h-12 rounded-xl"
        >
          Back
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleProcess} 
          isLoading={isProcessing}
          icon={<Sparkles className="w-5 h-5" />}
          className="flex-1 h-12 text-base font-semibold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
        >
          Generate Meta Photo
        </Button>
      </div>
    </div>
  );
}
