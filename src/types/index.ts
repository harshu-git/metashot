// Area returned by react-easy-crop
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// For the crop UI positioning (react-easy-crop uses this)
export interface CropPosition {
  x: number;
  y: number;
}

export interface CropPreset {
  label: string;
  value: number | undefined; // undefined = original/free aspect ratio
}

export type EditorState = 'idle' | 'uploaded' | 'editing' | 'processing' | 'ready';

export interface ImageFile {
  file: File;
  previewUrl: string;
  name: string;
  width: number;
  height: number;
  size: number;
  type: string;
}

export interface ProcessingOptions {
  crop: CropArea;
  zoom: number;
  rotation: number;
  quality: number;
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp';
  profileId?: string;
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
  filename: string;
  profileId?: string;
  profileName?: string;
}

export interface MetadataProcessorOptions {
  profileId?: string;
  [key: string]: unknown;
}

export interface MetadataProcessor {
  process(imageBlob: Blob, options?: MetadataProcessorOptions): Promise<Blob>;
  getName(): string;
  getVersion(): string;
}

export type AnalyticsEvent =
  | 'page_visit'
  | 'upload_started'
  | 'upload_completed'
  | 'conversion_started'
  | 'conversion_completed'
  | 'download_clicked'
  | 'error_occurred';

export type AdSlotPosition = 'top' | 'middle' | 'bottom' | 'content';
