<template>
  <div v-if="requirementSection" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Requirement Section</span>
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
          this.requirementSection.image.data = data
        })
      }
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest()
      this.loading = true
    },
    async uploadFile() {
      if (this.imageSection !== null) {
        await uploadFile(this.imageSection).then(res => {
          this.resImageSection = res.data.data
        }).catch(() => this.resetAll()
        )
      }
    },
    resetAll() {
      this.imageSection = null
      this.resImageSection = null
    },
    async submitFormRequest() {
      if (this.resImageSection !== null) {
        this.requirementSection.image = this.resImageSection
      }
      await createRequirementSection(this.requirementSection)
          .then(() => successNotify(this))
          .catch(() => errorNotify(this))
      this.getRequirementSection()
      this.loading = false
    },
    async getRequirementSection() {
      await getRequirementSection().then(response => {
        this.requirementSection = response.data.data
      })
    },
    async resetDispatch() {
      await this.getRequirementSection()
      delete this.requirementSection.id
      this.loading = false
      this.fileList.push({
        name: this.requirementSection.image.name,
        url: getImageUrl(this.requirementSection.image)
      })
    },
    onReset() {
      this.resetData()
      this.resetDispatch()
    },
    resetData() {
      this.requirementSection = null
      this.fileList = []
      this.imageSection = null
      this.resImageSection = null
      this.loading = true
      this.disable = false
    },
    removeRequirement(index) {
      if (index !== -1) {
        this.requirementSection.requirementList.splice(index, 1);
      }
    },
    addRequirement() {
      this.requirementSection.requirementList.push('')
    }
  },
  created() {
    this.resetDispatch()
  }
  ,
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
