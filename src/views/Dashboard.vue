<template>
  <div class="container mt-4">
    <h1 class="mb-4">All Dashboard</h1>
    <div class="mb-3">
      <button class="btn btn-primary" @click="toggleDashboardBuilder">+ Dashboard Builder</button>
    </div>

    <!-- Report Cards View -->
    <div v-if="!showDashboardBuilder">
      <div class="row">
        <div
          v-for="report in reports"
          :key="report.id"
          class="col-md-4 mb-4"
        >
          <div class="card" @click="goToReport(report.id)">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">{{ report.title }}</h5>
              <span :class="statusClass(report.status)"></span>
            </div>
            <div class="card-body">
              <p class="card-text">{{ report.description }}</p>
              <p class="card-text">
                Last Updated On: <span>{{ formattedDate(report.lastUpdated) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard Builder Table View -->
    <div v-if="showDashboardBuilder">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard Builder</h2>
        <div>
          <button class="btn btn-primary me-2">Dashboard Runner</button>
          <button class="btn btn-success me-2" @click="downloadXLS">XLSX</button>
          <button class="btn btn-primary" @click="showModal = true">+ ADD</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th scope="col">Go To</th>
              <th scope="col">Dashboard Name</th>
              <th scope="col">Description</th>
              <th scope="col">Security Profile</th>
              <th scope="col">Add to Home</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
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
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Add New Dashboard</h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addDashboard">
                <div class="mb-3">
                  <label for="dashboardName" class="form-label">Dashboard Name</label>
                  <input type="text" class="form-control" id="dashboardName" v-model="newDashboard.dashboardName" required>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" v-model="newDashboard.description" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="securityProfile" class="form-label">Security Profile</label>
                  <input type="text" class="form-control" id="securityProfile" v-model="newDashboard.securityProfile" required>
                </div>
                <div class="mb-3">
                  <label for="addToHome" class="form-label">Add to Home</label>
                  <input type="text" class="form-control" id="addToHome" v-model="newDashboard.addToHome" required>
                </div>
                <div class="mb-3">
                  <label for="action" class="form-label">Action</label>
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
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
  name: 'Dashboard',
  data() {
    return {
      reports: [],
      showDashboardBuilder: false,
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
  created() {
    this.fetchReports();
    this.fetchDashboards();
  },
  methods: {
    fetchReports() {
      const token = localStorage.getItem('token');
      const auth = 'Bearer ' + token;

      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/get_Dashboard_header`, {
          headers: {
            Authorization: auth
          }
        })
        .then(response => {
          this.reports = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the reports:', error);
        });
    },
    fetchDashboards() {
      axios.get(`${import.meta.env.VITE_APP_API_URL}/get_Dashboard_header`)
        .then(response => {
          console.log('Fetched dashboards:', response.data);  // Debugging
          this.dashboards = response.data.map(item => ({
            goTo: item.dashbord1_Line ? 'View Details' : '',  // Adjust based on your actual needs
            dashboardName: item.dashboard_name,
            description: item.description,
            securityProfile: item.secuirity_profile,
            addToHome: item.addToHome || '',  // Ensure this field is in the response or handle as needed
            action: item.action || ''  // Ensure this field is in the response or handle as needed
          }));
          this.loading = false;
        })
        .catch(error => {
          console.error("There was an error fetching the dashboards!", error);
          this.loading = false;
        });
    },
    statusClass(status) {
      return {
        'bg-success text-white rounded-circle p-1': status === 'green',
        'bg-danger text-white rounded-circle p-1': status === 'red'
      };
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    toggleDashboardBuilder() {
      this.showDashboardBuilder = !this.showDashboardBuilder;
    },
    goToReport(reportId) {
      // Handle report click
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
      // Here you would typically send a POST request to your API to add the new dashboard
      // For now, we'll just add it to the local dashboards array
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
  }
};
</script>
