import CryptoJS from 'crypto-js';

export class VagonAuth {
  private static generateNonce(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < length; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
  }

  static generateAuthHeaders(
    apiKey: string,
    secretKey: string,
    method: string,
    path: string,
    body: string = ''
  ): Record<string, string> {
    const timestamp = Date.now().toString();
    const nonce = this.generateNonce();
    
    // Create payload string
    const payload = `${apiKey}${method}${path}${timestamp}${nonce}${body}`;
    
    // Generate HMAC signature
    const signature = CryptoJS.HmacSHA256(payload, secretKey).toString(CryptoJS.enc.Hex);
    
    return {
      'Authorization': `HMAC ${apiKey}:${signature}:${nonce}:${timestamp}`,
      'Content-Type': 'application/json'
    };
  }
}