<template>
    <div class="container mt-4" style="width: 50%;">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="first-name" class="form-label">Name:</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            class="form-control"
            v-model="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <h2 class="mt-3">Test 2</h2>
        <div class="form-group">
          <label for="second-name" class="form-label">Name:</label>
          <input
            type="text"
            id="second-name"
            name="second-name"
            class="form-control"
            v-model="secondName"
            placeholder="Enter your second name"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            class="form-control"
            rows="4"
            v-model="description"
            placeholder="Describe yourself"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-secondary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        secondName: '',
        description: ''
      };
    },
    methods: {
      handleSubmit() {
        const formData = {
          Name: this.firstName,
          test2: {
            Name: this.secondName,
            description: this.description
          }
        };
        console.log(JSON.stringify(formData));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if necessary */
  </style>
  