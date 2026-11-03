import { trackPixel } from './metaPixel';

export const WEB3FORMS_ACCESS_KEY = '931031ab-378b-41eb-9bc5-ca9d50b95e91';

export interface Web3FormsPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  from_name?: string;
  message?: string;
  [key: string]: any;
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Submits form data to Web3Forms API to send real emails to the site owner
 */
export async function submitToWeb3Forms(
  data: Web3FormsPayload | FormData,
  options?: {
    subject?: string;
    from_name?: string;
  }
): Promise<Web3FormsResponse> {
  try {
    let formData: FormData;

    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          if (val instanceof File || val instanceof Blob) {
            formData.append(key, val);
          } else if (typeof val === 'object') {
            formData.append(key, JSON.stringify(val));
          } else {
            formData.append(key, String(val));
          }
        }
      });
    }

    if (!formData.has('access_key')) {
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    }
    if (options?.from_name && !formData.has('from_name')) {
      formData.append('from_name', options.from_name);
    }
    if (options?.subject && !formData.has('subject')) {
      formData.append('subject', options.subject);
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    const isSuccess = result.success === true;

    if (isSuccess) {
      // Fire Meta Pixel standard 'Lead' event for conversion tracking
      trackPixel('Lead', {
        content_name: options?.from_name || options?.subject || 'Lead Form Submission'
      });
    }

    return {
      success: isSuccess,
      message: result.message || (isSuccess ? 'Form submitted successfully!' : 'Submission failed'),
      data: result,
    };
  } catch (error: any) {
    console.error('Web3Forms submission error:', error);
    return {
      success: false,
      message: error?.message || 'Network error occurred. Please try again.',
    };
  }
}

/**
 * Convert a File object to base64 Data URI string for storage
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

