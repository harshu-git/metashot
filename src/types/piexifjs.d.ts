declare module 'piexifjs' {
  export interface IExif {
    '0th'?: Record<number, any>;
    Exif?: Record<number, any>;
    GPS?: Record<number, any>;
    Interop?: Record<number, any>;
    '1st'?: Record<number, any>;
    thumbnail?: string;
  }

  export const TagValues: {
    ImageIFD: {
      Make: number;
      Model: number;
      Software: number;
      Orientation: number;
      DateTime: number;
      XResolution: number;
      YResolution: number;
      ResolutionUnit: number;
      ExifTag: number;
    };
    ExifIFD: {
      DateTimeOriginal: number;
      DateTimeDigitized: number;
      LensMake: number;
      LensModel: number;
      FocalLength: number;
      FNumber: number;
      ISOSpeedRatings: number;
      ColorSpace: number;
      PixelXDimension: number;
      PixelYDimension: number;
      UserComment: number;
      ExposureProgram: number;
      MeteringMode: number;
      LightSource: number;
      Flash: number;
      ExposureMode: number;
      WhiteBalance: number;
      SceneCaptureType: number;
    };
  };

  export function load(data: string): IExif;
  export function dump(exifObj: IExif): string;
  export function insert(exifStr: string, jpegDataUrl: string): string;
  export function remove(jpegDataUrl: string): string;
}
