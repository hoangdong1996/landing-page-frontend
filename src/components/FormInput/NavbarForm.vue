<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Navbar</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Brand Icon">
          <el-upload
            accept="image/*"
            name="files"
            ref="upload"
            class="upload-demo upload"
            action="http://192.168.1.122:8081/api/image/uploadFile"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
            :multiple="false"
            :limit="1"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" @click="onSubmit">Save</el-button>
          <el-button @click.prevent="onPreview" :disabled="dis">Preview</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <Navbar :navbar="preview" style="position: relative;" />
    </el-card>
  </div>
</template>

<script>
import { createNavbar } from "@/api/navbar";
import { mapGetters } from "vuex";
import { successNotify, errorNotify } from "@/function/notify";
import Navbar from "@/components/Navbar";
import { uploadFile } from "@/api/upload";
import { getBase64 } from "@/function/data";
export default {
  name: "navbar-form",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {},
      fileList: [],
      response: null,
      image: null,
      imageRes: null,
      dis: false
    };
  },
  computed: {
    ...mapGetters(["navbar"]),
    preview() {
      return { ...this.navbar };
    },
  },
  async mounted() {
    await this.$store.dispatch("navbar/getLogoNavbar");
    this.navbar.id = null;
  },
  methods: {
    async onSubmit() {
      this.dis = true
      await this.upload();
      this.submitForm();
    },
    async submitForm() {
      if (this.imageRes === null || this.imageRes === undefined) {
        return;
      }
      this.navbar.logo_src = this.imageRes;
      await createNavbar(this.navbar)
        .then(() => {
          successNotify(this);
        })
        .catch(() => {
          this.resetAll();
          errorNotify(this);
        });
      this.$store.dispatch("navbar/getLogoNavbar");
      this.dis = false
    },
    resetAll() {
      this.image = null;
      this.imageRes = null;
    },
    handleChange(file) {
      this.image = file.raw;
    },
    async upload() {
      await uploadFile(this.image).then((response) => {
        this.imageRes = response.data.data;
      });
    },
    async onPreview() {
      if (this.image != null) {
        await getBase64(this.image).then((data) => {
          this.preview.logo_src.data = data;
        });
      }
    },
  },
};
</script>

<style scoped>
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

.preview {
  position: relative;
}
</style>
