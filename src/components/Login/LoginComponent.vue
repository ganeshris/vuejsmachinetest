<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h1 class="text-center mb-4">Sign In</h1>
            <p class="text-center text-muted">Enter your username and password to access your account.</p>
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="userName" type="text" class="form-control" id="username" placeholder="Enter your username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password" required>
                <router-link to="/forgetPassword" class="form-text text-end mt-1">Forgot Password?</router-link>
              </div>
              <button type="submit" class="btn btn-primary w-100">Sign In</button>
              <router-link to="/createAcc" class="form-text mt-3 text-center d-block">Don't have an account? Sign up here</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userName = ref('');
    const password = ref('');
    const router = useRouter();

    async function signIn() {
      const object = {
        email: userName.value,
        password: password.value,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/token/session`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const resp = await response.json();
        console.log('API Response:', resp);

        if (resp.operationStatus === 'SUCCESS') {
          localStorage.setItem('token', resp.item.token);
          console.log('Token stored in local storage:', resp.item.token);
          router.push('/Home');
        } else {
          console.log('Login failed:', resp.operationMessage);
        }
      } catch (error) {
        console.log('API error:', error);
      }
    }

    return {
      userName,
      password,
      signIn,
    };
  },
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
