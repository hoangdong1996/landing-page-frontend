<template>
  <div v-if="partnerClientSection">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Partner Client Section</span>
        <el-checkbox v-model="partnerClientSection.showSection" style="margin-left: 20px" label="Show"
                     border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="partnerClientSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Text">
          <el-input class="input-label" type="textarea" v-model="partnerClientSection.text"></el-input>
        </el-form-item>

        <el-form label-width="120px" class="demo-dynamic">
          <el-form-item
              v-for="(brandLogo, index) in domains"
              :label="'Logo ' + (index + 1)"
              :key="index"
              :rules="{required: true, message: 'can not be null', trigger: 'blur'}">
            <el-upload
                accept="image/*"
                class="upload-demo upload"
                action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                :file-list="fileList[index]"
                :auto-upload="false"
                list-type="picture"
                :on-change="handleChange">
              <el-button size="small" type="primary"
                         @click="getIndex(index)">Click to upload
              </el-button>
              <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a
                size less than 500kb
              </div>
            </el-upload>
            <el-button @click.prevent="removeDomain(index)" v-if="index === domains.length-1">Delete</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain">New Logo</el-button>
          </el-form-item>
        </el-form>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="Change style" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="Change title css" :label-width="formLabelWidth">
            <el-input v-model="partnerClientSection.title_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change description css" :label-width="formLabelWidth">
            <el-input v-model="partnerClientSection.text_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change image css" :label-width="formLabelWidth">
            <el-input v-model="partnerClientSection.image_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
      </el-dialog>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Partner Client Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <PartnerClientSectionPreview :partnerClientSection="partnerClientSection" :render="key"/>
    </el-card>
  </div>
</template>

<script>
import {createPartnerClientSection, getPartnerClientSection} from "@/api/partnerClientSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import {getBase64, getImageUrl} from "@/function/data";
import PartnerClientSectionPreview from "../previews/PartnerClientSectionPreview";
import {addStyleInClass, getStyleById} from "@/function/style";

const partnerClientDefault = {
  title: '',
  text: '',
  brandLogoList: []
}
export default {
  components: {
    PartnerClientSectionPreview
  },
  data() {
    return {
      key: 0,
      partnerClientSection: null,
      fileList: [],
      imageList: [],
      resImageList: [],
      indexImage: -1,
      loading: true,
      domains: [],
      dialogFormVisible: false,
      formLabelWidth: '200px',
    }
  },
  methods: {
    getIndex(index) {
      this.indexImage = index
    },
    handleChange(file) {
      this.imageList[this.indexImage] = file.raw
      let index = this.indexImage
      this.onPreview(index, file)
    },
    async onPreview(index, file) {
      this.partnerClientSection.brandLogoList[index] = {image: {}}
      await getBase64(file.raw).then(data => {
        this.$set(this.partnerClientSection.brandLogoList[index].image, 'data', data)
        this.key = this.key + 1
      })
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest()
      this.onReset()
      this.loading = false
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined && this.imageList[i] !== null) {
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => this.onReset())
        }
      }
    },
    async submitFormRequest() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.resImageList[i] !== undefined && this.resImageList[i] !== null) {
          this.partnerClientSection.brandLogoList[i].image = this.resImageList[i]
        }
      }
      await createPartnerClientSection(this.partnerClientSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.partnerClientSection = null
      this.fileList = []
      this.imageList = []
      this.resImageList = []
      this.indexImage = -1
      this.domains = []
    },
    async resetDispatch() {
      await this.getPartnerClientSection()
      // delete this.partnerClientSection.id
      this.partnerClientSection.brandLogoList.forEach(e => {
        let objLogo = {
          name: e.image.name,
          url: getImageUrl(e.image)
        }
        this.fileList.push([objLogo])
        this.domains.push(null)
      })
    },
    async getPartnerClientSection() {
      await getPartnerClientSection().then(response => {
        if (response.data.data === null) {
          this.partnerClientSection = partnerClientDefault
        } else {
          this.partnerClientSection = response.data.data
        }
      })
    },
    removeDomain(index) {
      if (index !== -1) {
        this.domains.splice(index, 1);
        this.imageList.splice(index, 1)
        this.fileList.splice(index, 1)
        this.partnerClientSection.brandLogoList.splice(index, 1)
      }
    },
    addDomain() {
      let obj = null
      this.domains.push(obj)
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStylePartnerClientSection()
    },
    getStylePartnerClientSection() {
      getStyleById('stylePartnerClientSection').innerHTML = (addStyleInClass('style-partner-title', this.partnerClientSection.title_style) +
          addStyleInClass('style-partner-description', this.partnerClientSection.text_style) +
          addStyleInClass('style-partner-image', this.partnerClientSection.image_style))
    }
  },
  async created() {
    await this.resetDispatch()
    this.getStylePartnerClientSection()
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
