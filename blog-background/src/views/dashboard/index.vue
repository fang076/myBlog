<template>
  <div class="dashboard-container">
    <div class="dashboard-text">博客后台</div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  created() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
