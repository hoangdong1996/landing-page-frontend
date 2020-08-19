<template>
  <div v-if="requirementSection" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Requirement Section</span>
      </div>
      <el-form ref="form" label-width="120px" >
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
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(domain) in dynamicValidateForm.domains"
                            :label="'Text'"
                            :key="domain.key"
                            :rules="{ required: true, message: 'domain can not be null', trigger: 'blur'}">
                <el-row>
                  <el-col :span="12">
                    <el-input v-model="domain.value"></el-input>
                  </el-col>
                  <el-col :span="12 ">
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
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createRequirementSection} from "@/api/requirementSection";
import {successNotify, errorNotify} from '@/function/notify'
import {uploadFile} from "@/api/upload";

export default {
  computed: {
    ...mapGetters(['requirementSection'])
  },
  data() {
    return {
      fileList: [],
      imageSection: null,
      resImageSection: null,
      dynamicValidateForm: {
        domains: [],
      },
    };
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
        }).catch(() => this.resetAll()
        )
      }
    },
    resetAll() {
      this.imageSection = null
      this.resImageSection = null
    },
    pushListRequirement() {
      let listRequirement = [];
      this.dynamicValidateForm.domains.forEach(e => {
        listRequirement.push(e.value)
      })
      this.requirementSection.requirementList = listRequirement
    },
    submitFormRequest() {
      this.pushListRequirement()
      if (this.resImageSection !== null) {
        this.requirementSection.image = this.resImageSection
      }
      createRequirementSection(this.requirementSection)
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
    ,
  },
  async mounted() {
    await this.$store.dispatch('requirementSection/requirementSection')
    let index = 0
    this.requirementSection.requirementList.forEach(e => {
      let obj = {
        key: index,
        value: e
      }
      this.dynamicValidateForm.domains.push(obj)
      index++
    })
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
