<template>
  <div>
    <el-card class="box-card ">
      <div slot="header" class="clearfix form-navbar">
        <span>Navbar Form</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-form label-width="120px">
        <el-form-item label="Brand Icon">
          <el-upload
              accept="image/*"
              class="upload-demo upload"
              action
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture"
              :limit="1"
              :on-change="handleChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button
              type="primary"
              @click.prevent="onSubmit"
              v-loading.fullscreen.lock="loading"
          >Save
          </el-button>
          <el-button @click.prevent="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Navbar Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div class="preview">
        <b-navbar
            v-b-scrollspy:nav-scroller
            type="light"
            toggleable="xl"
            fixed="top"
            class="header-area"
            style="position: relative"
        >
          <div class="container-fluid container-fluid--cp-150">
            <b-navbar-toggle target="nav_collapse"/>
            <b-navbar-brand class="navbar-brand" to="/">
              <img v-if="navbar.image" :src="navbar.image.data | pngSrc" alt="logo"/>
            </b-navbar-brand>
            <b-btn-group class="header-config-wrapper">
              <b-btn class="header-config">
                <i class="far fa-search"/>
              </b-btn>
              <b-link class="ht-btn ht-btn--outline hire-btn d-none d-xl-block">Hire Us Now</b-link>
            </b-btn-group>
            <b-collapse id="nav_collapse" class="default-nav justify-content-center" is-nav>
              <b-navbar-nav class="navbar-nav main-menu">
                <b-nav-item>
                  <span>LANDING</span>
                </b-nav-item>
                <b-nav-item class="scroll">
                  <span>HOME</span>
                </b-nav-item>
                <b-nav-item class="scroll">
                  <span>ABOUT</span>
                </b-nav-item>
                <b-nav-item class="scroll">
                  <span>REQUIREMENTS</span>
                </b-nav-item>
                <b-nav-item class="scroll">
                  <span>PRICING</span>
                </b-nav-item>
                <b-nav-item class="scroll">
                  <span>PARTNERS</span>
                </b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </div>
        </b-navbar>
      </div>

    </el-card>
  </div>
</template>

<script>
import {createNavbar, getNavbar} from "@/api/navbar";
import {successNotify, errorNotify} from "@/function/notify";
import {uploadFile} from "@/api/upload";
import {getBase64, getImageUrl} from "@/function/data";
const defaultNavbar = {
  image: {}
}
export default {
  name: "navbar-form",
  data() {
    return {
      navbar: null,
      fileList: [],
      response: null,
      image: null,
      imageRes: null,
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      await this.upload();
      await this.submitForm();
      this.loading = false;
    },
    async submitForm() {
      if (this.imageRes === null || this.imageRes === undefined) {
        return;
      }
      this.$set(this.navbar, 'image', this.imageRes);
      await createNavbar(this.navbar)
          .then(() => {
            successNotify(this);
          })
          .catch(() => {
            this.onReset();
            errorNotify(this);
          });
      await this.getNavbarData()
    },
    handleChange(file) {
      this.image = file.raw;
      this.onPreview()
    },
    async upload() {
      await uploadFile(this.image).then((response) => {
        this.imageRes = response.data.data;
      });
    },
    async onPreview() {
      if (this.image !== null) {
        await getBase64(this.image).then((data) => {
          this.navbar.image.data = data;
          this.$set(this.navbar.image, 'data', data)
        });
      }
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.fileList = []
      this.response = null
      this.image = null
      this.imageRes = null
    },
    async resetDispatch() {
      await this.getNavbarData()
      this.fileList.push({
        name: this.navbar.image.name,
        url: getImageUrl(this.navbar.image)
      })
    },
    getNavbarData() {
      return getNavbar().then(res => {
        if(res.data.data !== null){
          this.navbar = res.data.data
        } else {
          this.navbar = defaultNavbar
        }
      })
    }

  },
  async mounted() {
    await this.resetDispatch()
  }
};
</script>

<style lang="scss" scoped>
.upload {
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
