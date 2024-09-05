<template>
    <div id="app" class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2>{{ isMainTable ? 'Elegant Table with Vue.js' : 'Module Table' }}</h2>
        <div>
          <button class="btn btn-secondary mr-2" @click="toggleTable">{{ isMainTable ? 'Module' : 'Main Table' }}</button>
          <button class="btn btn-primary" @click="showModal = true">Add</button>
        </div>
      </div>
  
      <table class="table table-bordered" v-if="isMainTable">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.default }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
  
      <table class="table table-bordered" v-else>
        <thead class="thead-dark">
          <tr>
            <th scope="col">Module</th>
            <th scope="col">Description</th>
            <th scope="col">Access Exclusive</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(module, index) in modules" :key="index">
            <td>{{ module.module }}</td>
            <td>{{ module.description }}</td>
            <td>{{ module.accessExclusive }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isMainTable ? 'Add New Item' : 'Add New Module' }}</h5>
              <button type="button" class="close" @click="closeModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addItemOrModule">
                <div v-if="isMainTable">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" v-model="newItem.name" required>
                  </div>
                  <div class="form-group">
                    <label for="default">Default</label>
                    <input type="text" class="form-control" id="default" v-model="newItem.default" required>
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" v-model="newItem.description" required></textarea>
                  </div>
                </div>
                <div v-else>
                  <div class="form-group">
                    <label for="module">Module</label>
                    <input type="text" class="form-control" id="module" v-model="newModule.module" required>
                  </div>
                  <div class="form-group">
                    <label for="module-description">Description</label>
                    <textarea class="form-control" id="module-description" v-model="newModule.description" required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="access-exclusive">Access Exclusive</label>
                    <input type="text" class="form-control" id="access-exclusive" v-model="newModule.accessExclusive" required>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMainTable: true,
        items: [],
        modules: [],
        showModal: false,
        newItem: {
          name: '',
          default: '',
          description: ''
        },
        newModule: {
          module: '',
          description: '',
          accessExclusive: ''
        }
      };
    },
    methods: {
      toggleTable() {
        this.isMainTable = !this.isMainTable;
      },
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.newItem = {
          name: '',
          default: '',
          description: ''
        };
        this.newModule = {
          module: '',
          description: '',
          accessExclusive: ''
        };
      },
      addItemOrModule() {
        if (this.isMainTable) {
          this.items.push({ ...this.newItem });
        } else {
          this.modules.push({ ...this.newModule });
        }
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }
  </style>
  