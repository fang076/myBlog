<template>
  <div class="project-list-container">
    <div class="list">
      <el-table :data="data" style="width: 100%" border>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目关键字" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预览图" width="250" align="center">
          <template slot-scope="scope">
            <div class="demo-image">
              <div class="block">
                <span class="demonstration"></span>
                <el-image
                  style="width: 120px; height: 120px"
                  :src="scope.row.thumb2"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="200"
          class="icon-list"
        >
          <template slot-scope="scope">
            <a :href="scope.row.github ? scope.row.github : ''" target="_blank">
              <el-button
                class="button github"
                size="small"
                icon="iconfont icon-github-fill"
                circle
              ></el-button>
            </a>
            <el-button
              class="button"
              size="small"
              @click="handleEdit(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              class="button"
              size="small"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="编辑项目"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(100字以内,分类请用 ' , ' 隔开)">
          <el-input
            v-model="form.description"
            type="textarea"
            rows="3"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <Upload title="上传项目预览图" v-model="form.thumb" :url="form.thumb" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { getProject, deleteProject, editProject } from "@/api/project.js";
import { severUrl } from "@/severUrl.js";

export default {
  name: "",
  props: [""],
  data() {
    return {
      id: null,
      data: [],
      form: [],
      srcList: [],
      dialogFormVisible: false,
    };
  },

  components: {
    Upload,
  },

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    //初始化获取所有的项目数据
    fetchData() {
      getProject().then(({ data }) => {
        this.data = data;
        for (var item of this.data) {
          // 项目页面需要2个网址，一个是未被污染的，用于显示upload的预览图，一个需要 拼接serverUrl 的地址 循环遍历所有的数组，然后 给 数组srcList push 进去。
          item.thumb2 = severUrl + item.thumb;
          this.srcList.push(item.thumb2);
          item.description = item.description.toString();
        }
      });
    },

    // 删除，本身传入，然后通过 形参的id 精确删除。
    handleDelete(row) {
      this.$confirm("确定要删除此项目吗？", "删除需要谨慎", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(row.id).then((res) => {
            this.fetchData();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 点开编辑后，获取到所有的数据。数据来自于用于渲染的数据
    handleEdit(row) {
      this.form = { ...row };
      // 曲线救国，用thumb2 接受 thumb ，这样就可以使用不被污染的图片，因为在upload组件中，设定了自动添加serverUrl
      this.thumb2 = row.thumb;
      this.id = row.id;
      this.dialogFormVisible = true;
    },

    // 点击确定后，编辑项目内容
    editConfirm() {
      var obj = { ...this.form, description: this.form.description.split(",") }; //因为需要传递一个数组，需要把描述信息分割成数组上传
      editProject({ id: this.id, data: obj }).then((res) => {
        this.$message({
          type: "success",
          message: "编辑成功!",
        });
        // 关闭dia窗口
        this.dialogFormVisible = false;
        this.fetchData();
      });
    },
  },

  watch: {},
};
</script>
<style  scoped>
.github {
  border: 0;
  background: #e6f1f8;
  margin-right: 10px;
}
.project-list-container {
  margin: 20px;
  width: 80vw;
}
</style>