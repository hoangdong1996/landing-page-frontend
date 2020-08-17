<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Feature Carousel Section</span>
      </div>
      <el-form ref="form" :model="featureCarouselSection" label-width="120px">
        <el-row>
          <el-col :span="8" v-for="(feature, index) in featureCarouselSection.featureCarouselList" :key="index"
                  style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Image">
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
                      :on-success="handleSuccess"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="feature.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" v-model="feature.description" size="small"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createFeatureCarouselSection} from "@/api/featureCarouselSection";

export default {
  computed: {
    ...mapGetters(['featureCarouselSection'])
  },
  data() {
    return {
      fileList: [],
      imageList: [],
      featureCarousel: null
    }
  },
  methods: {
    onSubmit() {
      this.$refs.upload.forEach(child => {
        child.submit()
      })
    },
    handleSuccess(response) {
      this.imageList.push({
        id: response.data[0].id
      })
      this.submitFormRequest()
    },
    submitFormRequest() {
      if (this.imageList.length < 3) {
        return
      }
      for (let i = 0; i < this.featureCarouselSection.featureCarouselList; i++) {
        this.featureCarouselSection.featureCarouselList[i].image_url = this.imageList[i]
      }
      createFeatureCarouselSection(this.featureCarouselSection).then(() => {
        console.log('done')
      }).catch(erorr => {
        console.log(erorr)
      })
    }
  },
  async mounted() {
    await this.$store.dispatch('featureCarouselSection/getFeatureCarouselSection')
    this.featureCarouselSection.id = null;
    this.featureCarouselSection.featureCarouselList.forEach(feature => {
      feature.id = null
    })
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
