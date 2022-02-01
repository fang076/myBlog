<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" :size="160" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>

    <Menu />
    <Contact v-if="data" class="contact" />
    <p v-if="data" class="footer">
      {{ data.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.avatar-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 14px;
  color: white;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
  margin: 30px 0;
}
.contact {
  margin-top: 50px;
}
</style>
