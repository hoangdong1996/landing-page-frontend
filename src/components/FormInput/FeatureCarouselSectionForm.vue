<template>
  <div v-loading="loading" v-if="featureCarouselSection">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Feature Carousel Section</span>
      </div>
      <el-row style="">
        <el-button @click.prevent="featureCarouselSectionIndex = 0">Carousel 1</el-button>
        <el-button @click.prevent="featureCarouselSectionIndex = 1">Carousel 2</el-button>
        <el-button @click.prevent="featureCarouselSectionIndex = 2">Carousel 3</el-button>
      </el-row>
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col v-for="(feature, index) in featureCarouselSection.featureCarouselList" :key="index"
                  style="padding-right: 10px"
                  v-show="featureCarouselSectionIndex === index">
            <div>
              <el-card>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="feature.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" v-model="feature.description" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Image">
                  <el-upload
                      accept="image/*"
                      name="files"
                      ref="upload"
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
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix form-navbar">
        <span>Feature Carousel Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <FeatureCarouselSectionPreview :featureCarouselSection="featureCarouselSection" />

    </el-card>
  </div>
</template>

<script>
import {createFeatureCarouselSection, getFeatureCarouselSection} from "@/api/featureCarouselSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import FeatureCarouselSectionPreview from "@/components/previews/FeatureCarouselSectionPreview";
import {getBase64, getImageUrl} from "@/function/data";

const featureCarouselDefault = {
  featureCarouselList: [
    {
      image: {},
      title: '',
      description: ''
    }, {
      image: {},
      title: '',
      description: ''
    }, {
      image: {},
      title: '',
      description: ''
    }]
}
export default {
  components: {
    FeatureCarouselSectionPreview
  },
  data() {
    return {
      loading: true,
      fileList: [],
      imageList: new Array(3),
      resImageList: new Array(3),
      featureCarouselSectionIndex: 0,
      featureCarouselSection: null
    }
  },
  methods: {
    handleChange(file) {
      this.imageList[this.featureCarouselSectionIndex] = file.raw
      this.onPreview()
    },
    async onPreview() {
      for (let i = 0; i < this.featureCarouselSection.featureCarouselList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            this.$set(this.featureCarouselSection.featureCarouselList[i].image, 'data', data)
          })
        }
      }
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest()
      this.loading = false
    },
    async uploadFile() {
      for (let i = 0; i < this.featureCarouselSection.featureCarouselList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => {
            this.onReset()
          })
        }
      }
    },
    async submitFormRequest() {
      for (let i = 0; i < this.featureCarouselSection.featureCarouselList.length; i++) {
        if (this.resImageList[i] !== undefined) {
          this.featureCarouselSection.featureCarouselList[i].image = this.resImageList[i]
        }
      }
      await createFeatureCarouselSection(this.featureCarouselSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))

      this.onReset()
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.fileList = []
      this.imageList = new Array(3)
      this.resImageList = new Array(3)
      this.featureCarouselSectionIndex = 0
      this.featureCarouselSection = null
    },
    async resetDispatch() {
      await this.getFeatureCarouselSectionForm()
      this.featureCarouselSection.featureCarouselList.forEach(feature => {
        let obj = {
          name: feature.image.name,
          url: getImageUrl(feature.image)
        }
        this.fileList.push([obj])
      })
    },
    getFeatureCarouselSectionForm() {
      return getFeatureCarouselSection().then(response => {
        if (response.data.data === null) {
          this.featureCarouselSection = featureCarouselDefault
        } else {
          this.featureCarouselSection = response.data.data
        }
      })
    }
  },
  created() {
    this.resetDispatch()
    this.loading = false
  }
}

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
