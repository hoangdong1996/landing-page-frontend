<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Hero Branding</span>
      </div>
      <el-form ref="form" :model="heroBranding" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="heroBranding.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="heroBranding.description"></el-input>
        </el-form-item>
        <el-form-item label="Button title">
          <el-input class="input-label" v-model="heroBranding.button_title"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label" v-model="heroBranding.button_href"></el-input>
        </el-form-item>
        <el-form-item label="Background">
          <el-upload
              accept="image/*"
              name="files"
              ref="upload"
              class="upload-demo upload"
              action="http://192.168.1.122:8081/api/image/uploadMultiFile"
              :file-list="fileList "
              :auto-upload="false"
              list-type="picture"
              :limit="1"
              :on-change="handleChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {createHeroBranding} from "@/api/heroBranding";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";

export default {
  computed: {
    ...mapGetters(["heroBranding"]),
  },
  data() {
    return {
      fileList: [],
      imageSection: null,
      resImageSection: null
    };
  },
  methods: {
    handleChange(file) {
      this.imageSection = file.raw
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest()
    },
    async uploadFile() {
      if (this.imageSection !== null) {
        await uploadFile(this.imageSection).then(res => {
          this.resImageSection = res.data.data
        }).catch(() => this.resetAll())
      }
    },
    resetAll() {
      this.imageSection = null
      this.resImageSection = null
    },
    submitFormRequest() {
      if (this.resImageSection !== null) {
        this.heroBranding.background_img = this.resImageSection
      }
      createHeroBranding(this.heroBranding)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
    },
  },
  async mounted() {
    await this.$store.dispatch("heroBranding/getHeroBranding");
  },
};
</script>

<style lang="scss" scoped>
.upload {
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding: 5px;
}

.el-row {
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
