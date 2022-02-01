<template>
  <div class="banner-container">
    <!-- 引入表格把需要渲染的data对象和 :data 绑定，自动会对应好相应的数据，并且会根据数据的数量， 生成对应的表格-->
    <el-table :data="datas.data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <!-- ，scope 是私有作用域 ，在作用域里，scope 就等于数据对象，scope.row 相当于属性名 -->
        <template slot-scope="scope">
          <!-- $index 是内部写好的一个索引，和数组对应，可以理解成v-for里的index  默认从0开始  -->
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px; height: 150px"
            :src="scope.row.midImgTep"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px; height: 150px"
            :src="scope.row.bigImgTep"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip content="点击编辑" placement="top">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="addBanner">
      <div class="button">
        <el-row>
          <el-button type="primary" @click="dialogFormVisible2 = true"
            >添加轮播图</el-button
          >
        </el-row>
      </div>
      <div class="dia">
        <el-dialog
          title="选择生成轮播图的数量"
          :visible.sync="dialogFormVisible2"
        >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.count"
              :label="item.name"
              :value="item.count"
            >
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="addBanner">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="img-container">
        <el-row>
          <el-col :span="12">
            <Upload title="图片上传" :url="form.midImg" v-model="form.midImg"
          /></el-col>
          <el-col :span="12"
            ><Upload title="图片上传" :url="form.bigImg" v-model="form.bigImg"
          /></el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeAndRanding">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getBanner, setBanner } from "@/api/banner";
import { severUrl } from "@/severUrl";
import Upload from "@/components/Upload";

export default {
  name: "",
  props: [""],
  data() {
    return {
      // 编辑轮播图的数据
      datas: [],
      dialogFormVisible: false,
      form: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
        id: "",
      },
      // 没有数据时，手动添加相应的数据
      options: [
        { name: "1张轮播图", count: 1 },
        { name: "2张轮播图", count: 2 },
        { name: "3张轮播图", count: 3 },
        { name: "4张轮播图", count: 4 },
        { name: "5张轮播图", count: 5 },
        { name: "6张轮播图", count: 6 },
        { name: "7张轮播图", count: 7 },
      ],
      value: 0,
      dialogFormVisible2: false,
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
    //通过api获取到渲染需要的数据
    fetchData() {
      getBanner().then((res) => {
        this.datas = res;
        console.log(res);
        //给所有的请求到的图片手动加上请求头，否则图片无法显示
        for (var item of this.datas.data) {
          if (item.midImg === "") {
            item.midImgTep =
              "https://scpic.chinaz.net/files/pic/pic9/201601/apic18171.jpg";
          } else {
            item.midImgTep = severUrl + item.midImg;
          }
          if (item.bigImg === "") {
            item.bigImgTep =
              "https://scpic.chinaz.net/files/pic/pic9/201601/apic18171.jpg";
          } else {
            item.bigImgTep = severUrl + item.bigImg;
          }
        }
      });
    },
    changeAndRanding() {
      const arr = [...this.datas.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;
        this.$message("信息修改成功");
        this.fetchData();
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      //给form赋值，等于点击编辑的那行的 数据。 这里的row其实就等于 datas.data
      this.form = { ...row };
      this.dialogFormVisible = true;
      // console.log(this.form);
    },
    addBanner() {
      var arr = [];
      for (var i = 1; i <= this.value; i++) {
        arr.push({
          title: "请编辑图片内容",
          description: "请编辑描述",
          midImg: "",
          bigImg: "",
        });
      }
      setBanner(arr).then((res) => {
        console.log(res);
        this.dialogFormVisible2 = false;
        this.fetchData();
      });
    },
  },

  watch: {},
};
</script>
<style scoped>
.banner-container {
  margin: 20px;
}
.bannerImg {
  display: flex;
}
.upload {
  margin: 20px;
}
.dia {
  width: 500px;
}
.addBanner {
  margin-top: 50px;
}
</style>