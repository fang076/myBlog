<template>
  <div>
    <div class="title" v-if="title">{{ title }}</div>
    <div>
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="header"
      >
        <img v-if="url" :src="imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { severUrl } from "@/severUrl";
export default {
  name: "",
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    imgUrl() {
      if (this.url) {
        return severUrl + this.url;
      }
    },
    header() {
      return {
        // 因为服务器端口需要鉴定你的权限，所以请求的时候必须带上token
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    //图片上传后的回调函数，会直接返回一个res ，res为图片的路径，用$emit 触发
    handleAvatarSuccess(res, file) {
      // console.log(res.data,typeof(res.data))
      this.$emit("input", res.data);
    },
  },

  watch: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
.title {
  margin-bottom: 20px;
}
</style>