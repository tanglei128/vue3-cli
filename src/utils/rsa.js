function hexdump(buffer) {
  let lines = [];
  for (let i = 0; i < 100; i += 16) {
    let hex = '';
    let ascii = '';
    for (let j = i; j < Math.min(i + 16, buffer.length); j++) {
      hex += (buffer[j] < 16 ? '0' : '') + buffer[j].toString(16) + ' ';
      ascii += buffer[j] >= 32 && buffer[j] <= 126 ? String.fromCharCode(buffer[j]) : '.';
    }
    lines.push(hex.padEnd(49) + ascii);
  }
  console.log(lines.join('\n'));
  console.log('a----------->');
}




// 使用 JSEncrypt 进行分段解密
export async function decryptBlobWithRSA(blob, privateKey) {
  // const decryptor = new JSEncrypt();
  // decryptor.setPrivateKey(privateKey);
  //进行base64解码
  // blob = atob(blob);
  let offset = 0;
  let chunkSize = 256; // 可以根据需要调整分段大小
  // let decryptedData = '';
  // let i = 0;
  let concatArray= new Uint8Array();
  console.log("blob-tang", blob)
  while (offset < blob.length) {
    const segmentSize = Math.min(blob.length - offset, chunkSize);
    // chunk 为unit8Array类型
    const chunk = blob.slice(offset, offset + segmentSize);
    // hexdump(chunk);
    console.log("chunk", chunk, chunk.length)
    //对分段内容再次进行Base64编码，以便进行RSA解密
    // let binaryData = await readBlob0(chunk)
    // console.log("binaryData", binaryData)
    // 使用 TextDecoder 解码二进制数据为字符串（默认使用 UTF-8 编码）
// const textDecoder = new TextDecoder();
// const decodedString = textDecoder.decode(binaryData);
    // var encodedString = CryptoJS.enc.Base64.stringify(array);
    // const decryptedChunk = decryptor.decrypt(binaryData);
    // 解码私钥
    // console.log("privateKey", privateKey)
  var privateKeyObj = forge.pki.privateKeyFromPem(privateKey);

// 解密数据 decryptedChunk 为字符串
   let decryptedChunk = privateKeyObj.decrypt(chunk);
    let resArray =  strToUnit8Array(decryptedChunk)
    // console.log("decryptedData2", decryptedData2)
    console.log("decryptedChunk", decryptedChunk)
    console.log("resArray", resArray)

    concatArray = Uint8Array.from([...concatArray,...resArray]);
    // decryptedData += decryptedChunk;
    offset += segmentSize;
    // break;
  }

  return concatArray;
  // return decryptedData;
}

function strToUnit8Array(str) {
  // var str = "Hello, world!";

// 将字符串转换为 UTF-16 码点数组
var codePoints = Array.from(str).map(ch => ch.charCodeAt(0));

// 创建一个 Uint8Array 来存储编码后的数据
var uint8Array = new Uint8Array(codePoints.length);

// 将每个码点转换为一个字节
for (var i = 0; i < codePoints.length; i++) {
    uint8Array[i] = codePoints[i] & 0xFF; // 只取码点的低 8 位作为字节
}

// 输出 Uint8Array
  // console.log("asdddd",uint8Array);
  
  // hexdump(uint8Array);
  return uint8Array;
}









