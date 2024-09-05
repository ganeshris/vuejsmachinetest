<template>
    <div class="container mx-auto mt-10 p-5">
      <h1 class="text-center text-2xl font-semibold mb-6">Select a Menu Item</h1>
      <div class="flex justify-center mb-6">
        <select
          v-model="selectedMenuItem"
          class="form-select block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">Select an Option</option>
          <option
            v-for="item in menuItems"
            :key="item.menuItemId.menuItemId"
            :value="item.menuItemId.menuItemId"
          >
            {{ item.menuItemDesc }}
          </option>
        </select>
      </div>
      <h1 class="text-center text-2xl font-semibold mb-6">Select Multiple Menu Items</h1>
      <div class="flex justify-center">
        <select
          multiple
          v-model="selectedMultiMenuItems"
          class="form-multiselect block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option
            v-for="item in menuItems"
            :key="item.menuItemId.menuItemId"
            :value="item.menuItemId.menuItemId"
          >
            {{ item.menuItemDesc }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'DataType3',
    setup() {
      const menuItems = ref([]);
      const selectedMenuItem = ref('');
      const selectedMultiMenuItems = ref([]);
      const loading = ref(true);
      const error = ref(null);
  
      onMounted(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          error.value = 'No authorization token found.';
          loading.value = false;
          return;
        }
  
        try {
          const response = await fetch( `${import.meta.env.VITE_APP_API_URL}/fndMenu/menuloadbyuser`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          menuItems.value = data;
          loading.value = false;
        } catch (err) {
          error.value = err.message;
          loading.value = false;
        }
      });
  
      return {
        menuItems,
        selectedMenuItem,
        selectedMultiMenuItems,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  