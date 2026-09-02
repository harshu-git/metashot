import type { ProcessingOptions, ProcessedImage } from '../types';
import { canvasToBlob, generateOutputFilename } from '../utils/helpers';
import { getMetadataProcessor, META_PROFILES } from './metadataProcessor';

export function getRotatedBoundingBox(width: number, height: number, rotation: number) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

// Ray-Ban Meta native hardware resolution (12MP 3:4 sensor)
const META_TARGET_WIDTH = 3024;
const META_TARGET_HEIGHT = 4032;

export async function processImage(
  source: HTMLImageElement,
  options: ProcessingOptions
): Promise<ProcessedImage> {
  const { crop, rotation, quality, outputFormat, profileId = 'rayban_meta_gen2' } = options;
  const activeProfile = META_PROFILES[profileId] || META_PROFILES.rayban_meta_gen2;
  
  const naturalWidth = source.naturalWidth || source.width || 1080;
  const naturalHeight = source.naturalHeight || source.height || 1440;

  // Step 1: Create a source canvas with the rotated full image
  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = getRotatedBoundingBox(
    naturalWidth,
    naturalHeight,
    rotation
  );
  
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bBoxWidth);
  canvas.height = Math.round(bBoxHeight);
  const ctx = canvas.getContext('2d', { willReadFrequently: false });
  
  if (!ctx) {
    throw new Error('Canvas 2D context could not be initialized');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.translate(-naturalWidth / 2, -naturalHeight / 2);
  ctx.drawImage(source, 0, 0, naturalWidth, naturalHeight);
  
  // Step 2: Extract the cropped area to authentic Meta hardware resolution
  const safeCrop = crop || { x: 0, y: 0, width: naturalWidth, height: naturalHeight };
  
  // Check if outputting native Ray-Ban Meta 3024x4032 dimensions
  const isMetaProfile = profileId.startsWith('rayban_meta') || profileId === 'meta_ai';
  const outWidth = isMetaProfile ? (activeProfile.targetWidth || META_TARGET_WIDTH) : Math.round(safeCrop.width);
  const outHeight = isMetaProfile ? (activeProfile.targetHeight || META_TARGET_HEIGHT) : Math.round(safeCrop.height);

  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = outWidth;
  croppedCanvas.height = outHeight;
  const croppedCtx = croppedCanvas.getContext('2d');
  
  if (!croppedCtx) {
    throw new Error('Cropped canvas context could not be initialized');
  }

  croppedCtx.imageSmoothingEnabled = true;
  croppedCtx.imageSmoothingQuality = 'high';
  
  // Draw cropped region scaled directly to target dimensions with high sharpness
  croppedCtx.drawImage(
    canvas,
    safeCrop.x, safeCrop.y, safeCrop.width, safeCrop.height,
    0, 0, outWidth, outHeight
  );
  
  // Free source canvas RAM
  canvas.width = 0;
  canvas.height = 0;

  // Step 3: Export to blob in-browser
  const qualityNormalized = Math.min(1, Math.max(0.5, quality / 100));
  const blob = await canvasToBlob(croppedCanvas, 'image/jpeg', qualityNormalized);
  
  // Free cropped canvas RAM
  croppedCanvas.width = 0;
  croppedCanvas.height = 0;

  // Step 4: Run through Ray-Ban Meta metadata processor (100% in-browser)
  const processor = getMetadataProcessor();
  const processedBlob = await processor.process(blob, { profileId });

  // Step 5: Create local blob result
  const url = URL.createObjectURL(processedBlob);
  return {
    blob: processedBlob,
    url,
    width: outWidth,
    height: outHeight,
    size: processedBlob.size,
    format: 'image/jpeg',
    filename: generateOutputFilename(source.alt || 'photo', outputFormat),
    profileId,
    profileName: activeProfile.name,
  };
}
