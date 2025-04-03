import { toByteArray } from "base64-js";
import * as forge from "node-forge";
import * as padding from "pkcs7-padding";
import Rijndael from "js-rijndael";
import * as CryptoJS from "crypto-js";

function toUTF8Array(str: string): number[] {
  var utf8: number[] = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    } else {
      i++;
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
}

export const RijndaelDecrypt = (data: string, key: string): string => {
  var encrData = toByteArray(data);
  var encryptedData: number[] = Array.from(encrData);

  var pwdBytes = toUTF8Array(key);

  var keyBytes = new Uint32Array(16);
  var length = pwdBytes.length;

  if (length > keyBytes.length) {
    length = keyBytes.length;
  }

  var newKeys = pwdBytes;
  for (var i = length; i < keyBytes.length; i++) {
    newKeys.push(keyBytes[i]);
  }

  // Perform decryption and convert result to number[]
  var decryptedBytes = Rijndael.decrypt(
    encryptedData,
    newKeys,
    newKeys,
    "rijndael-128",
    "cbc"
  );
  var clearText: number[] = Array.prototype.slice.call(decryptedBytes);

  // Convert number[] to string
  var clearTextString = String.fromCharCode.apply(null, clearText);

  // Perform unpadding
  const decrypted = padding.unpad(clearTextString);

  return decrypted.toString();
};

export const TDESEncrypt = (data: string, key: string): string => {
  key = CryptoJS.MD5(key).toString(CryptoJS.enc.Latin1);
  key = key + key.substring(0, 8);
  var cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(key)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(data, "utf8"));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
};
