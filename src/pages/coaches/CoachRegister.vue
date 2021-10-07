<template>
  <base-card>
    <coach-form v-on:save-data="saveData"></coach-form>
  </base-card>
</template>

<script>
import coachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    coachForm
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    }
  }
};
</script>
