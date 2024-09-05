<template>
  <div class="menu-access-control container mt-5">
    <div class="header mb-4">
      <h1>Menu Access Control</h1>
      <div class="actions d-flex align-items-center">
        <select v-model="selectedRole" class="form-select me-2">
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
        <button class="btn btn-primary me-2" @click="reload">RELOAD</button>
        <div class="form-check me-2">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="showAll"
            id="showAllCheckbox"
          />
          <label class="form-check-label" for="showAllCheckbox">
            Show All
          </label>
        </div>
        <button class="btn btn-success" @click="addItem">+ ADD</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>NO.</th>
            <th>Menu Item Name</th>
            <th>View</th>
            <th>Create</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Query</th>
            <th>Export</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="loading text-center">Loading...</td>
          </tr>
          <tr v-for="(item, index) in filteredMenuItems" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.menuItemName }}</td>
            <td><input type="checkbox" v-model="item.permissions.view" /></td>
            <td><input type="checkbox" v-model="item.permissions.create" /></td>
            <td><input type="checkbox" v-model="item.permissions.edit" /></td>
            <td><input type="checkbox" v-model="item.permissions.delete" /></td>
            <td><input type="checkbox" v-model="item.permissions.query" /></td>
            <td><input type="checkbox" v-model="item.permissions.export" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [], // Roles fetched from the API
      selectedRole: "",
      showAll: false,
      menuItems: [],
      loading: true,
    };
  },
  computed: {
    filteredMenuItems() {
      return this.showAll
        ? this.menuItems
        : this.menuItems.filter((item) => item.role === this.selectedRole);
    },
  },
  created() {
    this.fetchRoles();
    this.fetchMenuItems();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/getAllMenuItems`
        );
        const data = await response.json();
        this.roles = data;
        this.selectedRole = this.roles.length > 0 ? this.roles[0] : "";
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    async fetchMenuItems() {
      try {
        const response = await fetch("https://api.example.com/menu-access");
        const data = await response.json();
        this.menuItems = data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        this.loading = false;
      }
    },
    reload() {
      this.loading = true;
      this.fetchMenuItems();
    },
    addItem() {
      this.menuItems.push({
        id: Date.now(),
        menuItemName: "",
        role: this.selectedRole,
        permissions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          query: false,
          export: false,
        },
      });
    },
  },
};
</script>
<style scoped>
.menu-access-control {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.table-responsive {
  margin-top: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
