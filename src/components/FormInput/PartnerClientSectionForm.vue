<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Partner Client Section</span>
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
            <el-button @click.prevent="removeDomain(index)">Delete</el-button>
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
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Partner Client Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <PartnerClientSectionPreview :partnerClientSection="partnerClientSection"/>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createPartnerClientSection} from "@/api/partnerClientSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import {getImageUrl} from "@/function/data";
import PartnerClientSectionPreview from "../previews/PartnerClientSectionPreview";

export default {
  components: {
    PartnerClientSectionPreview
  },
  computed: {
    ...mapGetters(['partnerClientSection'])
  },
  data() {
    return {
      fileList: [],
      imageList: [],
      resImageList: [],
      indexImage: -1,
      loading: true,
      domains: []
    }
  },
  methods: {
    getIndex(index) {
      this.indexImage = index
    },
    handleChange(file) {
      this.imageList[this.indexImage] = file.raw
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      this.submitFormRequest()
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined && this.imageList[i] !== null) {
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => this.resetAll())
        }
      }
    },
    resetAll() {
      this.imageList = []
      this.resImageList = []
    },
    submitFormRequest() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.resImageList[i] !== undefined && this.resImageList[i] !== null) {
          this.partnerClientSection.brandLogoList.push({
            image: this.resImageList[i]
          })
        }
      }
      createPartnerClientSection(this.partnerClientSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
      this.loading = false
    },
    onReset() {
      this.resetData()
      this.resetDispatch()
    },
    resetData() {
      this.fileList = []
      this.imageList = []
      this.resImageList = []
      this.indexImage = -1
      this.domains = []
    },
    async resetDispatch(){
      await this.$store.dispatch('getPartnerClientSection')
      delete this.partnerClientSection.id
      this.partnerClientSection.brandLogoList.forEach(e => {
        delete e.id
        let objLogo = {
          name: e.image.name,
          url: getImageUrl(e.image)
        }
        this.fileList.push([objLogo])
        this.domains.push(null)
      })
      this.loading = false
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
  },
  async created() {
    await this.resetDispatch()
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
