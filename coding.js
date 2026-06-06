export function encode(text) {
  const bytes = new TextEncoder().encode(text);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decode(encoded) {
  encoded = encoded
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  while (encoded.length % 4) {
    encoded += "=";
  }

  const binary = atob(encoded);

  const bytes = Uint8Array.from(
    binary,
    char => char.charCodeAt(0)
  );

  return new TextDecoder().decode(bytes);
}