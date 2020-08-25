<template>
  <div v-loading="loading">
    <el-card class="box-card" v-if="aboutSection" >
      <div slot="header" class="clearfix">
        <span>About Section</span>
        <el-checkbox  label="Option1" border></el-checkbox>
      </div>
      <el-form ref="form" :model="aboutSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="aboutSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" v-model="aboutSection.text"></el-input>
        </el-form-item>

        <el-row style="text-align: center">
          <el-col :span="24">
            <span>About Expand</span>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <el-button @click.prevent="aboutExpandIndex = 0">Expand 1</el-button>
          <el-button @click.prevent="aboutExpandIndex = 1">Expand 2</el-button>
          <el-button @click.prevent="aboutExpandIndex = 2">Expand 3</el-button>
        </el-row>
        <el-row>
          <el-col
              v-for="(about, index) in aboutSection.aboutExpandList"
              :key="index"
              style="padding-right: 10px"
              v-show="aboutExpandIndex === index"
          >
            <div>
              <el-card>
                <el-form-item label="Icon">
                  <el-upload
                      accept="image/*"
                      class="upload-demo upload"
                      action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                      :auto-upload="false"
                      :file-list="fileList[index]"
                      list-type="picture"
                      :limit="1"
                      :on-change="handleChange"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="about.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Href">
                  <el-input class="input-label" v-model="about.href" size="small"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click.prevent="onSubmit">Create</el-button>
          <el-button @click.prevent="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix form-navbar">
        <span>About Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <AboutSectionPreview :aboutSection="aboutSection"></AboutSectionPreview>
    </el-card>
  </div>
</template>

<script>
import {createAboutSection, getAboutSection} from "@/api/aboutSection";
import {uploadFile} from "@/api/upload";
import {getBase64, getImageUrl} from "@/function/data";
import {successNotify, errorNotify} from "@/function/notify";
import AboutSectionPreview from "@/components/previews/AboutSectionPreview";

const defaultAboutSection = {
  title: '',
  text: '',
  aboutExpandList: [
    {
      image: {},
      title: '',
      href: ''
    }, {
      image: {},
      title: '',
      href: ''
    }, {
      image: {},
      title: '',
      href: ''
    },
  ],
}
export default {
  components: {
    AboutSectionPreview
  },
  data() {
    return {
      aboutSection: null,
      fileList: [],
      loading: true,
      aboutExpandIndex: 0,
      imageList: new Array(3),
      resImageList: new Array(3),
    };
  },
  methods: {
    handleChange(file) {
      this.imageList[this.aboutExpandIndex] = file.raw;
      this.onPreview()
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await uploadFile(this.imageList[i])
              .then((res) => {
                this.resImageList[i] = res.data.data;
              })
              .catch(() => {
                this.onReset();
              });
        }
      }
    },
    async onSubmit() {
      this.loading = true;
      await this.uploadFile();
      await this.submitFormRequest();
      this.loading = false;
    },
    async submitFormRequest() {
      let list = this.aboutSection.aboutExpandList;
      for (let i = 0; i < list.length; i++) {
        if (this.resImageList[i] !== undefined) {
          list[i].image = this.resImageList[i];
        }
      }
      await createAboutSection(this.aboutSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this));
      this.onReset();
    },
    async onPreview() {
      let list = this.aboutSection.aboutExpandList;
      for (let i = 0; i < list.length; i++) {
        if (this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            this.$set(list[i].image, 'data', data)
          })
        }
      }
    },
    onReset() {
      this.loading = true;
      this.resetData()
      this.resetDispatch()
      this.loading = false;
    },
    resetData() {
      this.aboutSection = null
      this.fileList = []
      this.aboutExpandIndex = 0
      this.imageList = new Array(3)
      this.resImageList = new Array(3)
    },
    async resetDispatch() {
      await this.getFormData();
      this.aboutSection.id = null;
      this.aboutSection.aboutExpandList.forEach((item) => {
        item.id = null;
        let obj = {
          name: item.image.name,
          url: getImageUrl(item.image)
        }
        this.fileList.push([obj])
      });
    },
    getFormData() {
      return getAboutSection().then(res => {
        if (res.data.data !== null) {
          this.aboutSection = res.data.data;
        } else {
          this.aboutSection = defaultAboutSection;
        }
      })
    }
  },
  async mounted() {
    await this.resetDispatch()
    this.loading = false
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
