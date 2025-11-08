// ==========================
//  AES-GCM Encryption Utils
// ==========================

// Convert ArrayBuffer <-> Base64
function ab2b64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
function b642ab(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Derive encryption key from password using PBKDF2
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt text using password
async function encryptData(plaintext, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  );

  return btoa(
    JSON.stringify({
      salt: ab2b64(salt),
      iv: ab2b64(iv),
      data: ab2b64(ciphertext),
    })
  );
}

// Decrypt previously encrypted Base64 string
async function decryptData(encryptedB64, password) {
  try {
    const packed = JSON.parse(atob(encryptedB64));
    const salt = b642ab(packed.salt);
    const iv = b642ab(packed.iv);
    const data = b642ab(packed.data);

    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    throw new Error("Decryption failed: Invalid password or corrupted data");
  }
}

export { encryptData, decryptData }