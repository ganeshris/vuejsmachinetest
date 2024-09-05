<template>
    <div class="container mt-5">
      <div class="card p-4 shadow-sm">
        <h4 class="card-title mb-4">Payment Details</h4>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="cardNumber" class="form-label">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              class="form-control"
              v-model="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
            />
          </div>
          <div class="mb-3">
            <label for="cardName" class="form-label">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              class="form-control"
              v-model="cardName"
              placeholder="John Doe"
            />
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="expirationDate" class="form-label">Expiration Date</label>
              <input
                type="text"
                id="expirationDate"
                class="form-control"
                v-model="expirationDate"
                placeholder="MM/YY"
                maxlength="5"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="cvv" class="form-label">CVV</label>
              <input
                type="text"
                id="cvv"
                class="form-control"
                v-model="cvv"
                placeholder="123"
                maxlength="4"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit Payment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: ''
      };
    },
    methods: {
      handleSubmit() {
        const paymentDetails = {
          cardNumber: this.cardNumber,
          cardName: this.cardName,
          expirationDate: this.expirationDate,
          cvv: this.cvv
        };
        console.log('Payment Details:', paymentDetails);
        // Here you can add your logic to handle the payment submission
        // For example, sending the paymentDetails to your server
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 400px;
    margin: auto;
  }
  
  input::placeholder {
    color: #ccc;
  }
  </style>
  