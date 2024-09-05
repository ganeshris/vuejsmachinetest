<template>
  <div
    :class="[
      'd-flex flex-column h-100 bg-light text-black transition-all duration-300',
      { 'w-64': isOpen, 'w-20': !isOpen },
    ]"
  >
    <div class="d-flex align-items-center justify-content-between p-3">
      <span v-if="isOpen" class="fs-4 fw-bold">Menu</span>
      <i v-else class="fa-solid fa-gear fs-2 cursor-pointer" @click="handleToggle"></i>
      <button class="btn btn-light" @click="handleToggle">
        <i class="fa-solid fa-list fs-6"></i>
      </button>
    </div>
    <nav v-if="isOpen" class="flex flex-column mt-3">
      <div v-for="item in menuItems" :key="item.menuId" class="relative">
        <button
          class="d-flex align-items-center p-3 w-100 text-start"
          @click="handleSubmenuToggle(item.menuId)"
        >
          <i v-if="item.main_menu_icon_name" :class="`fa-solid fa-${item.main_menu_icon_name}`" class="w-6 h-6 me-2"></i>
          <span>{{ item.menuItemDesc }}</span>
          <div class="ms-auto" v-if="item.subMenus.length">
            <i class="fa-solid fa-chevron-down" v-if="openSubmenu === item.menuId"></i>
            <i class="fa-solid fa-chevron-right" v-else></i>
          </div>
        </button>
        <ul
          v-if="item.subMenus.length && openSubmenu === item.menuId"
          class="ps-3 bg-secondary-subtle"
        >
          <li
            v-for="subItem in item.subMenus"
            :key="subItem.menuId"
            class="d-flex align-items-center p-2"
          >
            <span class="ms-4">{{ subItem.menuItemDesc }}</span>
            <div class="ms-auto" v-if="subItem.subMenus.length">
              <i class="fa-solid fa-chevron-down" v-if="openSubmenu === subItem.menuId"></i>
              <i class="fa-solid fa-chevron-right" v-else></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Sidebar',
  setup() {
    const isOpen = ref(true);
    const openSubmenu = ref(null);
    const menuItems = ref([]);

    const handleToggle = () => {
      isOpen.value = !isOpen.value;
    };

    const handleSubmenuToggle = (menuId) => {
      openSubmenu.value = openSubmenu.value === menuId ? null : menuId;
    };

    const fetchMenuItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/fndMenu/menuloadbyuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        menuItems.value = data;
        console.log('Fetched Menu Data:', data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    onMounted(() => {
      fetchMenuItems();
    });

    return {
      isOpen,
      openSubmenu,
      menuItems,
      handleToggle,
      handleSubmenuToggle,
    };
  },
};
</script>

<style scoped>
.w-64 {
  width: 16rem;
}

.w-20 {
  width: 5rem;
}

.transition-all {
  transition: all 0.3s;
}

.cursor-pointer {
  cursor: pointer;
}

.ps-3 {
  padding-left: 1rem;
}

.bg-secondary-subtle {
  background-color: #f8f9fa; /* Adjust the background color as needed */
}

.fs-4 {
  font-size: 1.5rem;
}

.fs-2 {
  font-size: 2rem;
}

.fs-6 {
  font-size: 1.5rem;
}

.bi {
  font-size: 1.5rem; /* Adjust icon size as needed */
}
</style>
