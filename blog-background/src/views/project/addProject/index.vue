<template>
  <div class="addProject-container">
    <div class="name-container">
      <h2>项目名称</h2>
      <el-input
        type="text"
        class="name-input"
        placeholder="请输入项目名称"
        v-model="form.name"
        maxlength="20"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="description-container">
      <h3>项目关键词</h3>
      <el-input
        type="textarea"
        placeholder="请输入项目关键词，用 ' , ' 隔开"
        v-model="form.description"
        maxlength="100"
        show-word-limit
        rows="4"
      >
      </el-input>
    </div>
    <div class="url-container">
      <h4>项目URL地址</h4>
      <el-input
        type="text"
        placeholder="请输入项目的url地址"
        v-model="form.url"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="github-container">
      <h4>项目github地址</h4>
      <el-input
        type="text"
        placeholder="请输入项目的github地址"
        v-model="form.github"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="upload">
      <Upload title="上传项目预览图" v-model="form.thumb" :url="form.thumb" />
    </div>
    <div class="button">
      <el-row>
        <el-button @click="handleAddProject">上传项目</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/project.js";
import Upload from "@/components/Upload";

export default {
  name: "",
  props: [""],
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "http://",
        github: "https://github.com/fang076",
        thumb: "",
        order: 1,
      },
    };
  },

  components: {
    Upload,
  },

  computed: {},
  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    //将string 转化为 array 格式上传
    handleAddProject() {
      var obj = {
        ...this.form,
        description: this.form.description.split(","),
        thumb: this.form.thumb
          ? this.form.thumb
          : "/static/upload/2022-1-22-19-5-8-540-98c72.png",
      };
      if (
        this.form.name &&
        this.form.description &&
        this.form.url &&
        this.form.github &&
        this.form.thumb
      ) {
        addProject(obj).then((res) => {
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
          // 路由跳转
          this.$router.push("/projectsList");
        });
      } else {
        this.$message({
          showClose: true,
          message: "请填写项目名称和描述",
          type: "error",
        });
      }
    },
  },

  watch: {},
};
</script>
<style scoped>
.addProject-container {
  margin: 50px;
  width: 800px;
}
.name-input {
  width: 400px;
}
.upload {
  margin: 30px 0;
}
</style>