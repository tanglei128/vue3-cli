<template>
  <div>
    <!-- 文件上传表单 -->
    <!-- <input type="file" @change="handleFileChange"> -->
    <!-- <button @click="uploadFile">上传文件</button> -->

    <!-- 读取本地文件 -->
    <input type="file" @change="readLocalFile">
    <!-- <form action="http://172.16.13.169:3236/boostcms/system/user/savefile" method="post" enctype="multipart/form-data">
      <input type="file" name="imgs" id="fileToUpload">
      <input type="submit" value="Upload File" name="submit">
    </form> -->
  </div>
</template>

<script>
import { decryptBlobWithRSA } from '@/utils/rsa';
import axios from 'axios';
export default {
  methods: {
    // 处理文件上传表单的 change 事件
    handleFileChange(event) {
      this.file = event.target.files[0]; // 保存选中的文件
    },
    // 上传文件到服务器
    async uploadFile() {
      if (!this.file) {
        console.error('未选择文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file); // 将文件添加到 FormData 对象

      try {
        // 发送 POST 请求到服务器
        const response = await this.$axios.post('https://your-api-endpoint.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('文件上传成功', response.data);
      } catch (error) {
        console.error('文件上传失败', error);
      }
    },
    // 处理读取本地文件的 change 事件
   async readLocalFile(event) {
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
      }
      const file = event.target.files[0]; // 获取选中的文件
      console.log('选中的文件：', file);
      const reader = new FileReader();

      reader.onload = async function (event) {
        const arrayBuffer = event.target.result;
        // 这里可以对 arrayBuffer 进行处理，比如转换成 Uint8Array 或其他格式
        console.log('读取到的二进制数据：', arrayBuffer);
        const uint8Array = new Uint8Array(arrayBuffer);
        // hexdump(uint8Array);
        let privateKey = '-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBORMCjh20rT0CK42BC/sBD5SXf6z/Zp1w1sJUCyg+tBSiPt6JlOubVJ65xQwNjdmDC8LCdMlNOokZzrXijNSCHF5hKC8TRL2bI9fW+wfhByEJIxGh7jR9bxL8Vm8hMmQsSH0tuv5G8c9o6abzqWqa8qgHeyMGnIjb+Xa+11fw9qULcQYdP8NracRw4Pdg5haV1fW9IoBu9Gyk5XA72R6Hlhl4ixHK8A3NqGLGOZe6UbZ5yCMB2u30t+hk7iAGMwKDkB2Fp6Hnc/Y5jkKPe7sMZrON7CyZoCHdsC3IfrKAxCeF4CbBO5GY94dRCNqDxGOGnDEFU9w/BG7DwX+39JcHAgMBAAECggEASfPJNdIkxnEDh6AZsYlfUSGgcnd4Q+wHWBeqGraGebE8sHg1fhzULAgwE9O58DoZRNGsgfZm0TsVHB6EeKgD8aRf7vmNQuetVgJa6rn7YwHyf+e/KOXdiyCG+LMwJ1l9A4He/zCxf3+vLW0368wstA8phmt3lWE19FM/Qn1y+BMTXjmgZB1gtZ6HOgoRFZNfiL38ed4tXnVxd2RtS+XqSmSC93gWNgSMAeLFDM0mz25sadeAZjll3EihsQmdameHboDaLsRq4cCZg93rrcvfaYAryhcJLgeY4+wyCMKRuYFU5jN0eZ6yiLElmkPCgblNdJ681xEcver66nbx2A2SgQKBgQDzG01eSRskF+GycTpqe6wN1Lpv19onBxQV8+O68jprsQXXzH29bIoQ+QkD5ucSa4EnyF2KGtuvDMNzpBwTv5Ut+TNnIG/nG7wM8trBxJpdCtRR5o6U2g8FnVw9oNb9a9GGNw0xqXdGzETzGIHVwpmo48Otc7lTZ/TYMbyoKZOlQQKBgQDLeH435p5VA/4qtkk5cZOXfFVZQW1NnHhpGEC5UNAlMcxJBUs2Zwuh821HlhygTqteLj+OPV+cavIEXejvhmfCiVvra4d2oznP27IhQYVTioLyZOzx8wSk95Prsf4rKnOUi3mysOsAnhmGav4ynawHS4fMna2PiPTRuHJE0qdCRwKBgG99zfW3wWLEMRYNJ6U+IqIVNYulir7rWCLZP0+1V2WcQfm+JsyAwrEWBTRs6PxhoVIFaiC0QJv/VoPqd5X2/wuehhx9m9R5u7yUhA7pg4G4Pbdx7WIGv2zrxindYbvHfsf2524nMjSd6eEzFBhcruvtyQf7UrsVqgycgtD8gGIBAoGAUO3tLijhYylCaBS3DU0aik9e1zCJ3CvXTN3jqJH3KEQlYAnl/45+9vyOw8F2Q2DnEn/MsbPBmsKC3q/HnbXVAXCHCh1r9Qk5Tm6w7D9WW4MlUGpKQHYLq935jO7wDJVHAZd0YVmzLzyzJF7cGp/SM9ib/AvfY87yqZP2h19OPbMCgYEAst14OhawMRnQSk61yroplAYwKa6rLGbDsiMttiHeVzJ/wmCSS+F1ZxKM1jNy85VKGDN+g+/n7FrvsMO7AdmmvvRacPL5EsimOJJzWb1rXpxkPZ7d3dNN1+lD1phVrYlWR4onTxjBSETc5c1EXknd/zwXilSX3lIzO3lQOfNy9Y4=-----END PRIVATE KEY-----';

        const resp = await decryptBlobWithRSA(uint8Array, privateKey)
        console.log('解密后的二进制数据：', resp);

        hexdump(resp)

        const decryptedBlob = new Blob([resp], { type: 'application/octet-stream;charset=UTF-8' });


        // 生成可下载的URL
        let href = URL.createObjectURL(decryptedBlob);
        // let fileName = res.headers['content-disposition'].split('=')[1];
        let fileName = 'test.xlsx';
        fileName = decodeURI(fileName, "utf-8");
        const downloadElement = document.createElement('a');
        // const href = window.URL.createObjectURL(blob); // 创建下载的链接
        // downloadElement.href = href;
        downloadElement.href = href;
        console.log(fileName, 'fileName');
        downloadElement.download = fileName; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象





        // const decryptedBlob3 = new Blob([resp], { type: 'image/jpeg' });

        // const formData = new FormData();
        // formData.append('imgs', decryptedBlob3); // 将文件添加到 FormData 对象

        // try {
        //   // 发送 POST 请求到服务器
        //   const response = await axios.post('http://172.16.13.169:3236/boostcms/system/user/savefile', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   });
        //   console.log('文件上传成功', response.data);
        // } catch (error) {
        //   console.error('文件上传失败', error);
        // }




        // const reader3 = new FileReader();
        // reader3.onload = function (e) {
        //   const arrayBuffer = e.target.result;
        //   const uint8Array = new Uint8Array(arrayBuffer);
        //   console.log('eeee解密后的二进制数据：', uint8Array);
        //   hexdump(uint8Array);
        // }
        // console.log("ssssss")
        // reader3.readAsArrayBuffer(decryptedBlob3);
        // hexdump(resp);



      };

      reader.readAsArrayBuffer(file); // 读取文件内容并返回 ArrayBuffer 对象
    }
  }
};
</script>
