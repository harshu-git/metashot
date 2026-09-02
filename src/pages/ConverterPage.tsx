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
    <div className="w-full min-h-screen bg-[#0a0a0a] py-8 sm:py-16 px-4 sm:px-6">
      <Helmet>
        <title>Photo Converter — MetaShot</title>
        <meta name="description" content="Process and optimize your photos for Instagram with MetaShot's browser-based converter. No uploads, no accounts needed." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Ad Slot 1 (Top) */}
        <AdSlot slot="converter-ad-top" size="md" />

        {state === 'idle' && (
          <UploadArea onFileSelected={handleFileSelected} />
        )}

        {(state === 'editing' || state === 'processing') && imageFile && (
          <div className="relative">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
                {error}
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

        {/* Ad Slot 2 (Bottom) */}
        <AdSlot slot="converter-ad-bottom" size="banner" />
      </div>
    </div>
  );
}
