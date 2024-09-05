<template>
  <div id="app" class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2>Dashboard Builder</h2>
      <div>
        <button class="btn btn-primary mr-2">Dashboard Runner</button>
        <button class="btn btn-success mr-2" @click="downloadXLS">XLSX</button>
        <button class="btn btn-primary" @click="showModal = true">+ ADD</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Go To</th>
            <th scope="col">Dashboard Name</th>
            <th scope="col">Description</th>
            <th scope="col">Security Profile</th>
            <th scope="col">Add to home</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-else v-for="(item, index) in dashboards" :key="index">
            <td>{{ item.goTo }}</td>
            <td>{{ item.dashboardName }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.securityProfile }}</td>
            <td>{{ item.addToHome }}</td>
            <td>{{ item.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Dashboard</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addDashboard">
              <div class="form-group">
                <label for="dashboardName">Dashboard Name</label>
                <input type="text" class="form-control" id="dashboardName" v-model="newDashboard.dashboardName" required>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" v-model="newDashboard.description" required></textarea>
              </div>
              <div class="form-group">
                <label for="securityProfile">Security Profile</label>
                <input type="text" class="form-control" id="securityProfile" v-model="newDashboard.securityProfile" required>
              </div>
              <div class="form-group">
                <label for="addToHome">Add to Home</label>
                <input type="text" class="form-control" id="addToHome" v-model="newDashboard.addToHome" required>
              </div>
              <div class="form-group">
                <label for="action">Action</label>
                <input type="text" class="form-control" id="action" v-model="newDashboard.action" required>
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
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      dashboards: [],
      loading: true,
      showModal: false,
      newDashboard: {
        dashboardName: '',
        description: '',
        securityProfile: '',
        addToHome: '',
        action: ''
      }
    };
  },
  methods: {
    fetchDashboards() {
      axios.get( `${import.meta.env.VITE_APP_API_URL}/get_Dashboard_header`)
        .then(response => {
          this.dashboards = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error("There was an error fetching the dashboards!", error);
          this.loading = false;
        });
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.newDashboard = {
        dashboardName: '',
        description: '',
        securityProfile: '',
        addToHome: '',
        action: ''
      };
    },
    addDashboard() {
      this.dashboards.push({ ...this.newDashboard });
      this.closeModal();
    },
    downloadXLS() {
      const ws = XLSX.utils.json_to_sheet(this.dashboards.map(dashboard => ({
        "Go To": dashboard.goTo,
        "Dashboard Name": dashboard.dashboardName,
        "Description": dashboard.description,
        "Security Profile": dashboard.securityProfile,
        "Add to Home": dashboard.addToHome,
        "Action": dashboard.action
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Dashboards");
      XLSX.writeFile(wb, "dashboards.xlsx");
    }
  },
  mounted() {
    this.fetchDashboards();
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
