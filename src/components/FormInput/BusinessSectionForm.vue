<template>
  <div>
    <el-card class="box-card" v-loading="loading" v-if="businessSection">
      <div slot="header" class="clearfix">
        <span>Business Section</span>
        <el-checkbox v-model="businessSection.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
      </div>
      <el-form ref="form" :model="businessSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label " v-model="businessSection.section_title"></el-input>
        </el-form-item>
        <el-form-item label="Video url">
          <el-input class="input-label" v-model="businessSection.video_url"></el-input>
        </el-form-item>
        <el-form-item label="Video title">
          <el-input class="input-label " v-model="businessSection.video_title"></el-input>
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
        <el-row style="text-align: center">
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
          <el-button @click.prevent="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="Change style" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="Change section title css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.section_title_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change video title css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.video_title_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change image css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.image_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change feature title css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.feature_title_Style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change feature des css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.feature_description_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change feature image css" :label-width="formLabelWidth">
            <el-input v-model="businessSection.feature_image_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
      </el-dialog>
    </el-card>
    <el-card style="margin-top: 20px" v-if="businessSection">
      <div slot="header" class="clearfix form-navbar">
        <span>Business Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <BusinessSectionPreview :businessSection="businessSection"></BusinessSectionPreview>
    </el-card>
  </div>
</template>

<script>
import {createBusinessSection, getBusinessSection} from "@/api/businessSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import BusinessSectionPreview from "../previews/BusinessSectionPreview";
import {getBase64, getImageUrl} from "@/function/data";
import {addStyleInClass, getStyleById} from "@/function/style";

const defaultBusinessSection = {
  section_title: '',
  video_url: '',
  video_title: '',
  image: {},
  businessFeatureList: [
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
    },
  ]
}

export default {
  components: {
    BusinessSectionPreview
  },
  data() {
    return {
      businessSection: null,
      loading: true,
      sectionList: [],
      fileList: [],
      sectionImage: null,
      resSectionImage: null,
      imageList: new Array(3),
      resImageList: new Array(3),
      businessSectionIndex: 0,
      dialogFormVisible: false,
      formLabelWidth: '200px',
    };
  },
  methods: {
    handleSectionChange(file) {
      this.sectionImage = file.raw
      this.onPreview()
    },
    handleChange(file) {
      this.imageList[this.businessSectionIndex] = file.raw;
      this.onPreview()
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest();
      this.loading = false
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
            this.onReset()
          })
      }
    },
    async submitFormRequest() {
      if (this.resSectionImage !== null) {
        this.businessSection.image = this.resSectionImage;
      }
      for (let i = 0; i < this.businessSection.businessFeatureList.length; i++) {
        if (this.resImageList[i] !== undefined) {
          this.businessSection.businessFeatureList[i].image = this.resImageList[i];
        }
      }
      await createBusinessSection(this.businessSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this));
      this.onReset()
      this.loading = false
    },
    async onPreview() {
      if (this.sectionImage !== null) {
        await getBase64(this.sectionImage).then((data) => {
          this.$set(this.businessSection.image, 'data', data)
        })
      }
      const list = this.businessSection.businessFeatureList;
      for (let i = 0; i < list.length; i++) {
        if (this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            this.$set(list[i].image, 'data', data)
            list[i].image.data = data
          })
        }
      }
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.businessSection = null
      this.sectionList = []
      this.fileList = []
      this.sectionImage = null
      this.resSectionImage = null
      this.imageList = new Array(3)
      this.resImageList = new Array(3)
      this.businessSectionIndex = 0
    },
    async resetDispatch() {
      await this.getBusinessSectionForm()
      // get latest image for section
      this.sectionList.push({
        name: this.businessSection.image.name,
        url: getImageUrl(this.businessSection.image)
      })
      // get latest image for 3 feature
      const list = this.businessSection.businessFeatureList
      for (let i = 0; i < list.length; i++) {
        this.fileList.push([{
          name: list[i].image.name,
          url: getImageUrl(list[i].image)
        }])
      }
    },
    getBusinessSectionForm() {
      return getBusinessSection().then(res => {
        if (res.data.data !== null) {
          this.businessSection = res.data.data
        } else {
          this.businessSection = defaultBusinessSection
        }
      })
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleBusinessSection()
    },
    getStyleBusinessSection() {
      getStyleById('styleBusinessSection').innerHTML = (addStyleInClass('style-business-title', this.businessSection.section_title_style) +
          addStyleInClass('style-business-video-title', this.businessSection.video_title_style) +
          addStyleInClass('style-business-image', this.businessSection.image_style) +
          addStyleInClass('style-feature-image', this.businessSection.feature_image_style) +
          addStyleInClass('style-feature-title', this.businessSection.feature_title_Style) +
          addStyleInClass('style-feature-description', this.businessSection.feature_description_style)
      )
    }
  },
  async mounted() {
    await this.resetDispatch()
    this.getStyleBusinessSection()
    this.loading = false;
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
