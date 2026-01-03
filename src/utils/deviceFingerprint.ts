/**
 * Browser Device Fingerprinting Utility
 * Generates a unique device ID based on browser characteristics
 * NO hardware access - web-safe only
 */

export interface DeviceFingerprint {
  deviceId: string;
  timestamp: number;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  colorDepth: number;
  pixelRatio: number;
  cookiesEnabled: boolean;
}

/**
 * Generates a hash from a string using Web Crypto API
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Gets Canvas fingerprint
 */
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas';

    canvas.width = 200;
    canvas.height = 50;

    // Draw text with specific styling
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('BCA Attendance 2024', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Device Fingerprint', 4, 17);

    return canvas.toDataURL();
  } catch {
    return 'canvas-error';
  }
}

/**
 * Gets WebGL fingerprint
 */
function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      return `${vendor}|${renderer}`;
    }
    return 'webgl-basic';
  } catch {
    return 'webgl-error';
  }
}

/**
 * Gets installed fonts fingerprint
 */
function getFontsFingerprint(): string {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = [
    'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana',
    'Trebuchet MS', 'Comic Sans MS', 'Impact', 'Palatino'
  ];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'no-fonts';

  const testString = 'mmmmmmmmmmlli';
  const baseSizes: { [key: string]: number } = {};

  // Measure base fonts
  baseFonts.forEach(font => {
    ctx.font = `72px ${font}`;
    baseSizes[font] = ctx.measureText(testString).width;
  });

  // Check which fonts are available
  const detectedFonts = testFonts.filter(font => {
    return baseFonts.some(baseFont => {
      ctx.font = `72px ${font}, ${baseFont}`;
      const size = ctx.measureText(testString).width;
      return size !== baseSizes[baseFont];
    });
  });

  return detectedFonts.join(',') || 'no-custom-fonts';
}

/**
 * Generates a comprehensive browser fingerprint
 */
export async function generateDeviceFingerprint(): Promise<DeviceFingerprint> {
  // Collect browser characteristics
  const components = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    screen.colorDepth.toString(),
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset().toString(),
    window.devicePixelRatio.toString(),
    navigator.hardwareConcurrency?.toString() || '0',
    navigator.cookieEnabled.toString(),
    getCanvasFingerprint(),
    getWebGLFingerprint(),
    getFontsFingerprint(),
    // Add more entropy
    navigator.maxTouchPoints?.toString() || '0',
    (window.screen.availHeight + 'x' + window.screen.availWidth),
  ];

  // Create unique fingerprint string
  const fingerprintString = components.join('|');
  
  // Hash the fingerprint for security
  const deviceId = await hashString(fingerprintString);

  return {
    deviceId,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    cookiesEnabled: navigator.cookieEnabled,
  };
}

/**
 * Verifies if the current device matches the stored fingerprint
 */
export async function verifyDeviceFingerprint(storedDeviceId: string): Promise<boolean> {
  const currentFingerprint = await generateDeviceFingerprint();
  return currentFingerprint.deviceId === storedDeviceId;
}

/**
 * Gets a human-readable device description
 */
export function getDeviceDescription(fingerprint: DeviceFingerprint): string {
  const browser = getBrowserName(fingerprint.userAgent);
  const os = getOSName(fingerprint.platform, fingerprint.userAgent);
  
  return `${browser} on ${os} (${fingerprint.screenResolution})`;
}

function getBrowserName(userAgent: string): string {
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown Browser';
}

function getOSName(platform: string, userAgent: string): string {
  if (platform.includes('Win') || userAgent.includes('Windows')) return 'Windows';
  if (platform.includes('Mac') || userAgent.includes('Mac')) return 'macOS';
  if (platform.includes('Linux') || userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown OS';
}
