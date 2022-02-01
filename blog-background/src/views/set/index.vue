<template>
  <div class="setting-container">
    <h2>网站信息</h2>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.siteTitle" disabled></el-input>
    </div>
    <h3 class="block2">邮箱</h3>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.mail" disabled></el-input>
    </div>
    <h3 class="block2">描述</h3>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.icp" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <h3>我的头像信息</h3>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.avatar"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <h3>网址图标信息</h3>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input
        v-model="form.favicon"
        placeholder="请输入图片地址"
        disabled
      ></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 50px; height: 50px"
        :src="form.favicon"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <h3>github 信息</h3>
    <div class="block2">github 名字</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.githubName" disabled></el-input>
    </div>
    <div class="block2">github 地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.github" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <h3>QQ 信息</h3>
    <div class="block2">QQ 号码</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.qq" disabled></el-input>
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.qqQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <h3>微信信息</h3>
    <div class="block2">微信号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.weixin" disabled></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.weixinQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>

    <!-- 弹出层 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      width="50%"
      top="5vh"
      fullscreen
      class="dia-form"
      :close-on-click-modal="false"
    >
      <div>
        <el-form :model="form">
          <el-form-item label="网站标题">
            <el-input v-model="form2.siteTitle"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form2.mail"></el-input>
          </el-form-item>
          <el-form-item label="网站描述">
            <el-input v-model="form2.icp"></el-input>
          </el-form-item>
          <el-form-item label="我的头像地址">
            <!-- <el-input v-model="form2.avatar"></el-input> -->
            <Upload v-model="form2.avatar" :url="form2.avatar" />
          </el-form-item>
          <el-form-item label="网站图标地址">
            <el-input v-model="form2.favicon"></el-input>
          </el-form-item>
          <el-form-item label="github 名字">
            <el-input v-model="form2.githubName"></el-input>
          </el-form-item>
          <el-form-item label="github 地址">
            <el-input v-model="form2.github"></el-input>
          </el-form-item>
          <el-form-item label="QQ 号码">
            <el-input v-model="form2.qq"></el-input>
          </el-form-item>
          <el-form-item label="QQ 二维码图片地址">
            <!-- <el-input v-model="form2.qqQrCode"></el-input> -->
            <Upload v-model="form2.qqQrCode" :url="form2.qqQrCode" />
          </el-form-item>
          <el-form-item label="微信号">
            <el-input v-model="form2.weixin"></el-input>
          </el-form-item>
          <el-form-item label="微信二维码图片地址">
            <!-- <el-input v-model="form2.weixinQrCode"></el-input> -->
            <Upload v-model="form2.weixinQrCode" :url="form2.weixinQrCode" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting.js";
import Upload from "@/components/Upload";
import { severUrl } from "@/severUrl.js";
import { getInfo } from "@/api/user";
export default {
  data() {
    return {
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      form2: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      dialogFormVisible: false,
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchData(); // 获取数据
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        this.form = res.data;
        // 处理图片的链接
        this.form2 = { ...this.form };
        this.form.avatar = severUrl + this.form.avatar;
        this.form.qqQrCode = severUrl + this.form.qqQrCode;
        this.form.weixinQrCode = severUrl + this.form.weixinQrCode;
      });
      getInfo().then((res) => {
        this.form.id = res.data.id;
      });
    },
    openEditPanel() {
      this.dialogFormVisible = true;
    },
    confirmEditSetting() {
      setSetting(this.form2).then((res) => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功！");
      });
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 100;
}
.setting-container {
  margin: 30px;
  width: 70vw;
}
.block2 {
  margin: 15px 0;
  font-size: 14px;
  font-weight: 100;
}
.dia-form {
  width: 40vw;
  margin: 50px;
  left: 30%;
}
</style>