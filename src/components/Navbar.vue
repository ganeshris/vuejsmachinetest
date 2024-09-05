<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../assets/micrologo.png" alt="logo" />
    </div>
    <div class="navbar-menu">
      <button class="navbar-item">CLOUDNSURE</button>
      <router-link to="/home" class="navbar-item">
        <span class="material-symbols-outlined">home</span>
      </router-link>
      <router-link to="/dashboard" class="navbar-item">
        <span class="material-symbols-outlined">apps</span>
      </router-link>
      <router-link to="/report" class="navbar-item">
        <span class="material-symbols-outlined">summarize</span>
      </router-link>
      <router-link to="/setup" class="navbar-item">
        <span class="material-symbols-outlined">settings</span>
      </router-link>
    </div>
    <div class="user-section" @click="toggleDropdown" aria-haspopup="true" :aria-expanded="showDropdown">
      <button class="navbar-item user-icon">
        <span class="material-icons">account_circle</span>
        <span class="username">{{ username }}</span>
      </button>
      <transition name="dropdown">
        <div v-if="showDropdown" class="dropdown-menu" role="menu">
          <button class="dropdown-item" @click="about" role="menuitem">About</button>
          <button class="dropdown-item" @click="profile" role="menuitem">Profile Settings</button>
          <button class="dropdown-item" @click="change" role="menuitem">Change Password</button>
          <button class="dropdown-item" @click="logout" role="menuitem">Log out</button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const showDropdown = ref(false);
const username = ref('Username');  // Replace with actual user data logic

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const about = () => {
  // Add functionality
};

const profile = () => {
  // Add functionality
};

const change = () => {
  // Add functionality
};

const logout = () => {
  // Add logout functionality
  console.log('Logout clicked');
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);
  padding: 1rem;
  color: var(--light);

  .logo img {
    height: 40px;
  }

  .navbar-menu {
    display: flex;

    .navbar-item {
      background: none;
      border: none;
      color: var(--light);
      font-size: 1rem;
      margin: 0 1rem;
      cursor: pointer;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: var(--secondary);
      }
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    .user-icon {
      background: none;
      border: none;
      color: var(--light);
      display: flex;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.2s ease-in-out;

      .material-icons {
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }

      .username {
        margin-left: 0.5rem;
        display: block;
      }

      &:hover {
        color: var(--secondary);
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: var(--dark);
      color: var(--light);
      border: 1px solid var(--secondary);
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      transition: opacity 0.2s ease-in-out;

      .dropdown-item {
        background: none;
        border: none;
        color: var(--light);
        padding: 0.5rem 1rem;
        text-align: left;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: var(--dark-alt);
        }
      }
    }
  }

  .dropdown-enter-active, .dropdown-leave-active {
    transition: opacity 0.2s;
  }

  .dropdown-enter, .dropdown-leave-to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .navbar-menu {
    flex-direction: column;
    align-items: center;

    .navbar-item {
      margin: 0.5rem 0;
    }
  }
}
</style>
