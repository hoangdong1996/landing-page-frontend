<template>
  <div v-if="navbar">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix form-navbar">
        <span>Navbar Form</span>
        <el-checkbox v-model="navbar.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
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
        <el-form-item style="margin-top: 20px ; text-align: center ;margin-left:0px;">
          <el-button
              type="primary"
              @click.prevent="onSubmit"
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
      <div class="preview" :style="styleNavbar">
        <NavbarPreview :navbar="navbar"/>
      </div>
    </el-card>

    <el-dialog title="Change style" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="Change css navbar" :label-width="formLabelWidth">
          <el-input v-model="navbar.styleSection" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change css menu" :label-width="formLabelWidth">
          <el-input v-model="navbar.styleMenu" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changeStyle">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createNavbar, getNavbar} from "@/api/navbar";
import {successNotify, errorNotify} from "@/function/notify";
import {uploadFile} from "@/api/upload";
import {getBase64, getImageUrl} from "@/function/data";
import NavbarPreview from "@/components/previews/NavbarPreview";

const defaultNavbar = {
  image: {}
}
export default {
  name: "navbar-form",
  components: {
    NavbarPreview
  },
  computed: {},
  data() {
    return {
      navbar: null,
      fileList: [],
      response: null,
      image: null,
      imageRes: null,
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: '200px',
      styleNavbar: null
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
      if (this.imageRes !== null) {
        this.$set(this.navbar, 'image', this.imageRes);
      }
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
      if (this.image !== null) {
        await uploadFile(this.image).then((response) => {
          this.imageRes = response.data.data;
        });
      }
    },
    async onPreview() {
      if (this.image !== null) {
        await getBase64(this.image).then((data) => {
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
      this.navbar = null
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
        if (res.data.data !== null) {
          this.navbar = res.data.data
        } else {
          this.navbar = defaultNavbar
        }
      })
    },
    changeStyle() {
      this.dialogFormVisible = false
      if (this.navbar.styleSection.startsWith('{') && this.navbar.styleSection.endsWith('}')) {
        this.styleNavbar = JSON.parse(this.navbar.styleSection)
      } else {
        this.styleNavbar = {}
      }
      this.querySelectorMenu()
    },
    querySelectorMenu(){
      for (let i = 1; i <= 6; i++) {
        const elements = document.querySelector(".preview #nav_collapse > ul > li:nth-child(" + i + ") > a")
        elements.style = this.navbar.styleMenu
      }
    }
  },
  async mounted() {
    await this.resetDispatch()
    if (this.navbar.styleSection === '') {
      this.styleNavbar = null
    } else {
      this.styleNavbar = JSON.parse(this.navbar.styleSection)
    }
    this.querySelectorMenu()
  },
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
