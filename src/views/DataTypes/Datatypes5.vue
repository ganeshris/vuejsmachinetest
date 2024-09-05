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
          />
        </div>
        <h2 class="mt-3">Test 2</h2>
        <div v-for="(entry, index) in additionalEntries" :key="index">
          <div class="form-group">
            <label :for="'additional-name-' + index" class="form-label">Name:</label>
            <input
              type="text"
              :id="'additional-name-' + index"
              :name="'additional-name-' + index"
              class="form-control"
              v-model="entry.name"
            />
          </div>
          <div class="form-group">
            <label :for="'additional-description-' + index" class="form-label">Description:</label>
            <textarea
              :id="'additional-description-' + index"
              :name="'additional-description-' + index"
              class="form-control"
              rows="4"
              v-model="entry.description"
            ></textarea>
          </div>
        </div>
        <div class="btn-group mt-3">
          <button type="submit" class="btn btn-secondary me-3">Submit</button>
          <button type="button" class="btn btn-secondary" @click="handleAddFields">Add Test2</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        additionalEntries: []
      };
    },
    methods: {
      handleAddFields() {
        this.additionalEntries.push({ name: '', description: '' });
      },
      handleSubmit() {
        const formData = {
          Name: this.firstName,
          test2: this.additionalEntries
        };
        console.log(JSON.stringify(formData));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if necessary */
  </style>
  