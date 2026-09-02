import * as piexifModule from 'piexifjs';
import type { MetadataProcessor, MetadataProcessorOptions } from '../types';

// Robust ESM/CJS interop for piexifjs
const piexif: any = (piexifModule as any).default || piexifModule;

export interface MetaProfileConfig {
  id: string;
  name: string;
  badge: string;
  make: string;
  model: string;
  software?: string;
  lensModel?: string;
  lensMake?: string;
  spinView: boolean;
  targetWidth: number;
  targetHeight: number;
  description: string;
}

export const META_PROFILES: Record<string, MetaProfileConfig> = {
  rayban_meta_gen2: {
    id: 'rayban_meta_gen2',
    name: 'Ray-Ban Meta Smart Glasses 2',
    badge: 'Ray-Ban Meta',
    make: 'Meta AI',
    model: 'Ray-Ban Meta Smart Glasses 2',
    spinView: true,
    targetWidth: 3024,
    targetHeight: 4032,
    description: 'Authentic 12MP 3024x4032 Meta AI Ray-Ban smart glasses profile verified for Instagram.',
  },
  rayban_meta_spinview: {
    id: 'rayban_meta_spinview',
    name: 'Ray-Ban Meta (Spin View Ready)',
    badge: 'Spin View Ready',
    make: 'Meta AI',
    model: 'Ray-Ban Meta Smart Glasses 2',
    spinView: true,
    targetWidth: 3024,
    targetHeight: 4032,
    description: 'Embedded with Meta AI smart glasses metadata & Spin View motion tags for Instagram Story viewer.',
  },
  rayban_stories: {
    id: 'rayban_stories',
    name: 'Ray-Ban Stories (Gen 1)',
    badge: 'Ray-Ban Stories',
    make: 'Luxottica',
    model: 'Ray-Ban Stories',
    spinView: false,
    targetWidth: 2592,
    targetHeight: 2592,
    description: 'First generation Ray-Ban smart glasses profile.',
  },
  meta_ai: {
    id: 'meta_ai',
    name: 'Meta AI Camera',
    badge: 'Meta AI',
    make: 'Meta Platforms',
    model: 'Meta AI Smart Glasses',
    spinView: true,
    targetWidth: 3024,
    targetHeight: 4032,
    description: 'Meta AI Vision multimodal sensor profile.',
  },
};

// Direct Numeric Tag Constants to avoid undefined TagValues errors in browser
const TAG_MAKE = 0x010f;
const TAG_MODEL = 0x0110;
const TAG_SOFTWARE = 0x0131;
const TAG_ORIENTATION = 0x0112;
const TAG_DATETIME = 0x0132;
const TAG_X_RESOLUTION = 0x011a;
const TAG_Y_RESOLUTION = 0x011b;
const TAG_RESOLUTION_UNIT = 0x0128;
const TAG_HOST_COMPUTER = 0x013c;

const TAG_DATETIME_ORIGINAL = 0x9003;
const TAG_DATETIME_DIGITIZED = 0x9004;
const TAG_COLOR_SPACE = 0xa001;
const TAG_PIXEL_X_DIMENSION = 0xa002;
const TAG_PIXEL_Y_DIMENSION = 0xa003;
const TAG_MAKER_NOTE = 0x927c;
const TAG_LENS_MAKE = 0xa433;
const TAG_LENS_MODEL = 0xa434;
const TAG_LENS_SPECIFICATION = 0xa432;

/**
 * Generates full XMP XML packet containing Meta smart glasses namespaces
 */
