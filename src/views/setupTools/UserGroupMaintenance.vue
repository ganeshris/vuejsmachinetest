<template>
  <div class="container user-group-maintenance">
    <div class="header row align-items-center mb-3">
      <div class="col-12 col-md-6">
        <h1>User Group Maintenance</h1>
      </div>
      <div class="col-12 col-md-6 text-md-right mt-2 mt-md-0">
        <div class="btn-group" role="group">
          <button class="btn btn-primary" @click="downloadTemplate">Download Template</button>
          <button class="btn btn-secondary" @click="importData">Import</button>
          <button class="btn btn-success" @click="exportXlsx">XLSX</button>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th>User Group No</th>
            <th>Group Name</th>
            <th>Description</th>
            <th>Group Level</th>
            <th>Status</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">Loading...</td>
          </tr>
          <tr v-for="group in groups" :key="group.userGroupNo">
            <td>{{ group.usrGrp }}</td>
            <td>{{ group.groupName }}</td>
            <td>{{ group.groupDesc }}</td>
            <td>{{ group.groupLevel }}</td>
            <td>{{ group.status }}</td>
            <td>{{ group.updatedate }}</td>
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
      groups: [],
      loading: true,
    };
  },
  created() {
    this.fetchGroupData();
  },
  methods: {
    async fetchGroupData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/getAllUsrGrp`); // Replace with your API endpoint
        const data = await response.json();
        this.groups = data;
      } catch (error) {
        console.error('Error fetching user group data:', error);
      } finally {
        this.loading = false;
      }
    },
    downloadTemplate() {
      const link = document.createElement('a');
      link.href = 'path/to/your/template.xlsx'; // Replace with the correct path to your template file
      link.download = 'template.xlsx';
      link.click();
    },
    importData() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xlsx, .xls';
      input.onchange = async (event) => {
        const target = event.target;
        if (target && target instanceof HTMLInputElement && target.files) {
          const file = target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
              const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/import`, { // Replace with your API endpoint
                method: 'POST',
                body: formData,
              });
              if (response.ok) {
                this.fetchGroupData(); // Reload group data after import
              } else {
                console.error('Failed to import data');
              }
            } catch (error) {
              console.error('Error importing data:', error);
            }
          }
        }
      };
      input.click();
    },
    exportXlsx() {
      fetch('https://api.example.com/export') // Replace with your API endpoint
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'user-groups.xlsx';
          link.click();
        })
        .catch(error => console.error('Error exporting data:', error));
    },
  },
};
</script>
