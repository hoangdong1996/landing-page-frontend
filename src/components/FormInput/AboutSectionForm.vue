<template>
  <div>
    <el-card class="box-card" v-loading.fullscreen.lock="loading">
      <div slot="header" class="clearfix">
        <span>About Section</span>
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
          <el-button @click.prevent="onPreview">Preview</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div>
        <div id="about" class="box-image-area section-space--ptb_120">
          <div class="container">
            <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
              <h2 class="section-title mb-15">{{ preview.title }}</h2>
              <span class="section-text">{{ preview.text }}</span>
            </div>
            <!-- about component -->
            <div class="row box-image-wrapper">
              <div
                v-for="(about, index) in preview.aboutExpandList"
                :key="index"
                class="col-md-4 box-image position-relative text-center wow move-up"
              >
                <div class="box-image__media">
                  <img :src="about.image.data | pngSrc" class="img-fluid" alt="about icon" />
                </div>
                <div class="box-image__content">
                  <h6 class="box-image__title">
                    <a class="stretched-link">{{ about.title }}</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createAboutSection } from "@/api/aboutSection";
import { uploadFile } from "@/api/upload";
import {getBase64, getImageUrl} from "@/function/data";
import { successNotify, errorNotify } from "@/function/notify";

export default {
  computed: {
    ...mapGetters(["aboutSection"]),
    preview() {
      return { ...this.aboutSection };
    },
  },
  data() {
    return {
      fileList:[],
      loading: false,
      aboutExpandIndex: 0,
      requestForm: null,
      imageList: new Array(3),
      resImageList: new Array(3),
    };
  },
  methods: {
    handleChange(file) {
      this.imageList[this.aboutExpandIndex] = file.raw;
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await uploadFile(this.imageList[i])
            .then((res) => {
              this.resImageList[i] = res.data.data;
            })
            .catch(() => {
              this.resetAll();
              return;
            });
        }
      }
    },
    async resetAll() {
      await this.$store.dispatch("aboutSection/aboutSection");
      this.resImageList = new Array(3);
      this.imageList = new Array(3);
    },
    async onSubmit() {
      this.loading = true;
      await this.uploadFile();
      this.submitFormRequest();
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
      this.resetAll();
      this.loading = false
    },
    async onPreview() {
      let list = this.aboutSection.aboutExpandList;
      for (let i = 0; i < list.length; i++) {
        if(this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            list[i].image.data = data
          })
        }
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("aboutSection/aboutSection");
    this.aboutSection.id = null;
    this.aboutSection.aboutExpandList.forEach((item) => {
      item.id = null;
    });
    this.aboutSection.aboutExpandList.forEach(e => {
      let obj ={
        name: e.image.name,
        url: getImageUrl(e.image)
      }
      this.fileList.push([obj])
    })
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
