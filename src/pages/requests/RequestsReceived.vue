<template>
  <div>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else>
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    }
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      await this.$store.dispatch('requests/fetchUserRequests');
      this.isLoading = false;
    }
  },
  created() {
    this.fetchRequests();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
