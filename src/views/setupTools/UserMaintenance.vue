<template>
  <div class="container user-maintenance">
    <div class="header row align-items-center mb-3">
      <div class="col-12 col-md-6">
        <h1>User Maintenance</h1>
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
            <th>User Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>User Group Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center">Loading...</td>
          </tr>
          <tr v-for="user in users" :key="user.userId">
            <td>{{ user.userId }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.userGroupName }}</td>
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
      users: [],
      loading: true,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/getAllAppUser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        this.loading = false;
      }
    },
    downloadTemplate() {
      const link = document.createElement('a');
      link.href = 'path/to/your/template.xlsx';
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
              const token = localStorage.getItem('token');
              const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/importUserData`, {
                method: 'POST',
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if (response.ok) {
                this.fetchUserData(); // Reload user data after import
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
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/getAllAppUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'users.xlsx';
          link.click();
        })
        .catch(error => console.error('Error exporting data:', error));
    },
  },
};
</script>
