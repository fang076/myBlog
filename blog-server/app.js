const mongoose = require('mongoose');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
// monkey toJSON
const originToJSON = mongoose.Document.prototype.toJSON;
mongoose.Document.prototype.toJSON = function (...args) {
  const obj = originToJSON.call(this, ...args);
  if (obj._id) {
    obj.id = obj._id;
    delete obj._id;
  }
  return obj;
};

// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  // 初始化管理员
  async initAdmin() {
    const Admin = this.app.model.Admin;
    const count = await Admin.countDocuments();
    if (!count) {
      this.app.config.admin.loginPwd = md5(this.app.config.admin.loginPwd);
      await Admin.create(this.app.config.admin);
      console.log('管理员初始化成功');
    }
  }

  // 初始化全局设置
  async initSetting() {
    const Setting = this.app.model.Setting;
    const count = await Setting.countDocuments();
    if (!count) {
      await Setting.create({
        avatar: 'https://www.ign.com.cn/sm/t/ign_cn/review/d/dark-souls/dark-souls-remastered-for-switch-review_ch85.1280.jpg',
        siteTitle: 'KIGI-MP',
        github: 'https://github.com/fang076',
        qq: '366944138',
        qqQrCode:
          'https://i.postimg.cc/Z5Tm8bcq/qqqr.jpg',
        weixin: 'fangjian007',
        weixinQrCode:
          'https://i.postimg.cc/MpdStCPm/wxqr.jpg',
        mail: 'houken076@yahoo.co.jp',
        icp: 'KGCI-方健',
        githubName: 'houken076',
        favicon: 'https://www.ign.com.cn/sm/t/ign_cn/review/d/dark-souls/dark-souls-remastered-for-switch-review_ch85.1280.jpg',
      });
      console.log('全局设置初始化成功');
    }
  }

  // 初始化关于我信息
  async initAbout() {
    const About = this.app.model.About;
    const count = await About.countDocuments();
    if (!count) {
      await About.create({
        url: '',
      });
      console.log('关于我信息初始化成功');
    }
  }

  mkUpload() {
    const fs = require('fs');
    const path = require('path');
    try {
      fs.mkdirSync(path.resolve(__dirname, './app/public/upload'));
    } catch {
      // do nothing
    }
  }

  initAvatars() {
    const allows = ['.png', '.gif', '.jpg', '.png', '.webp', '.bmp', '.svg'];
    const files = fs
      .readdirSync(path.resolve(__dirname, './app/public/avatar'))
      .filter((name) => allows.includes(path.extname(name).toLowerCase()))
      .map((name) => `${this.app.config.static.prefix}avatar/${name}`);
    this.app.config.avatars = files;
  }

  willReady() {
    // 初始化管理员
    this.initAdmin();

    // 初始化全局设置
    this.initSetting();

    // 初始化上传目录
    this.mkUpload();

    // 初始化关于我信息
    this.initAbout();

    // 初始化头像数据
    this.initAvatars();
  }
}

module.exports = AppBootHook;
