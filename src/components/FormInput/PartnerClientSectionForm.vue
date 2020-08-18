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
        <el-form-item label="List Logo">
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
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a
              size
              less than 500kb
            </div>
          </el-upload>
        </el-form-item>

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

export default {
  computed: {
    ...mapGetters(['partnerClientSection'])
  },
  data() {
    return {
      fileList: [],
      imageList: [],
      resImageList: []
    }
  },
  methods: {
    handleChange(file) {
      this.imageList = file.raw
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest()
    },
    async uploadFile() {
      if (this.imageList !== undefined) {
        await uploadFile(this.imageList).then(res => {
          this.resImageList = res.data.data
        }).catch(() => this.resetAll())
      }
    },
    resetAll() {
      this.imageList = null
      this.resImageList = null
    },
    submitFormRequest() {
      for (let i = 0; i < this.imageList.length; i++) {
        this.partnerClientSection.brandLogoList[i] = this.imageList[i]
      }
      createPartnerClientSection(this.partnerClientSection).then(() => {
        console.log('done')
      }).catch(erorr => {
        console.log(erorr)
      })
    }
  },
  async mounted() {
    await this.$store.dispatch('getPartnerClientSection')
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
