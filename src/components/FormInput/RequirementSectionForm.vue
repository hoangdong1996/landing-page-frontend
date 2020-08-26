<template>
  <div v-if="requirementSection">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Requirement Section</span>
        <el-checkbox v-model="requirementSection.showSection" style="margin-left: 20px" label="Show"
                     border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
      </div>
      <el-form label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="requirementSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="requirementSection.description"></el-input>
        </el-form-item>
        <el-form-item label="Button Title">
          <el-input class="input-label" v-model="requirementSection.button_title"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label" v-model="requirementSection.button_href"></el-input>
        </el-form-item>
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
          </el-upload>
        </el-form-item>

        <el-form-item label="List text">
          <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
            <el-form label-width="120px" class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(requirement, index) in requirementSection.requirementList"
                            :label="'Text '+(index + 1)"
                            :key="index"
                            :rules="{ message: 'domain can not be null', trigger: 'blur'}">
                <el-row>
                  <el-col :span="12">
                    <el-input v-model="requirementSection.requirementList[index]"></el-input>
                  </el-col>
                  <el-col :span="12 ">
                    <el-button @click.prevent="removeRequirement(index)">Delete</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button
                    :disabled="requirementSection.requirementList[requirementSection.requirementList.length - 1] === ''"
                    @click="addRequirement()">New text
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="Change style" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="Change title css" :label-width="formLabelWidth">
            <el-input v-model="requirementSection.title_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change description css" :label-width="formLabelWidth">
            <el-input v-model="requirementSection.description_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change image css" :label-width="formLabelWidth">
            <el-input v-model="requirementSection.image_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change button css" :label-width="formLabelWidth">
            <el-input v-model="requirementSection.button_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change text css" :label-width="formLabelWidth">
            <el-input v-model="requirementSection.text_style" type="textarea" :rows="2" autocomplete="off"></el-input>
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
        <span>Requirement Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <RequirementSectionPreview :requirementSection="requirementSection"/>
    </el-card>
  </div>
</template>

<script>
import {createRequirementSection, getRequirementSection} from "@/api/requirementSection";
import {errorNotify, successNotify} from '@/function/notify'
import {uploadFile} from "@/api/upload";
import {getBase64, getImageUrl} from "@/function/data";
import RequirementSectionPreview from "../previews/RequirementSectionPreview";
import {addStyleInClass, getStyleById} from "@/function/style";

const defaultRequirementSection = {
  title: '',
  description: '',
  image: {},
  button_href: '',
  button_title: '',
  requirementList: []
}

export default {
  components: {
    RequirementSectionPreview
  },
  data() {
    return {
      requirementSection: null,
      fileList: [],
      imageSection: null,
      resImageSection: null,
      loading: true,
      disable: false,
      dialogFormVisible: false,
      formLabelWidth: '200px',
    };
  },
  methods: {
    handleChange(file) {
      this.imageSection = file.raw
      this.onPreview()
    },
    async onPreview() {
      if (this.imageSection !== null) {
        await getBase64(this.imageSection).then((data) => {
          this.$set(this.requirementSection.image, 'data', data)
        })
      }
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest()
      this.loading = false
    },
    async uploadFile() {
      if (this.imageSection !== null) {
        await uploadFile(this.imageSection).then(res => {
          this.resImageSection = res.data.data
        }).catch(() => this.onReset()
        )
      }
    },
    async submitFormRequest() {
      if (this.resImageSection !== null) {
        this.requirementSection.image = this.resImageSection
      }
      await createRequirementSection(this.requirementSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
      await this.getRequirementSection()
      this.loading = false
    },
    getRequirementSection() {
      return getRequirementSection().then(response => {
        if (response.data.data !== null) {
          this.requirementSection = response.data.data
          console.log('davcvdsfsfdsf', this.requirementSection)
        } else {
          this.requirementSection = defaultRequirementSection
        }
      })
    },
    async resetDispatch() {
      await this.getRequirementSection()
      delete this.requirementSection.id
      this.fileList.push({
        name: this.requirementSection.image.name,
        url: getImageUrl(this.requirementSection.image)
      })
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.requirementSection = null
      this.fileList = []
      this.imageSection = null
      this.resImageSection = null
    },
    removeRequirement(index) {
      if (index !== -1) {
        this.requirementSection.requirementList.splice(index, 1);
      }
    },
    addRequirement() {
      this.requirementSection.requirementList.push('')
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleRequirementSection()
    },
    getStyleRequirementSection() {
      getStyleById('styleRequirementSection').innerHTML = (addStyleInClass('style-requirement-title', this.requirementSection.title_style) +
          addStyleInClass('style-requirement-description', this.requirementSection.description_style) +
          addStyleInClass('style-requirement-button', this.requirementSection.button_style) +
          addStyleInClass('style-requirement-text', this.requirementSection.text_style) +
          addStyleInClass('style-requirement-image', this.requirementSection.image_style))
    }
  },
  watch: {
    requirementSection() {
      this.getStyleRequirementSection()
    }
  },
  mounted() {
    this.resetDispatch()
    this.loading = false
  }
}

</script>

<style lang="scss" scoped>
.list-require {
  border: gainsboro 1px solid;
}

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
