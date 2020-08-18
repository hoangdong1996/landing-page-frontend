<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Business Section</span>
      </div>
      <el-form ref="form" :model="businessSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="businessSection.section_title"></el-input>
        </el-form-item>
        <el-form-item label="Video url">
          <el-input class="input-label" v-model="businessSection.video_url"></el-input>
        </el-form-item>
        <el-form-item label="Video title">
          <el-input class="input-label" v-model="businessSection.video_title"></el-input>
        </el-form-item>
        <el-form-item label="Image ">
          <el-upload
              accept="image/*"
              name="files"
              ref="mainUpload"
              class="upload-demo upload"
              action="http://192.168.1.122:8081/api/image/uploadMultiFile"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture"
              :limit="1"
              :on-change="handleSectionChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: center">
          <el-col :span="24">
            <span>Feature List</span>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click.prevent="businessSectionIndex = 0">1</el-button>
          <el-button @click.prevent="businessSectionIndex = 1">2</el-button>
          <el-button @click.prevent="businessSectionIndex= 2">3</el-button>
        </el-row>
        <el-row>
          <el-col
              v-for="(feature, index) in businessSection.businessFeatureList"
              :key="index"
              style="padding-right: 10px"
              v-show="businessSectionIndex === index"
          >
            <div>
              <el-card>
                <el-form-item label="Icon">
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
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" size="small" v-model="feature.title"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" size="small" v-model="feature.description"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="reset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {createBusinessSection} from "@/api/businessSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";

export default {
  computed: {
    ...mapGetters(["businessSection"]),
  },
  data() {
    return {
      fileList: [],
      sectionImage: null,
      resSectionImage: null,
      imageList: new Array(3),
      resImageList: new Array(3),
      businessSectionForm: null,
      businessSectionIndex: 0
    };
  },
  methods: {
    handleSectionChange(file) {
      this.sectionImage = file.raw
    },
    handleChange(file) {
      this.imageList[this.businessSectionIndex] = file.raw;
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest();
    },
    async uploadFile() {
      if (this.sectionImage !== null) {
        await uploadFile(this.sectionImage).then(res => {
          this.resSectionImage = res.data.data
        })
      }
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined)
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => {
            this.resetAll()
            return
          })
      }
    },
    resetAll() {
      this.resImageList = new Array(3)
      this.imageList = new Array(3)
    },
    submitFormRequest() {
      if (this.resSectionImage !== null) {
        this.businessSection.image_url = this.resSectionImage;
      }
      for (let i = 0; i < this.businessSection.businessFeatureList.length; i++) {
        if (this.resImageList[i] !== undefined) {
          this.businessSection.businessFeatureList[i].icon = this.resImageList[i];
        }
      }
      createBusinessSection(this.businessSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this));
    },
    async reset() {
      await this.$store.dispatch("businessSection/businessSection");
      this.businessSection.id = null;
    },
  },
  async mounted() {
    await this.$store.dispatch("businessSection/businessSection");
    this.businessSection.id = null;
  }
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
