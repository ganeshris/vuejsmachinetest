<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">QR Code Generator</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control mb-4"
            placeholder="Enter text for QR code..."
            v-model="qrInput"
          />
          <div class="d-flex justify-content-center">
            <qrcode-vue :value="qrInput || 'https://example.com'" />
          </div>
        </div>
      </div>
  
      <h1 class="text-center mb-4">Barcode Generator</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control mb-4"
            placeholder="Enter text for barcode..."
            v-model="barcodeInput"
          />
          <div class="d-flex justify-content-center">
            <vue-barcode
              :value="barcodeInput || '1234567890'"
              format="CODE128"
              displayValue="true"
              width="1"
              height="50"
              margin="10"
            />
          </div>
        </div>
      </div>
  
      <h1 class="text-center mb-4">Image Upload</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="file"
            class="form-control mb-4"
            @change="handleImageChange"
            accept="image/*"
          />
          <img v-if="image" :src="image" alt="Uploaded" class="img-fluid" />
        </div>
      </div>
  
      <h1 class="text-center mb-4">File Upload</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="file"
            class="form-control mb-4"
            @change="handleFileChange"
          />
          <p v-if="file">Uploaded File: {{ file }}</p>
        </div>
      </div>
  
      <h1 class="text-center mb-4">Video Upload</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="file"
            class="form-control mb-4"
            @change="handleVideoChange"
            accept="video/*"
          />
          <video v-if="video" :src="video" controls class="img-fluid"></video>
        </div>
      </div>
  
      <h1 class="text-center mb-4">Audio Upload</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <input
            type="file"
            class="form-control mb-4"
            @change="handleAudioChange"
            accept="audio/*"
          />
          <audio v-if="audio" :src="audio" controls class="w-100"></audio>
        </div>
      </div>
  
      <h1 class="text-center mb-4">QR Code Scanner</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <qrcode-scanner @decode="handleScan" @init="onInit"></qrcode-scanner>
          <p v-if="scanResult">Scanned Result: {{ scanResult }}</p>
        </div>
      </div>
  
      <h1 class="text-center mb-4">Barcode Scanner</h1>
      <div class="row justify-content-center mb-5">
        <div class="col-md-6">
          <div id="barcode-scanner" style="width: 100%; height: 320px;"></div>
          <p v-if="barcodeResult">Last Scanned Barcode: {{ barcodeResult }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from "vue";
  import QRCodeVue from "qrcode-vue";
  import VueBarcode from "@chenfengyuan/vue-barcode";
  import { useQrScanner } from "vue-qrcode-reader";
  import Quagga from "quagga";
  
  export default {
    components: {
      QRCodeVue,
      VueBarcode,
      QrcodeScanner: useQrScanner,
    },
    setup() {
      const qrInput = ref("");
      const barcodeInput = ref("");
      const image = ref(null);
      const file = ref(null);
      const video = ref(null);
      const audio = ref(null);
      const scanResult = ref("");
      const barcodeResult = ref("");
  
      const handleQrInputChange = (e) => {
        qrInput.value = e.target.value;
      };
  
      const handleBarcodeInputChange = (e) => {
        barcodeInput.value = e.target.value;
      };
  
      const handleImageChange = (e) => {
        if (e.target.files[0]) {
          image.value = URL.createObjectURL(e.target.files[0]);
        }
      };
  
      const handleFileChange = (e) => {
        if (e.target.files[0]) {
          file.value = e.target.files[0].name;
        }
      };
  
      const handleVideoChange = (e) => {
        if (e.target.files[0]) {
          video.value = URL.createObjectURL(e.target.files[0]);
        }
      };
  
      const handleAudioChange = (e) => {
        if (e.target.files[0]) {
          audio.value = URL.createObjectURL(e.target.files[0]);
        }
      };
  
      const handleScan = (data) => {
        if (data) {
          scanResult.value = data;
        }
      };
  
      const handleError = (err) => {
        console.error(err);
      };
  
      onMounted(() => {
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector("#barcode-scanner"),
              constraints: {
                facingMode: "environment",
              },
            },
            decoder: {
              readers: ["code_128_reader"],
            },
          },
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
            Quagga.start();
          }
        );
  
        Quagga.onDetected((data) => {
          barcodeResult.value = data.codeResult.code;
        });
      });
  
      onUnmounted(() => {
        Quagga.offDetected();
        Quagga.stop();
      });
  
      return {
        qrInput,
        barcodeInput,
        image,
        file,
        video,
        audio,
        scanResult,
        barcodeResult,
        handleQrInputChange,
        handleBarcodeInputChange,
        handleImageChange,
        handleFileChange,
        handleVideoChange,
        handleAudioChange,
        handleScan,
        handleError,
      };
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  