function buildMetaXmpPacket(profile: MetaProfileConfig, dateStr: string): string {
  return `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6.0">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:tiff="http://ns.adobe.com/tiff/1.0/"
      xmlns:exif="http://ns.adobe.com/exif/1.0/"
      xmlns:xmp="http://ns.adobe.com/xap/1.0/"
      xmlns:meta="http://ns.meta.com/smartglasses/1.0/"
      xmlns:fb="http://ns.facebook.com/camera/1.0/"
      xmlns:GCamera="http://ns.google.com/photos/1.0/camera/"
      tiff:Make="${profile.make}"
      tiff:Model="${profile.model}"
      xmp:CreateDate="${dateStr}"
      xmp:ModifyDate="${dateStr}"
      meta:DeviceCategory="SmartGlasses"
      meta:DeviceMake="${profile.make}"
      meta:DeviceModel="${profile.model}"
      meta:Feature="${profile.spinView ? 'SpinView' : 'Standard'}"
      meta:IsMetaGlassesMedia="True"
      fb:Device="${profile.model}"
      GCamera:MotionPhoto="${profile.spinView ? '1' : '0'}"
      GCamera:MotionPhotoVersion="1"
      GCamera:MicroVideo="${profile.spinView ? '1' : '0'}">
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

/**
 * Inserts an XMP APP1 segment (0xFFE1) into a JPEG ArrayBuffer entirely in client-side memory
 */
function injectXmpSegment(jpegBuffer: ArrayBuffer, xmpXml: string): ArrayBuffer {
  try {
    const bytes = new Uint8Array(jpegBuffer);
    
    // Verify SOI marker (0xFFD8)
    if (bytes.length < 4 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) {
      return jpegBuffer;
    }

    const xmpHeader = "http://ns.adobe.com/xap/1.0/\0";
    const encoder = new TextEncoder();
    const xmpPayload = encoder.encode(xmpHeader + xmpXml);
    
    // APP1 segment length = 2 (for length field itself) + payload length
    const segmentLength = 2 + xmpPayload.length;
    const app1Segment = new Uint8Array(2 + 2 + xmpPayload.length);
    app1Segment[0] = 0xFF;
    app1Segment[1] = 0xE1;
    app1Segment[2] = (segmentLength >> 8) & 0xFF;
    app1Segment[3] = segmentLength & 0xFF;
    app1Segment.set(xmpPayload, 4);

    // Insert APP1 segment right after SOI (index 2) or after existing EXIF APP1
    let insertPos = 2;
    
    // If there is an existing APP1 (EXIF) segment, insert XMP right after it
    if (bytes[2] === 0xFF && bytes[3] === 0xE1) {
      const exifLen = (bytes[4] << 8) | bytes[5];
      insertPos = 2 + 2 + exifLen;
      if (insertPos > bytes.length) {
        insertPos = 2;
      }
    }

    const result = new Uint8Array(bytes.length + app1Segment.length);
    result.set(bytes.subarray(0, insertPos), 0);
    result.set(app1Segment, insertPos);
    result.set(bytes.subarray(insertPos), insertPos + app1Segment.length);

    return result.buffer;
  } catch (err) {
    console.warn('XMP injection fallback:', err);
    return jpegBuffer;
  }
}

/**
 * Verified Meta Smart Glasses Metadata Processor
 * 100% in-browser processing via Canvas, FileReader, and Binary Segment Injection.
 */
export class MetaGlassesMetadataProcessor implements MetadataProcessor {
  async process(imageBlob: Blob, options?: MetadataProcessorOptions): Promise<Blob> {
    try {
      const profileId = (options?.profileId as string) || 'rayban_meta_gen2';
      const profile = META_PROFILES[profileId] || META_PROFILES.rayban_meta_gen2;

      // 1. Convert Blob to Data URL safely in browser memory
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image buffer'));
        reader.readAsDataURL(imageBlob);
      });

      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const exifDate = `${now.getFullYear()}:${pad(now.getMonth() + 1)}:${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const isoDate = now.toISOString();

      // 2. Load existing EXIF or create fresh clean structure
      let exifObj: any = { '0th': {}, Exif: {}, GPS: {}, '1st': {} };
      if (piexif && typeof piexif.load === 'function') {
        try {
          exifObj = piexif.load(dataUrl);
        } catch (e) {
          exifObj = { '0th': {}, Exif: {}, GPS: {}, '1st': {} };
        }
      }

      // Purge GPS & previous phone camera traces
      exifObj['GPS'] = {};
      if (exifObj['0th']) {
        delete exifObj['0th'][TAG_SOFTWARE];
        delete exifObj['0th'][TAG_HOST_COMPUTER];
      }
      if (exifObj['Exif']) {
        delete exifObj['Exif'][TAG_MAKER_NOTE];
        delete exifObj['Exif'][TAG_LENS_MAKE];
        delete exifObj['Exif'][TAG_LENS_MODEL];
        delete exifObj['Exif'][TAG_LENS_SPECIFICATION];
      }

      // 3. Set Verified Meta AI Smart Glasses EXIF Block
      exifObj['0th'] = {
        ...exifObj['0th'],
        [TAG_MAKE]: profile.make, // "Meta AI"
        [TAG_MODEL]: profile.model, // "Ray-Ban Meta Smart Glasses 2"
        [TAG_ORIENTATION]: 1,
        [TAG_DATETIME]: exifDate,
        [TAG_X_RESOLUTION]: [72, 1],
        [TAG_Y_RESOLUTION]: [72, 1],
        [TAG_RESOLUTION_UNIT]: 2,
      };

      exifObj['Exif'] = {
        ...exifObj['Exif'],
        [TAG_DATETIME_ORIGINAL]: exifDate,
        [TAG_DATETIME_DIGITIZED]: exifDate,
        [TAG_COLOR_SPACE]: 1, // sRGB
        [TAG_PIXEL_X_DIMENSION]: profile.targetWidth || 3024,
        [TAG_PIXEL_Y_DIMENSION]: profile.targetHeight || 4032,
      };

      let exifDump = '';
      if (piexif && typeof piexif.dump === 'function') {
        try {
          exifDump = piexif.dump(exifObj);
        } catch (e) {
          console.warn('EXIF dump fallback:', e);
        }
      }

      // 4. Inject EXIF into JPEG
      let jpegWithExifDataUrl = dataUrl;
      if (exifDump && piexif && typeof piexif.insert === 'function') {
        try {
          jpegWithExifDataUrl = piexif.insert(exifDump, dataUrl);
        } catch (e) {
          console.warn('EXIF insert fallback:', e);
          jpegWithExifDataUrl = dataUrl;
        }
      }

      // 5. Safe binary decoding from data URL
      let arrayBuffer: ArrayBuffer;
      try {
        const base64Data = jpegWithExifDataUrl.split(',')[1];
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        arrayBuffer = bytes.buffer;
      } catch (e) {
        arrayBuffer = await imageBlob.arrayBuffer();
      }

      // 6. Inject XMP Packet with Spin View & Meta SmartGlasses Schema
      const xmpPacket = buildMetaXmpPacket(profile, isoDate);
      const finalBuffer = injectXmpSegment(arrayBuffer, xmpPacket);

      return new Blob([finalBuffer], { type: 'image/jpeg' });
    } catch (err) {
      console.error('Metadata processor fallback returning original image:', err);
      return imageBlob;
    }
  }

  getName(): string {
    return 'MetaGlassesMetadataProcessor';
  }

  getVersion(): string {
    return '2.1.0';
  }
}

// Active metadata processor instance
let activeProcessor: MetadataProcessor = new MetaGlassesMetadataProcessor();

export function getMetadataProcessor(): MetadataProcessor {
  return activeProcessor;
}

export function setMetadataProcessor(processor: MetadataProcessor): void {
  activeProcessor = processor;
}

export default activeProcessor;
