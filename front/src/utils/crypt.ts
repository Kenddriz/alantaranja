export const encrypt = (salt: string, text: string) => {
  const textToChars = (text: string) => text.split('').map((c: string) => c.charCodeAt(0));
  const byteHex = (n: any) => {
    const code = ('0' + Number(n).toString(16));
    return code.substring(code.length - 2);
  }
  const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

export const decrypt = (salt: string, encoded: any): string => {
  const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded.match(/.{1,2}/g)
    .map((hex: any) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode: any) => String.fromCharCode(charCode))
    .join('');
};
