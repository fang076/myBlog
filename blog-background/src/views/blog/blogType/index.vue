<template>
  <div class="blog-type-container">
    <div class="add-blog-type">
      <el-select v-model="value" placeholder="等级" class="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="input"
        placeholder="请输入分类"
        class="input"
      ></el-input>
      <el-row>
        <el-button class="button" @click="handleAddBlogType"
          >上传分类</el-button
        >
      </el-row>
    </div>
    <div class="table-container">
      <el-table :data="datas" style="width: 1000px" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权重" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章数" width="120" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.articleCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑"
        :visible.sync="dialogFormVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="form">
          <el-form-item label="输入分类">
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="table-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="权重选择">
            <el-select
              v-model="form.order"
              placeholder="请选择权重等级，最高为1"
              class="form-select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updeteBlogType">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//引入各种api接口
import {
  getBlogType,
  setBlgoType,
  deleteBlgoType,
  findOneBlogType,
  updateOneBlogType,
} from "@/api/blogType";
export default {
  name: "",
  props: [""],
  data() {
    return {
      options: [
        {
          value: 1,
          label: "1",
        },
        {
          value: 2,
          label: "2",
        },
        {
          value: 3,
          label: "3",
        },
        {
          value: 4,
          label: "4",
        },
      ],
      value: 1,
      input: "",
      datas: [],
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    // 页面创建一开始，就需要从服务器获取数据，用于渲染页面
    this.fetchData();
  },
  methods: {
    // 添加分类，如果input 里有内容，传递  input 和 select 里的内容，post发送
    handleAddBlogType() {
      if (this.input) {
        setBlgoType({ name: this.input, order: this.value }).then((res) => {
          this.fetchData();
          this.$message({
            message: "提交成功",
            type: "success",
          });
          this.input = "";
        });
      } else {
        this.$message({
          message: "请输入分类内容",
          type: "warning",
        });
      }
    },
    // 封装获取数据的函数
    fetchData() {
      getBlogType().then((res) => {
        this.datas = res.data;
      });
    },
    // 删除，通过id来定位到需要删除的数据    {id}  解构数据，只能获取id的数据。
    handleDelete({ id, articleCount }) {
      this.$confirm(
        "删除该分类后，所有选择该分类的文章都会变成'未分类'状态，是否确定？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          deleteBlgoType(id).then((res) => {
            this.fetchData();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 编辑/更新，点编辑后 先让form 获得通过find 的api 查找到数据，然后打开dia，并且把form 的数据回填到dia 中
    handleEdit({ id }) {
      findOneBlogType(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },

    // 点击dia的确定按钮后，需要传入一个对象 ， 属性id 用于定位数据， 整个form 表单是用于更新数据。
    updeteBlogType() {
      updateOneBlogType({ id: this.form.id, data: this.form }).then((res) => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message({
          message: "编辑成功",
          type: "success",
        });
      });
    },
  },

  watch: {},
};
</script>
<style scoped>
.table-container {
  margin: 0 20px;
}
.add-blog-type {
  display: flex;
  margin: 20px 0 50px 20px;
}
.select {
  width: 80px;
}
.button {
  margin-left: 10px;
  width: 100px;
}
.input {
  width: 250px;
}
.table-input {
  width: 400px;
}
.form-select {
  width: 150px;
}
</style>