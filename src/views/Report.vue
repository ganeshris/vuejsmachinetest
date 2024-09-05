<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-12 text-center">
        <h1 v-if="view === 'cards'">All Reports</h1>
        <h1 v-else-if="view === 'sql'">SQL Report Builder</h1>
        <h1 v-else-if="view === 'url'">URL Report Builder</h1>
      </div>
    </div>

    <!-- Buttons in upper right -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary me-2" @click="buildReport('sql')">
        +Report Builder (SQL)
      </button>
      <button class="btn btn-primary me-2" @click="buildReport('url')">
        +Report Builder (URL)
      </button>
      <button class="btn btn-primary" @click="showAddModal = true">
        +Add Report
      </button>
    </div>

    <div v-if="view === 'cards'" class="row">
      <div
        v-for="report in reports"
        :key="report.id"
        class="col-12 col-md-6 col-lg-4 mb-4"
      >
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">{{ report.title }}</h5>
            <span :class="statusClass(report.status)"></span>
          </div>
          <div class="card-body">
            <p>{{ report.description }}</p>
          </div>
          <div class="card-footer">
            <p class="mb-0">
              Last Updated On: <span>{{ report.lastUpdated }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Go To</th>
            <th scope="col">Report Name</th>
            <th scope="col">Report Description</th>
            <th scope="col">Active</th>
            <th scope="col">Folder Name</th>
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
          <tr v-else v-for="(report, index) in reports" :key="index">
            <td>{{ report.goTo }}</td>
            <td>{{ report.reportName }}</td>
            <td>{{ report.reportDescription }}</td>
            <td>{{ report.active }}</td>
            <td>{{ report.folderName }}</td>
            <td>{{ report.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Report Modal -->
    <div v-if="showAddModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Report</h5>
            <button type="button" class="btn-close" @click="showAddModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addReport">
              <div class="mb-3">
                <label for="reportName" class="form-label">Report Name:</label>
                <input
                  type="text"
                  id="reportName"
                  v-model="newReport.reportName"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="reportDescription" class="form-label">Report Description:</label>
                <textarea
                  id="reportDescription"
                  v-model="newReport.reportDescription"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="active" class="form-label">Active:</label>
                <select
                  id="active"
                  v-model="newReport.active"
                  class="form-select"
                  required
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="folderName" class="form-label">Folder Name:</label>
                <input
                  type="text"
                  id="folderName"
                  v-model="newReport.folderName"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="goTo" class="form-label">Go To:</label>
                <input
                  type="text"
                  id="goTo"
                  v-model="newReport.goTo"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="action" class="form-label">Action:</label>
                <input
                  type="text"
                  id="action"
                  v-model="newReport.action"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reports: [],
      loading: false,
      view: "cards",
      showAddModal: false,
      newReport: {
        reportName: "",
        reportDescription: "",
        active: "",
        folderName: "",
        goTo: "",
        action: "",
      },
    };
  },
  created() {
    this.fetchReports();
  },
  methods: {
    fetchReports() {
      const token = localStorage.getItem("token");
      const auth = "Bearer " + token;

      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/Rpt_builder2/Rpt_builder2`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((response) => {
          this.reports = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the reports:", error);
        });
    },
    statusClass(status) {
      return {
        "bg-success": status === "green",
        "bg-danger": status === "red",
      };
    },
    buildReport(type) {
      this.loading = true;
      const token = localStorage.getItem("token");
      const auth = "Bearer " + token;
      let url = "";

      if (type === "sql") {
        url = `${import.meta.env.VITE_APP_API_URL}/Rpt_builder2/Rpt_builder2`; // Replace with the actual SQL endpoint
        this.view = "sql";
      } else if (type === "url") {
        url = `${import.meta.env.VITE_APP_API_URL}/Rpt_builder2/Rpt_builder2`; // Replace with the actual URL endpoint
        this.view = "url";
      }

      axios
        .get(url, {
          headers: {
            Authorization: auth,
          },
        })
        .then((response) => {
          this.reports = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("There was an error fetching the reports:", error);
          this.loading = false;
        });
    },
    addReport() {
      const token = localStorage.getItem("token");
      const auth = "Bearer " + token;
      const url =
        this.view === "sql"
          ? `${import.meta.env.VITE_APP_API_URL}/sql_endpoint`
          : `${import.meta.env.VITE_APP_API_URL}/url_endpoint`;

      axios
        .post(url, this.newReport, {
          headers: {
            Authorization: auth,
          },
        })
        .then((response) => {
          this.reports.push(response.data);
          this.showAddModal = false;
          this.newReport = {
            reportName: "",
            reportDescription: "",
            active: "",
            folderName: "",
            goTo: "",
            action: "",
          };
        })
        .catch((error) => {
          console.error("There was an error adding the report:", error);
        });
    },
    goToReport(reportId) {
      this.$router.push({ name: "ReportDetail", params: { id: reportId } });
    },
  },
};
</script>
