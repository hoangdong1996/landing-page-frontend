<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Footer</span>
      </div>
      <el-form ref="form" :model="footer" label-width="120px" v-if="footer != null">
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
              :on-change="handleChange"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a size
              less than 500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Title">
          <el-input class="input-label" v-model="footer.title"></el-input>
        </el-form-item>

        <el-form-item label="List text">
          <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"
                     class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(domain) in dynamicValidateForm.domain"
                            :label="'Text'"
                            :key="domain.key"
                            :rules="{required: true, trigger: 'blur'}">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="domain.text" placeholder="Text  "></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="domain.href" placeholder="Href"></el-input>
                  </el-col>
                  <el-col :span="8 ">
                    <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button @click="addDomain()">New text</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createFooter} from "@/api/footer";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";

export default {
  computed: {
    ...mapGetters(['footer'])

  },
  data() {
    return {
      fileList: [],
      imageSection: null,
      resImageSection: null,
      dynamicValidateForm:
          {
            domain: []
          }
    }
  },
  methods: {
    handleChange(file) {
      this.imageSection = file.raw
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest()
    },
    async uploadFile() {
        if (this.imageSection !== null) {
          await uploadFile(this.imageSection).then(res => {
            this.resImageSection = res.data.data
          }).catch(() => this.resetAll())
        }
    },
    resetAll(){
      this.imageSection = null
      this.resImageSection = null
    },
    pushListFooter() {
      let listFooter = [];
      this.dynamicValidateForm.domain.forEach(e => {
        let obj = {
          title: e.text,
          href: e.href
        }
        listFooter.push(obj)
      })
      this.footer.footerLinkList = listFooter
    },
    submitFormRequest() {
      if (this.resImageSection !== null) {
        this.footer.image = this.resImageSection
      }
      this.pushListFooter()
      createFooter(this.footer)
      .then(() => successNotify(this))
      .catch(() => errorNotify(this))
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domain.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domain.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domain.push({
        key: Date.now(),
        text: '',
        href: ''
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('footer/getFooter')
    let i = 1
    this.footer.footerLinkList.forEach(e => {
      let obj = {
        key: i,
        text: e.title,
        href: e.href
      }
      this.dynamicValidateForm.domain.push(obj)
      i = i + 1
    })
  },
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
