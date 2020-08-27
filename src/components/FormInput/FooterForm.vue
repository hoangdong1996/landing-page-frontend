<template>
  <div v-if="footer">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Footer</span>
        <el-checkbox v-model="footer.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
      </div>
      <el-form ref="form" :model="footer" label-width="120px">
        <el-form-item label="Image">
          <el-upload
              accept="image/*"
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
            <el-form label-width="120px"
                     class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(footerLink, index) in footer.footerLinkList"
                            :label="'Text'"
                            :key="index"
                            :rules="{required: true, trigger: 'blur'}">
                <el-row>
                  <el-col :span="8">
                    <el-input v-model="footerLink.title" placeholder="Text  "></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="footerLink.href" placeholder="Href"></el-input>
                  </el-col>
                  <el-col :span="8 ">
                    <el-button @click.prevent="removeFooterLink(index)">Delete</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button
                    :disabled="footer.footerLinkList[footer.footerLinkList.length-1].title ===''"
                    @click="addFooterLink">New text
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="Change style" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="Change title css" :label-width="formLabelWidth">
            <el-input v-model="footer.title_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change image css" :label-width="formLabelWidth">
            <el-input v-model="footer.image_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change link text css" :label-width="formLabelWidth">
            <el-input v-model="footer.footer_link_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
      </el-dialog>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix form-navbar">
        <span>Footer Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <FooterSectionPreview :footer="footer"/>
    </el-card>
  </div>
</template>

<script>
import {createFooter, getFooter} from "@/api/footer";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import {getBase64, getImageUrl} from "@/function/data";
import FooterSectionPreview from "@/components/previews/FooterSectionPreview";
import {addStyleInClass, getStyleById} from "@/function/style";

const footerDefault = {
  image: {},
  title: '',
  footerLinkList: [{title: '', href: ''}]
}

export default {
  components: {
    FooterSectionPreview
  },
  data() {
    return {
      footer: null,
      imageFooter: null,
      fileList: [],
      imageSection: null,
      resImageSection: null,
      loading: true,
      disable: false,
      formLabelWidth: '200px',
      dialogFormVisible: false,
    }
  },
  methods: {
    handleChange(file) {
      this.imageSection = file.raw
      this.onPreview()
    },
    async onPreview() {
      if (this.imageSection !== null) {
        await getBase64(this.imageSection).then((data) => {
          this.$set(this.footer.image, 'data', data)
        })
      }
    },
    async onSubmit() {
      this.loading = true
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
    resetAll() {
      this.imageSection = null
      this.resImageSection = null
    },
    async submitFormRequest() {
      if (this.resImageSection !== null) {
        this.footer.image = this.resImageSection
      }
      await createFooter(this.footer)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
      this.onReset()
      this.loading = false
    },
    onReset() {
      this.resetData()
      this.resetDispatch()
    },
    resetData() {
      this.footer = null
      this.imageFooter = null
      this.fileList = []
      this.imageSection = null
      this.resImageSection = null
    },
    async resetDispatch() {
      await this.getFooter()
      delete this.footer.id
      this.fileList.push({
        name: this.footer.image.name,
        url: getImageUrl(this.footer.image)
      })
      this.loading = false
    },
    async getFooter() {
      await getFooter().then(response => {
        if (response.data.data === null) {
          this.footer = footerDefault
        } else {
          this.footer = response.data.data
        }
      })
    },
    removeFooterLink(index) {
      if (index !== -1) {
        this.footer.footerLinkList.splice(index, 1);
      }
    },
    addFooterLink() {
      this.footer.footerLinkList.push({
        title: '',
        href: ''
      })
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleFooter()
    },
    getStyleFooter() {
      getStyleById('styleFooter').innerHTML = (addStyleInClass('style-footer-title', this.footer.title_style) +
          addStyleInClass('style-footer-image', this.footer.image_style) +
          addStyleInClass('style-footer-link-text', this.footer.footer_link_style))
    }
  },
  async mounted() {
    await this.resetDispatch()
    this.getStyleFooter()
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
