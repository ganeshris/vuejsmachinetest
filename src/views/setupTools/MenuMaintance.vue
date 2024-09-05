<template>
  <div class="container mt-5">
    <div class="header mb-4 d-flex justify-content-between align-items-center">
      <h1>Menu Maintenance</h1>
      <div class="actions">
        <button class="btn btn-primary me-2" @click="downloadTemplate">
          Download Template
        </button>
        <button class="btn btn-primary me-2" @click="importData">Import</button>
        <button class="btn btn-primary me-2" @click="exportXlsx">XLSX</button>
        <button class="btn btn-success" @click="addItem">+ ADD</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>NO.</th>
            <th>Menu Item Name</th>
            <th>ID</th>
            <th>Sequence</th>
            <th>Module Name</th>
            <th>Menu Action Link</th>
            <th>Status</th>
            <th>Sub Menu</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="10" class="text-center">Loading...</td>
          </tr>
          <tr v-for="(item, index) in menuItems" :key="item.menuItemId">
            <td>
              <input type="checkbox" v-model="item.selected" />
            </td>
            <td>{{ index + 1 }}</td>
            <td><input class="form-control" v-model="item.menuItemDesc" /></td>
            <td>{{ item.id }}</td>
            <td><input class="form-control" v-model="item.itemSeq" /></td>
            <td><input class="form-control" v-model="item.moduleName" /></td>
            <td>
              <input
                class="form-control"
                v-model="item.main_menu_action_name"
              />
            </td>
            <td><input class="form-control" v-model="item.status" /></td>
            <td><input class="form-control" v-model="item.subMenus" /></td>
            <td>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="updateItem(item.id)"
              >
                &#9998;
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteItem(item.id)"
              >
                &#128465;
              </button>
            </td>
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
      menuItems: [],
      loading: true,
    };
  },
  created() {
    this.fetchMenuItems();
  },
  methods: {
    async fetchMenuItems() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api1/submenu1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        this.menuItems = data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        this.loading = false;
      }
    },
    downloadTemplate() {
      const link = document.createElement("a");
      link.href = "path/to/your/template.xlsx";
      link.download = "template.xlsx";
      link.click();
    },
    importData() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx, .xls";
      input.onchange = async (event) => {
        const target = event.target;
        if (target && target instanceof HTMLInputElement && target.files) {
          const file = target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
              const token = localStorage.getItem("token");
              const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/api/import`,
                {
                  method: "POST",
                  body: formData,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.ok) {
                this.fetchMenuItems();
              } else {
                console.error("Failed to import data");
              }
            } catch (error) {
              console.error("Error importing data:", error);
            }
          }
        }
      };
      input.click();
    },
    exportXlsx() {
      const token = localStorage.getItem("token");
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "menu-items.xlsx";
          link.click();
        })
        .catch((error) => console.error("Error exporting data:", error));
    },
    addItem() {
      this.menuItems.push({
        id: Date.now(),
        menuItemName: "",
        sequence: "",
        moduleName: "",
        menuActionLink: "",
        status: "",
        subMenu: "",
      });
    },
    async updateItem(id) {
      const item = this.menuItems.find((item) => item.id === id);
      if (item) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/api/menu-items/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(item),
            }
          );
          if (!response.ok) {
            console.error("Failed to update item");
          }
        } catch (error) {
          console.error("Error updating item:", error);
        }
      }
    },
    async deleteItem(id) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/menu-items/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          this.menuItems = this.menuItems.filter((item) => item.id !== id);
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
  },
};
</script>
