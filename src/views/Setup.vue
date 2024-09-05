<template>
  <main class="container mt-5">
    <h1 class="title text-center mb-4">Setup Tools</h1>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="(tool, index) in tools"
        :key="index"
      >
        <CardComponent
          :title="tool.title"
          :description="tool.description"
          :route="tool.route"
        >
          <template #icon>
            <i class="fas fa-cog"></i>
          </template>
        </CardComponent>
      </div>
    </div>
  </main>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
export default {
  name: 'SetupTools',
  components: {
    CardComponent
  },
  data() {
    return {
      tools: [
        { title: 'User Maintenance', description: 'User Maintenance', route: '/usermaintenance' },
        { title: 'User Group Maintenance', description: 'User Group Maintenance', route: '/usergroupmaintenance' },
        { title: 'Menu Maintenance', description: 'Menu Maintenance', route: '/menumaintenance' },
        { title: 'Menu Access Control', description: 'Menu Access Control', route: '/menuaccesscontrol' },
        { title: 'System Parameter', description: 'System Parameter', route: '/systemparameter' },
        { title: 'Access Type', description: 'Access Type', route: '/accesstype' },
        { title: 'Document Sequence', description: 'Document Sequence', route: '/documentsequence' },
        { title: 'Reports', description: 'Reports', route: '/reports' },
        { title: 'Dashboard Description', description: 'Dashboard Description', route: '/dashboardescription' },
      ]
    }
  }
}
</script>


<!-- <style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -700px; 
}

.title {
  text-align: center;
  margin-bottom: 24px; 
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
  justify-content: center; 
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card-container {
    justify-content: center;
  }
}

@media (min-width: 1025px) {
  .card-container {
    justify-content: center;
  }
}
</style> -->