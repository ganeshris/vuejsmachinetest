<template>
  <div class="container mt-4">
    <button class="btn btn-success mb-3" @click="openAddDialog">Add New Item</button>
    <table class="table table-striped">
      <thead class="table-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Mobile No</th>
          <th scope="col">Address</th>
          <th scope="col">Pincode</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.mobno }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.pincode }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="openDialog(item)">Update</button>
            <button class="btn btn-danger btn-sm ms-2" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form Dialog -->
    <div v-if="dialogVisible" class="form-dialog-overlay">
      <div class="form-dialog">
        <div class="form-dialog-header">
          <h5 class="form-dialog-title">{{ isEditMode ? 'Edit Item' : 'Add Item' }}</h5>
          <button type="button" class="btn-close" @click="closeDialog"></button>
        </div>
        <div class="form-dialog-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input v-model="currentItem.name" type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="currentItem.email" type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="mobno" class="form-label">Mobile No</label>
              <input v-model="currentItem.mobno" type="text" class="form-control" id="mobno" required />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input v-model="currentItem.address" type="text" class="form-control" id="address" required />
            </div>
            <div class="mb-3">
              <label for="pincode" class="form-label">Pincode</label>
              <input v-model="currentItem.pincode" type="text" class="form-control" id="pincode" required />
            </div>
            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Save changes' : 'Add Item' }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref([]);
const currentItem = ref({
  name: '',
  email: '',
  mobno: '',
  address: '',
  pincode: '',
});
const dialogVisible = ref(false);
const isEditMode = ref(false);

const openDialog = (item) => {
  currentItem.value = { ...item };
  isEditMode.value = true;
  dialogVisible.value = true;
};

const openAddDialog = () => {
  currentItem.value = {
    name: '',
    email: '',
    mobno: '',
    address: '',
    pincode: '',
  };
  isEditMode.value = false;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const submitForm = async () => {
  if (isEditMode.value) {
    // Update item
    try {
      await fetch(
        `http://34.198.218.30:30179/entityBuilder/Gaurav_testing/${currentItem.value.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MjE2Mzg4MjcsImV4cCI6MTcyNDIzMDgyN30.nhjH_hlS1kdzKy44-uhN906_xpz6C84lHkg6_CFWvxA`,
          },
          body: JSON.stringify(currentItem.value),
        }
      );
      closeDialog();
      await fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  } else {
    // Add new item
    try {
      await fetch('http://34.198.218.30:30179/entityBuilder/Gaurav_testing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MjE2Mzg4MjcsImV4cCI6MTcyNDIzMDgyN30.nhjH_hlS1kdzKy44-uhN906_xpz6C84lHkg6_CFWvxA`,
        },
        body: JSON.stringify(currentItem.value),
      });
      closeDialog();
      await fetchData();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
};

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await fetch(
        `http://34.198.218.30:30179/entityBuilder/Gaurav_testing/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MjE2Mzg4MjcsImV4cCI6MTcyNDIzMDgyN30.nhjH_hlS1kdzKy44-uhN906_xpz6C84lHkg6_CFWvxA`,
          },
        }
      );
      await fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(
      'http://34.198.218.30:30179/entityBuilder/Gaurav_testing',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MjE2Mzg4MjcsImV4cCI6MTcyNDIzMDgyN30.nhjH_hlS1kdzKy44-uhN906_xpz6C84lHkg6_CFWvxA`,
        },
      }
    );
    data.value = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.form-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-dialog {
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

.form-dialog-header {
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-dialog-title {
  margin: 0;
}

.form-dialog-body {
  padding: 16px;
}
</style>
