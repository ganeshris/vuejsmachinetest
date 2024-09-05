<template>
  <div class="home container mt-5">
    <div class="row">
      <div class="col-12">
        <div class="index-cards row">
          <div class="index-card col-12 col-sm-6 col-md-4 mb-4" v-for="(index, idx) in indices" :key="idx">
            <div class="card h-100 shadow-sm">
              <div class="card-body text-center">
                <h3 class="card-title">{{ index.title }}</h3>
                <p class="index-value">{{ index.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs mt-4">
      <div class="tab-buttons btn-group w-100">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === tab }"
          class="btn btn-outline-primary"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="tab-content p-3 mt-3 border rounded shadow-sm bg-white">
        <div v-if="activeTab === 'Activities'">
          <!-- Activities content here -->
          <p class="text-muted">No activities to show.</p>
        </div>
        <div v-else-if="activeTab === 'Suggestion For You'">
          <div class="suggestion-box d-flex align-items-center justify-content-between p-3">
            <p class="mb-0">Suggestion could be found.</p>
            <div class="loader" v-if="isLoading"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indices: [
        { title: 'Index1', value: 0 },
        { title: 'Index2', value: 0 },
        { title: 'Index3', value: 0 }
      ],
      tabs: ['Activities', 'Suggestion For You'],
      activeTab: 'Activities',
      isLoading: true
    };
  },
  mounted() {
    // Simulate data fetching
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
};
</script>

<style scoped>
.index-card {
  padding: 0 !important;
}

.card-title {
  font-size: 1.25em;
}

.index-value {
  color: #ff6347; /* Tomato color for better visibility */
  font-size: 1.75em;
  margin: 0;
}

.tab-buttons .btn {
  border-radius: 0;
}

.tab-buttons .btn.active {
  background-color: #007bff;
  color: white;
}

.suggestion-box {
  background-color: #f0f9ff;
  border: 1px solid #007bff;
  border-radius: 8px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
