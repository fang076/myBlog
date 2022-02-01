<template>
  <div class="blogList-container">
    <!-- 渲染数据的表格 -->
    <div class="blogList">
      <el-table :data="datas.rows" style="width: 100%" border>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.$index + (currentPage - 1) * pageSize + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章名" align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="200" trigger="hover">
              <div class="demo-image">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.thumb"
                    :fit="'cover'"
                  ></el-image>
                </div>
              </div>
              <a
                style="margin-left: 10px"
                @click="handleLink(scope.row)"
                slot="reference"
                >{{ scope.row.title }}</a
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="文章描述" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论量" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.category === null ? "未分类" : scope.row.category.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布/修改日期" width="180" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <div class="pager-container">
      <div class="pager">
        <el-pagination
          background
          layout="prev, pager, next,total,->,jumper,sizes"
          :total="total"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :current-page="currentPage"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlog, deleteBlog } from "@/api/blog";
import { dateComputed } from "@/utils/tools.js";
// 用于跳转页面的 前台页面地址
import { frontEndUrl } from "@/frontEndUrl.js";
//用于拼接图片路径的服务器地址
import { severUrl } from "@/severUrl.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      datas: [], // 用来储存页面渲染用的数据
      pageCount: 1, //总页数
      currentPage: 1, //当前页数
      total: 0, //总数据量
      pageSizes: [10, 15, 20], //每页显示个数选择器的选项设置
      pageSize: 10, //每页显示条目个数
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 依旧是老套路,在页面创建的时候触发定义的fetchData函数,从服务器获取到数据,然后用于渲染
    // 这里唯一不同的地方，直接调用data里的数据发送请求，每次再调用fetchData函数的时候，会传入当前this.data里的数据，达到及时更新的效果。
    fetchData() {
      getBlog(this.currentPage, this.pageSize).then(({ data }) => {
        console.log(data);
        this.datas = data;
        this.total = this.datas.total;
        for (var i of this.datas.rows) {
          console.log(i.id);
        }
        this.pageCount = Math.ceil(this.total / this.pageSize);
        // 获取到数据后，直接计算对应的属性。
        if (this.currentPage > this.pageCount) {
          this.currentPage = this.pageCount;
          this.fetchData();
        }
        // 通过for of 循环，循环数组里的每个对象，然后改变他们的属性，给图片拼接服务器的地址。 判断是否存在地址，不存在就用临时替代的图片。
        for (var item of this.datas.rows) {
          item.createDate = dateComputed(item.createDate);
          item.thumb = item.thumb
            ? severUrl + item.thumb
            : severUrl + "/static/upload/2022-1-22-19-5-8-540-98c72.png";
        }
      });
    },
    // 编辑，还没做
    handleEdit(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },

    // 删除函数，在删除之前做一层判断，如果点击确定用then 来处理下一步，因为返回的是一个promise，成功为resolve。 如果取消，判定为reject，用catch 继续下一步。
    handleDelete(row) {
      this.$confirm("删除文章后会删除该文章内所有的评论内容", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteBlog(row.id).then((res) => {
            // 踩雷*** 在promise操作后如果想执行下一步，一定要用then。 否则会执行多个异步任务，而费顺序执行。
            // 本来没有写在then 里， 执行顺序应该是开启多个 异步，同时执行。所以页面没有重新渲染
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
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
    // 这个事件即使未设置形参，也会把 页面上 渲染几条数据的 信息返回， 比如 [5,10,20 ] 对应 渲染5条，10 条，20条数据 ,然后返回到第一页
    handleSizeChange(page) {
      this.pageSize = page;
      this.currentPage = 1;
      this.fetchData();
    },

    // 点击上一页按钮的时候传回来一个 页码数
    handlePrevClick(currentPage) {
      this.currentPage = currentPage;
    },

    // 点击下一页的时候传回一个  也码数
    handleNextClick(currentPage) {
      this.currentPage = currentPage;
    },

    // 直接点击也码数的时候,传回来一个页码数,做完数据处理后重新处理页面渲染.
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
    },

    // 超链接，跳转到文章页面。
    handleLink(row) {
      window.open(`${frontEndUrl}/article/${row.id}`);
      // window.open(frontEndUrl + '/article/' + row.id )
    },
  },

  watch: {},
};
</script>
<style  scoped>
.blogList-container {
  width: 80vw;
  margin: 20px;
}
.pager-container {
  margin: 40px auto;
}
</style>