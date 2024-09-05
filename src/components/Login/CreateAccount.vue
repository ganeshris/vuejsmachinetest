<template>
    <b-modal v-model="showModal" title="Create Your Account" centered>
      <div v-if="error" class="text-danger text-center">{{ error }}</div>
      <div v-if="successMessage" class="text-success text-center">{{ successMessage }}</div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-1">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
            required
          />
        </div>
        <div class="form-group mb-1">
          <label for="email">Email Address:</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>
        <div class="form-group mb-1">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-block" style="background-color: #007bff">
          Create Account
        </button>
      </form>
    </b-modal>
</template>
<script>
  import { ref } from 'vue';
  
  export default {
    name: 'CreateAccount',
    setup() {
      const showModal = ref(true);
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref('');
      const successMessage = ref('');
  
      const handleSubmit = async () => {
        error.value = '';
        successMessage.value = '';
  
        try {
          // Placeholder for API call for creating an account
          const response = await fetch('API_ENDPOINT_HERE', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username.value,
              email: email.value,
              password: password.value,
              confirmPassword: confirmPassword.value,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            successMessage.value = 'Account created successfully!';
          } else {
            error.value = data.message || 'Failed to create account. Please try again.';
          }
        } catch (err) {
          error.value = 'An error occurred. Please try again later.';
        }
      };
  
      return {
        showModal,
        username,
        email,
        password,
        confirmPassword,
        error,
        successMessage,
        handleSubmit,
      };
    },
  };
</script>
  

  