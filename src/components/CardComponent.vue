<template>
    <div class="card" @click="navigate">
      <div class="card-header">
        <slot name="icon"></slot>
      </div>
      <div class="card-body">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      route: {
        type: String,
        required: true
      }
    },
    methods: {
      navigate() {
        this.$router.push(this.route);
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px; 
  height: 150px; 
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: flex-end;
}

.card-body {
  text-align: center;
}

.card-body h3 {
  margin: 0;
  font-size: 16px; /* Adjust the font size as needed */
}

.card-body p {
  margin: 0;
  color: #888; /* Adjust the color as needed */
}
  </style>
  