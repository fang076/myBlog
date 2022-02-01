<template>
  <div class="add-blog-container">
    <div class="addblog">
      <!-- 文章标题 -->
      <div class="title">
        <h2 class="title">文章标题</h2>
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </div>
      <!-- markdown 编辑器 ，https://www.npmjs.com/package/@toast-ui/vue-editor 详细文档介绍-->
      <div class="markdown">
        <h3 class="main">文本内容</h3>
        <Editor class="editor" height="700px" ref="toastuiEditor" />
      </div>
      <!-- 文章的描述 -->
      <div class="description">
        <h4>文章描述</h4>
        <el-input
          type="textarea"
          placeholder="请输入文章描述"
          v-model="form.description"
          maxlength="60"
          show-word-limit
          rows="3"
        >
        </el-input>
      </div>
      <!-- 文章分类，通过get blog type 的api 获取到分类，然后让form的数据和获取到的data匹配 -->
      <div class="blogTypeSelect">
        <h4>选择分类</h4>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in select"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 上传图片    组件 upload 必须传递2个值  title  和  url  url 通过form.thumb获取到,  当文件上传,thumb 发生改变,会重新计算并且渲染 -->
      <div class="upload">
        <Upload title="上传封面" v-model="form.thumb" :url="form.thumb" />
      </div>
      <div class="button">
        <el-row>
          <el-button size="medium" v-model="form" @click="handleEditBlog"
            >编辑文章</el-button
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import "@toast-ui/editor/dist/toastui-editor.css"; //markdown文本编译器样式
import { Editor } from "@toast-ui/vue-editor"; //导入文本编辑器
import { getBlogType } from "@/api/blogType.js"; //获取分类
import { findOneBlog, editBlog } from "@/api/blog"; //获取精确定位到文章的api 和 编辑pai *editBlog 的api 需要传递一个 对象 {id:   , data:{}}的形式传递
export default {
  name: "",
  props: [""] /*  */,
  data() {
    return {
      // 储存网址栏传过来的 this.$route.parmas.id  ,然后获取到单篇文章
      id: null,
      // 渲染表单的数据, 最后通过  obj = 表单内的 绑定的v-model 属性 ,上传到服务器
      form: {
        title: "",
        thumb: "",
        description: "",
      },
      select: [],
      value: "",
    };
  },

  components: {
    // 安装markdown 插件 ，注册
    Editor,
    Upload,
  },

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {
    this.id = this.$route.params.id;
    this.fetchData();
  },
  methods: {
    //如果有2个数据请求API，不要把数据混在一起，需要分开写。  否则请求到会被覆盖
    fetchData() {
      findOneBlog(this.id).then((res) => {
        this.form = res.data;
        this.value = res.data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
      getBlogType().then((res) => {
        this.select = res.data;
      });
    },
    // 上传文章的函数，把有所有的数据  封装在obj对象内
    handleEditBlog() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        // 超级大坑，debug了一个小时，一开始让vulue 等于一个 res.data.name 了。 所以如果不对value 进行修改，默认为一个字符串，而不是一个类型ID。  而数据需要的是一个id
        categoryId: this.value,
        htmlContent: html,
        thumb: this.form.thumb,
      };
      if (
        obj.title &&
        obj.htmlContent &&
        obj.description &&
        obj.categoryId &&
        obj.createDate
      ) {
        editBlog({ id: this.id, data: obj }).then((res) => {
          // 清空数据
          this.form.title = "";
          this.form.description = "";
          this.form.thumb = "";
          this.value = "";
          // 弹出通知，并且跳转到文章列表页
          this.$notify({
            title: "编辑成功",
            message: "为您跳转到文章列表页",
            position: "bottom-left",
          });
          this.$router.push({ path: "/blogList" });
        });
      } else {
        this.$message.error("编辑失败，请填写封面图片外的所有内容");
      }
    },
  },

  watch: {},
};
</script>


<style  scoped>
.add-blog-container {
  margin: 30px 20px;
}
.upload {
  margin: 20px 0;
}
.blogTypeSelect {
  margin-top: 20px;
}
</style>