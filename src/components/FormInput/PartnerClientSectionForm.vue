<template>
  <div>
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

        <el-form ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
          <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'Logo ' + (index + 1)"
              :key="domain.key"
              :rules="{required: true, message: 'can not be null', trigger: 'blur'}">
            <el-upload
                accept="image/*"
                name="files"
                ref="upload"
                class="upload-demo upload"
                action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                :file-list="fileList"
                :auto-upload="false"
                list-type="picture"
                :on-change="handleChange">
              <el-button size="small" type="primary"
                         @click="showIndex(index)">Click to upload
              </el-button>
              <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a
                size less than 500kb
              </div>
            </el-upload>
            <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain">New Logo</el-button>
          </el-form-item>
        </el-form>

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
import {createPartnerClientSection} from "@/api/partnerClientSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";

export default {
  computed: {
    ...mapGetters(['partnerClientSection'])
  },
  data() {
    return {
      fileList: [],
      imageList: new Array(12),
      resImageList: new Array(12),
      dynamicValidateForm: {
        domains: []
      },
      indexImage: -1
    }
  },
  methods: {
    showIndex(index) {
      this.indexImage = index
    },
    handleChange(file) {
      this.imageList[this.indexImage] = file.raw
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest()
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => this.resetAll())
        }
      }
    },
    resetAll() {
      this.imageList = new Array(12)
      this.resImageList = new Array(12)
    },
    submitFormRequest() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.resImageList[i] !== undefined )
        this.partnerClientSection.brandLogoList[i].image = this.resImageList[i]
      }
      createPartnerClientSection(this.partnerClientSection)
      .then(() => successNotify(this))
      .catch(() => errorNotify(this))
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ''
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('getPartnerClientSection')
    let index = 0;
    this.partnerClientSection.brandLogoList.forEach(e => {
      let obj = {
        key: index,
        logo: e.logo
      }
      this.dynamicValidateForm.domains.push(obj)
      index++
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
