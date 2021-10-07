<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured."
      v-on:close="clearError"
    >
      {{ error }}
    </base-dialog>
    <section>
      <coach-filter v-on:updateFilters="updateFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="d-flex">
          <base-button v-on:click="loadCoaches" mode="outline"
            >Refresh</base-button
          >
          <base-button
            v-if="isLoggedIn && !isCoach"
            :isLink="true"
            to="/register"
            >Register as a coach</base-button
          >
        </div>

        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            v-bind:key="coach.id"
            v-bind:id="coach.id"
            v-bind:firstName="coach.firstName"
            v-bind:lastName="coach.lastName"
            v-bind:rate="coach.hourlyRate"
            v-bind:areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import coachItem from '../../components/coaches/CoachItem.vue';
import coachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  components: {
    coachItem,
    coachFilter
  },
  computed: {
    filteredCoaches() {
      let coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    updateFilters(newFilters) {
      this.activeFilters = newFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/fetchCoaches');
      } catch (error) {
        this.error = error.msg || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    clearError() {
      this.error = null;
    }
  },
  created() {
    this.loadCoaches();
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-direction: row;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
