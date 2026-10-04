import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { ArrowLeft, RotateCcw, RotateCw, Sparkles, ZoomIn, ZoomOut, RefreshCw, Glasses, Check, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
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
      {/* File Info Glass Bar */}
      <div className="flex justify-between items-center glass-panel px-4 py-2.5 rounded-2xl border border-white/[0.08] text-xs sm:text-sm text-zinc-300">
        <div className="flex items-center gap-2 truncate max-w-[60%]">
          <ImageIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate font-medium text-zinc-200">{imageFile.name}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-zinc-400 text-xs bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.05]">
            {imageFile.width} × {imageFile.height}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.08] active:scale-90 transition-all"
            title="Reset crop & rotation"
            aria-label="Reset crop and rotation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Cropper Container - Inspira Framed Studio View */}
      <div className="relative w-full h-[40vh] min-h-[280px] max-h-[480px] md:h-[460px] rounded-2xl overflow-hidden bg-[#070709] border border-white/[0.08] shadow-2xl touch-none group">
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
            containerStyle: { background: '#070709' },
            cropAreaStyle: { 
              border: '2px solid rgba(129, 140, 248, 0.9)', 
              borderRadius: '12px',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65), 0 0 25px rgba(99, 102, 241, 0.35)'
            }
          }}
        />
        
        {/* Subtle Orientation Watermark */}
        <div className="absolute bottom-3 right-3 pointer-events-none z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 font-mono">
          <Glasses className="w-3 h-3 text-indigo-400" />
          <span>Meta 3:4 Viewport</span>
        </div>
      </div>
      
      {/* Inspira Controls Studio Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col space-y-6 border border-white/[0.08] shadow-2xl">
        
        {/* Meta Device Profile Selector */}
        <div className="flex flex-col space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Glasses className="w-4 h-4" />
              Meta Camera Hardware Profile
            </label>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">Emulates authentic lens metadata</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(META_PROFILES).map((profile) => {
              const isSelected = selectedProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-start justify-between relative overflow-hidden active:scale-[0.99] backdrop-blur-xl
                    ${isSelected 
                      ? 'bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-indigo-950/50 border-indigo-500/80 text-white shadow-xl shadow-indigo-950/50 ring-1 ring-indigo-500/50' 
                      : 'glass-card-subtle text-zinc-400 hover:text-zinc-200 hover:border-white/[0.18]'}`}
                >
                  <div className="pr-2">
                    <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                      {profile.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                      {profile.lensModel}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aspect Ratio Presets */}
        <div className="flex flex-col space-y-2.5 pt-4 border-t border-white/[0.06]">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              Framing & Crop Presets
            </label>
            <span className="text-[11px] text-indigo-400 font-medium glass-pill px-2.5 py-0.5 rounded-full border border-indigo-500/25">
              3:4 Recommended for Stories
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {CROP_PRESETS.map((preset) => {
              const isSelected = aspect === preset.value;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setAspect(preset.value)}
                  className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 text-center flex flex-col items-center justify-center gap-0.5 backdrop-blur-xl
                    ${isSelected 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40' 
                      : 'glass-pill text-zinc-300 hover:text-white hover:bg-white/[0.09]'}`}
                >
                  <span>{preset.label}</span>
                  {preset.label.includes('3:4') && (
                    <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90">Glasses</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zoom & Rotation Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-white/[0.06]">
          {/* Zoom Control */}
          <div className="flex flex-col space-y-2.5">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                Zoom
              </label>
              <span className="text-indigo-400 font-mono font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 text-xs">
                {zoom.toFixed(1)}x
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustZoom(-0.2)}
                className="w-10 h-10 flex items-center justify-center rounded-xl glass-pill hover:bg-white/[0.1] text-zinc-300 border border-white/[0.1] active:scale-90 transition-all shrink-0"
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
                className="w-full accent-indigo-500 bg-white/[0.08] rounded-lg h-2 appearance-none cursor-pointer"
                aria-label="Zoom level"
              />
              <button
                type="button"
                onClick={() => adjustZoom(0.2)}
                className="w-10 h-10 flex items-center justify-center rounded-xl glass-pill hover:bg-white/[0.1] text-zinc-300 border border-white/[0.1] active:scale-90 transition-all shrink-0"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rotate Control */}
          <div className="flex flex-col space-y-2.5">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                Rotate Angle
              </label>
              <span className="text-zinc-300 font-mono text-xs glass-pill px-2.5 py-0.5 rounded-md border border-white/[0.08]">
                {rotation}°
              </span>
            </div>
            <div className="flex gap-2.5">
              <button 
                type="button"
                onClick={() => setRotation(r => r - 90)}
                className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl glass-pill hover:bg-white/[0.1] text-zinc-300 border border-white/[0.1] text-xs sm:text-sm font-medium active:scale-95 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                -90°
              </button>
              <button 
                type="button"
                onClick={() => setRotation(r => r + 90)}
                className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl glass-pill hover:bg-white/[0.1] text-zinc-300 border border-white/[0.1] text-xs sm:text-sm font-medium active:scale-95 transition-all"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                +90°
              </button>
            </div>
          </div>
        </div>

        {/* Quality Control Slider */}
        <div className="flex flex-col space-y-2 pt-4 border-t border-white/[0.06]">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <label className="font-semibold uppercase tracking-wider text-zinc-400 text-xs">
              Output JPEG Quality
            </label>
            <span className="text-indigo-400 font-mono font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 text-xs">
              {quality}%
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            step={1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-white/[0.08] rounded-lg h-2 appearance-none cursor-pointer"
            aria-label="Output quality"
          />
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Faster export</span>
            <span className="text-indigo-400 font-medium">Ultra HD Clarity (Recommended)</span>
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
          variant="glow" 
          size="lg" 
          onClick={handleProcess} 
          isLoading={isProcessing}
          icon={<Sparkles className="w-5 h-5" />}
          className="flex-1 h-12 text-base font-semibold rounded-xl shadow-xl shadow-indigo-600/30"
        >
          Generate Meta Photo
        </Button>
      </div>
    </div>
  );
}

export default ImageEditor;
