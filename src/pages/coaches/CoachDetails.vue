<template>
  <div>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
          >{{ area }}</base-badge
        >
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['coachId'],
  data() {
    return {
      selectedCoach: null
    };
  },
  created() {
    this.$store.dispatch('coaches/findCoachById', {
      id: this.coachId
    });
    this.selectedCoach = this.$store.getters['coaches/selectedCoach'];
  }
};
</script>
