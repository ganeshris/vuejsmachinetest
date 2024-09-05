<template>
    <div class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background-color: gray">
      <div class="card p-5" style="border-radius: 15px; width: 100%; max-width: 500px">
        <h5 class="text-center mb-4">Forgot My Username and Password</h5>
        <p class="text-center mb-4">
          By signing up, I agree to the CloudnSure
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            <u>Privacy Policy</u>
          </a>
          and
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
            <u>Terms of Service</u>
          </a>.
        </p>
        <form @submit.prevent="handleSubmit">
          <div class="form-group mb-3">
            <label for="email">Email Address:</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="email"
              required
            />
          </div>
          <button type="submit" class="btn btn-block mb-2" style="background-color: #007bff">
            Send Reset Link
          </button>
        </form>
        <p v-if="message" class="text-success text-center mt-3">{{ message }}</p>
        <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
      </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  
  export default {
    name: 'ResetPassword',
    setup() {
      const email = ref('');
      const message = ref('');
      const error = ref('');
  
      const handleSubmit = async () => {
        message.value = '';
        error.value = '';
  
        try {
          const response = await fetch('http://34.198.218.30:30166/api/resources/forgotpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfRGV2ZWxvcGVyLFJPTEVfQURNSU4iLCJpYXQiOjE3MTYzNDkyNTEsImV4cCI6MTcxODk0MTI1MX0.fLW0-Uvb6X1fLQNzdiNiYeHO3lMYa1bsFAmOJkGCdRY',
            },
            body: JSON.stringify({ email: email.value }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            message.value = 'A reset link has been sent to your email address.';
          } else {
            error.value = data.message || 'There was an issue sending the reset link. Please try again.';
          }
        } catch (err) {
          error.value = 'An error occurred. Please try again later.';
        }
      };
  
      return {
        email,
        message,
        error,
        handleSubmit,
      };
    },
  };
</script>
  
<style scoped>
  /* Add your styles here if needed */
</style>
  