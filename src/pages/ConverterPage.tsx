import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { UploadArea } from '../components/converter/UploadArea';
import { ImageEditor } from '../components/converter/ImageEditor';
import { ResultView } from '../components/converter/ResultView';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { AdSlot } from '../components/layout/AdSlot';
import type { EditorState, ImageFile, ProcessingOptions, ProcessedImage } from '@/types';
import { processImage } from '@/services/imageProcessor';
import { createImageFromUrl } from '@/utils/helpers';
import { AlertCircle } from 'lucide-react';

export default function ConverterPage() {
  const [state, setState] = useState<EditorState>('idle');
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageFile?.previewUrl) {
        URL.revokeObjectURL(imageFile.previewUrl);
      }
      if (processedImage?.url) {
        URL.revokeObjectURL(processedImage.url);
      }
    };
  }, [imageFile, processedImage]);

  const handleFileSelected = (file: ImageFile) => {
    setImageFile(file);
    setState('editing');
    setError(null);
    try {
      import('@/services/analytics').then(({ trackEvent }) => trackEvent('upload_completed')).catch(() => {});
    } catch(e) {}
  };

  const handleProcess = async (options: ProcessingOptions) => {
    if (!imageFile) return;
    
    setState('processing');
    setError(null);
    try {
      import('@/services/analytics').then(({ trackEvent }) => trackEvent('conversion_started')).catch(() => {});
    } catch(e) {}

    try {
      const imageElement = await createImageFromUrl(imageFile.previewUrl);
      imageElement.alt = imageFile.name;
      const result = await processImage(imageElement, options);
      
      setProcessedImage(result);
      setState('ready');
      
      // Auto-trigger native mobile sharing popup synchronously within the active user gesture
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          const fileToShare = new File([result.blob], result.filename, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
            await navigator.share({
              files: [fileToShare],
              title: 'Ray-Ban Meta Story',
              text: 'Shot on Ray-Ban Meta',
            });
          }
        } catch (shareErr) {
          console.log('Share dismissed or handled:', shareErr);
        }
      }

      try {
        import('@/services/analytics').then(({ trackEvent }) => trackEvent('conversion_completed')).catch(() => {});
      } catch(e) {}
    } catch (err) {
      console.error('Processing error:', err);
      setError('An error occurred while processing your photo. Please try again.');
      setState('editing');
    }
  };

  const handleBack = () => {
    setState('idle');
    setImageFile(null);
    setError(null);
  };

  const handleCreateAnother = () => {
    if (imageFile?.previewUrl) URL.revokeObjectURL(imageFile.previewUrl);
    if (processedImage?.url) URL.revokeObjectURL(processedImage.url);
    
    setImageFile(null);
    setProcessedImage(null);
    setState('idle');
    setError(null);
  };

  return (
    <div className="relative w-full min-h-[85vh] py-8 sm:py-14 px-4 sm:px-6 overflow-hidden">
      <Helmet>
        <title>Photo Converter — MetaShot</title>
        <meta name="description" content="Process and optimize your photos for Instagram Stories with MetaShot's browser-based converter. Ray-Ban Meta tags, 3:4 framing, 100% private." />
      </Helmet>

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Ad Slot */}
        <AdSlot slot="converter-ad-top" size="md" />

        {state === 'idle' && (
          <UploadArea onFileSelected={handleFileSelected} />
        )}

        {(state === 'editing' || state === 'processing') && imageFile && (
          <div className="relative">
            {error && (
              <div className="mb-6 p-4 rounded-2xl glass-panel bg-red-950/20 border border-red-500/30 text-red-400 text-sm flex items-center justify-center gap-2 backdrop-blur-xl shadow-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}
            
            <ImageEditor
              imageFile={imageFile}
              onProcess={handleProcess}
              onBack={handleBack}
              isProcessing={state === 'processing'}
            />
            
            {state === 'processing' && <LoadingOverlay />}
          </div>
        )}

        {state === 'ready' && processedImage && (
          <ResultView
            processedImage={processedImage}
            onCreateAnother={handleCreateAnother}
          />
        )}

        {/* Bottom Ad Slot */}
        <AdSlot slot="converter-ad-bottom" size="banner" />
      </div>
    </div>
  );
}
