import type { CropPreset } from '../types';

export const MAX_FILE_SIZE_MB = import.meta.env?.VITE_MAX_FILE_SIZE_MB 
  ? Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) 
  : 25;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_FORMATS: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif']
};

export const SUPPORTED_EXTENSIONS: string[] = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];

export const CROP_PRESETS: CropPreset[] = [
  { label: 'Original', value: undefined },
  { label: '3:4 (Meta Glasses)', value: 3/4 },
  { label: '4:5 (Instagram)', value: 4/5 }
];

export const DEFAULT_QUALITY = 92;

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getImageDimensions(file: File): Promise<{width: number, height: number}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image to get dimensions'));
    };
    img.src = url;
  });
}

export function isValidImageType(file: File): boolean {
  if (Object.keys(SUPPORTED_FORMATS).includes(file.type)) return true;
  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(ext);
}

export function isFileTooLarge(file: File, maxBytes: number = MAX_FILE_SIZE_BYTES): boolean {
  return file.size > maxBytes;
}

export function createImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  return createImageFromUrl(url);
}

export function createImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (url.startsWith('http://') || url.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image element from URL'));
    img.src = url;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    }, format, quality);
  });
}

export function generateOutputFilename(originalName: string, format: string): string {
  const ext = format === 'image/jpeg' ? '.jpg' : format === 'image/png' ? '.png' : format === 'image/webp' ? '.webp' : '.jpg';
  const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  return `${baseName}_metashot${ext}`;
}
