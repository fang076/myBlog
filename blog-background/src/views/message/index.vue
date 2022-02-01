<template>
  <div class="message-container">
    <div class="commentList">
      <el-table :data="data" style="width: 100%" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.$index + 1 + (page - 1) * limit
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="100" align="center">
          <template slot-scope="scope">
            <div class="demo-image">
              <div class="block">
                <span class="demonstration"></span>
                <el-image
                  style="width: 30px; height: 30px"
                  :src="scope.row.avatar"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="180" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论时间" align="center" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center" width="120">
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
    </div>
    <div class="pager">
      <el-pagination
        background
        layout="prev, pager,next,total,->,jumper,sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :page-sizes="pageList"
        :page-size="limit"
        :total="total"
        :current-page="page"
      >
        <!--  handleSizeChange  调节一页显示多少数据时改变  ，返回 每页显示多少数据-->
        <!--  handleCurrentChange  页码发生改变时， 返回一个 当前页码 -->
        <!-- handlePrevClick   点击上一页的时候 ，返回一个当前页 -->
        <!--  handleNextClick   点击下一页的时候，返回一个当前页-->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { dateComputed } from "@/utils/tools";
import { getMessage, deleteMessage } from "@/api/message.js";
import { severUrl } from "@/severUrl.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      data: [],
      page: 1, //当前页码
      limit: 2, //一页显示的数据
      total: 0, //数据总量
      pageList: [2, 40, 50, 100],
      pages: 1, //总页数
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
      getMessage(this.page, this.limit).then(({ data }) => {
        this.total = data.total;
        this.pages = Math.ceil(this.total / this.limit);
        if (this.page > this.pages) {
          this.page = this.pages;
          this.fetchData();
        }
        this.data = data.rows;
        for (var item of this.data) {
          item.avatar = severUrl + item.avatar;
          item.createDate = dateComputed(item.createDate);
        }
      });
    },
    handleDelete(row) {
      deleteMessage(row.id).then((res) => {
        this.fetchData();
      });
    },
    // 调节一页显示多少数据时改变  ，返回 每页显示多少数据
    handleSizeChange(pageSizes) {
      this.limit = pageSizes;
      this.page = 1;
      this.fetchData();
    },
    //页码发生改变时， 返回一个 当前页码
    handleCurrentChange(page) {
      this.page = page;
      this.fetchData();
    },
    //点击上一页的时候 ，返回一个当前页
    handlePrevClick(page) {
      this.page = page;
      this.fetchData();
    },
    //点击下一页的时候，返回一个当前页
    handleNextClick(page) {
      this.page = page;
      this.fetchData();
    },
  },

  watch: {},
};
</script>
<style scoped>
.message-container {
  width: 70vw;
  margin: 30px;
}
.pager {
  margin-top: 30px;
}
</style>