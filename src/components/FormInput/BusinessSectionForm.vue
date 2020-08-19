<template>
  <div v-if="businessSection !== null" v-loading="loading">
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
              :file-list="sectionList"
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
                      class="upload-demo upload"
                      action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                      :file-list="fileList[index]"
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
          <el-button @click.prevent="onPreview">Preview</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <BusinessSectionPreview :businessSection="preview"></BusinessSectionPreview>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {createBusinessSection} from "@/api/businessSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import BusinessSectionPreview from "../previews/BusinessSectionPreview";
import { getBase64, getImageUrl } from "@/function/data";

export default {
  components: {
    BusinessSectionPreview
  },
  computed: {
    ...mapGetters(["businessSection"]),
    preview() {
      return {...this.businessSection};
    }
  },
  data() {
    return {
      loading: true,
      sectionList: [],
      fileList: [],
      sectionImage: null,
      resSectionImage: null,
      imageList: new Array(3),
      resImageList: new Array(3),
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
          })
      }
    },
    async resetAll() {
      this.resImageList = new Array(3)
      this.imageList = new Array(3)
      await this.$store.dispatch("businessSection/businessSection")
      delete this.businessSection.id
    },
    submitFormRequest() {
      if (this.resSectionImage !== null) {
        this.businessSection.image = this.resSectionImage;
      }
      for (let i = 0; i < this.businessSection.businessFeatureList.length; i++) {
        if (this.resImageList[i] !== undefined) {
          this.businessSection.businessFeatureList[i].image = this.resImageList[i];
        }
      }
      createBusinessSection(this.businessSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this));
    },
    async onPreview() {
      if(this.sectionImage !== null) {
        await getBase64(this.sectionImage).then((data) => {
          this.businessSection.image.data = data
        })
      }
      const list = this.businessSection.businessFeatureList;
      for(let i = 0; i < list.length; i++) {
        if(this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            list[i].image.data = data
          })
        }
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("businessSection/businessSection")
    delete this.businessSection.id
    const list = this.businessSection.businessFeatureList
    list.forEach(feature => {
      delete feature.id
    })
    this.loading = false;
    // get latest image for section
    this.sectionList.push({
      name: this.businessSection.image.name,
      url: getImageUrl(this.businessSection.image)
    })
    // get latest image for 3 feature
    for(let i = 0; i < list.length; i++) {
      this.fileList.push([{
        name: list[i].image.name,
        url: getImageUrl(list[i].image)
      }])
    }
    console.log(this.businessSection)

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
