<template>
  <div class="about-container">
    <div class="about">
      <h2>我的网页</h2>
      <el-input
        v-model="input"
        placeholder="请输入设置的网址"
        :disabled="isdisabled"
      ></el-input>
    </div>
    <div class="button">
      <el-row>
        <el-button type="primary" @click="handlePut">{{
          btnContent
        }}</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      input: "http://192.168.2.100:8080/",
      btnContent: "点击编辑",
      //控制disabled 的属性。
      isdisabled: true,
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then((res) => {
        this.input = res.data;
      });
    },
    handlePut() {
      if (this.btnContent === "点击编辑") {
        this.isdisabled = false;
        this.btnContent = "完成编辑";
      } else {
        if (this.input) {
          var httpInput = this.input;
          setAbout({ url: httpInput }).then((res) => {
            this.fetchData();
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.btnContent = "点击编辑";
            this.isdisabled = true;
          });
        } else {
          this.$message.error("请输入网址");
        }
      }
    },
  },

  watch: {},
};
</script>
<style  scoped>
.about-container {
  margin: 80px;
}
.about {
  width: 800px;
  margin-bottom: 30px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>