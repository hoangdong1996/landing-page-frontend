<template>
  <div v-if="heroBranding">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Hero Branding</span>
        <el-checkbox v-model="heroBranding.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
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
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture"
              :limit="1"
              :on-change="handleChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click.prevent="onSubmit">Create</el-button>
          <el-button @click.prevent="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix form-navbar">
        <span>Hero Branding Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <section
          id="home"
          class="hero-branding bg-cover"
          style="position: relative"
          :style="{ 'background-image': 'url(data:image/png;base64,' + heroBranding.image.data +')' }"
      >
        <div class="container-fluid container-fluid--cp-150">
          <div class="hero-branding">
            <div class="hero-content">
              <h2 class="h1 hero-content-title style-hero-branding-title">{{ heroBranding.title }}</h2>
              <h6 class="hero-content-subtitle mt-20 style-hero-branding-des">{{ heroBranding.description }}</h6>
              <div class="slider-button mt-30">
                <a
                    class="ht-btn ht-btn-md style-hero-branding-button"
                >{{ heroBranding.button_title }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </el-card>

    <el-dialog title="Change style" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="Change title css" :label-width="formLabelWidth">
          <el-input v-model="heroBranding.title_style" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change description css" :label-width="formLabelWidth">
          <el-input v-model="heroBranding.description_style" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change button css" :label-width="formLabelWidth">
          <el-input v-model="heroBranding.button_title_style" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createHeroBranding, getHeroBranding} from "@/api/heroBranding";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import {getBase64, getImageUrl} from "@/function/data";
import {addStyleInClass, getStyleById} from "@/function/style";

const defaultHeroBranding = {
  title: '',
  description: '',
  button_title: '',
  button_href: '',
  image: {}
}
export default {
  data() {
    return {
      heroBranding: null,
      loading: false,
      fileList: [],
      imageSection: null,
      resImageSection: null,
      dialogFormVisible: false,
      formLabelWidth: '200px',
    };
  },
  methods: {
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleHeroBranding()
    },
    handleChange(file) {
      this.imageSection = file.raw
      this.onPreview()
    },
    async onPreview() {
      if (this.imageSection != null) {
        await getBase64(this.imageSection).then((data) => {
          this.$set(this.heroBranding.image, 'data', data)
        });
      }
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest()
    },
    async uploadFile() {
      if (this.imageSection !== null) {
        await uploadFile(this.imageSection).then(res => {
          this.resImageSection = res.data.data
        }).catch(() => this.onReset())
      }
    },
    async submitFormRequest() {
      if (this.resImageSection !== null) {
        this.heroBranding.image = this.resImageSection
      }
      await createHeroBranding(this.heroBranding)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
      this.onReset()
      this.loading = false
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.heroBranding = null
      this.fileList = []
      this.imageSection = null
      this.resImageSection = null
    },
    async resetDispatch() {
      await this.getHeroBrandingForm()
      this.fileList.push({
        name: this.heroBranding.image.name,
        url: getImageUrl(this.heroBranding.image)
      })
    },
    getHeroBrandingForm() {
      return getHeroBranding().then(res => {
        if (res.data.data !== null) {
          this.heroBranding = res.data.data
        } else {
          this.heroBranding = defaultHeroBranding
        }
      })
    },
    getStyleHeroBranding() {
      getStyleById('styleHeroBanding').innerHTML = (addStyleInClass('style-hero-branding-title', this.heroBranding.title_style)
          + addStyleInClass('style-hero-branding-des', this.heroBranding.description_style)
          + addStyleInClass('style-hero-branding-button', this.heroBranding.button_title_style))
    }
  },
  async mounted() {
    await this.resetDispatch()
    this.getStyleHeroBranding()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variabls.scss";
@import "@/assets/scss/elements/_hero-branding.scss";

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
