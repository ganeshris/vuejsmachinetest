<template>
  <div class="container mt-4">
    <button class="btn btn-success mb-3" @click="openAddDialog">
      Add New Item
    </button>
    <table class="table table-striped">
      <thead class="table-light">
        <tr>

       <th scope="col">contact</th>



       <th scope="col">rollno</th>



       <th scope="col">Dates</th>



       <th scope="col">Emailid</th>


        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
<td>{{ item.contact }}</td>

<td>{{ item.rollno }}</td>

<td>{{ item.dates }}</td>

<td>{{ item.emailid }}</td>

          <td>
            <button class="btn btn-primary btn-sm" @click="openDialog(item)">
              Update
            </button>
            <button
              class="btn btn-danger btn-sm ms-2"
              @click="deleteItem(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>

    <!-- Form Dialog -->
    <div
      v-if="dialogVisible"
      class="modal fade show"
      tabindex="-1"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditMode ? "Edit Item" : "Add Item" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeDialog"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">


 <!-- Phone Field -->
      <div class="form-group">
        <label for="contact">contact</label>
        <input type="tel" class="form-control" id="contact"  v-model="currentItem.contact" required>
      </div>



 <div class="form-group">
        <label for="rollno">rollno</label>
        <input type="number" class="form-control" id="rollno" v-model="currentItem.rollno" required>
      </div>

  
    
 <div class="form-group">
        <label for="dates ">Dates</label>
        <input type="date" class="form-control" id="dates " v-model="currentItem.dates " required>
      </div>


<div class="form-group">
        <label for="emailid">Emailid</label>
        <input type="email" class="form-control" id="emailid" v-model="currentItem.emailid" 
placeholder="Enter your emailid"
 required>
      </div>

              <button type="submit" class="btn btn-primary">
                {{ isEditMode ? "Save changes" : "Add Item" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const API_URL = `${
  import.meta.env.VITE_APP_API_URL
}/Formatest/Formatest`;
const token = localStorage.getItem("token");
console.log("hii", token);
const data = ref([]);
const currentItem = ref({
  contact: "",



  rollno: "",



  dates: "",



  emailid: "",



});
const dialogVisible = ref(false);
const isEditMode = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
const result = await response.json();
    // Ensure data is an array
    if (Array.isArray(result)) {
      data.value = result;
    } else {
      console.error("Error: Fetched data is not an array");
    }  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
return Array.isArray(data.value) ? data.value.slice(start, end) : [];});

const totalPages = computed(() => {
return Array.isArray(data.value)
    ? Math.ceil(data.value.length / itemsPerPage)
    : 0;});

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const openDialog = (item) => {
  currentItem.value = { ...item };
  isEditMode.value = true;
  dialogVisible.value = true;
};

const openAddDialog = () => {
  currentItem.value = {
  contact: "",



  rollno: "",



  dates: "",



  emailid: "",



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
      await fetch(`${API_URL}/${currentItem.value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem.value),
      });
      closeDialog();
      await fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  } else {
    // Add new item
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem.value),
      });
      closeDialog();
      await fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }
};

const deleteItem = async (id) => {
  if (confirm("Are you sure you want to delete this item?")) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* No custom styles, relying on Bootstrap */
</style>
