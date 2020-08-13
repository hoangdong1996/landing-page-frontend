<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Requirement Section</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Button Title">
          <el-input class="input-label"></el-input>
        </el-form-item>
        <el-form-item label="Button url">
          <el-input class="input-label"></el-input>
        </el-form-item>
        <el-form-item label="Icon">
          <el-upload
              class="upload-demo upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a size
              less than 500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="List text">
          <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
              <el-form-item
                  label="Text"
                  :rules="[
                { required: true, message: 'Please input', trigger: 'blur' },
                 ]">
                <el-col :span="12">
                  <el-input v-model="dynamicValidateForm.email"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item style="padding-top: 5px"
                            v-for="(domain) in dynamicValidateForm.domains"
                            :label="'Text'"
                            :key="domain.key"
                            :rules="{
                required: true, message: 'domain can not be null', trigger: 'blur'
                }">
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
                <el-button @click="addDomain">New text</el-button>
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
export default {
  data() {
    return {
      requirementSection: {
        title: '',
        description: '',
        image:'',
        button_title:'',
        button_href:'',
        requirementList:[

        ]
      },
      form: {},
      dynamicValidateForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      }
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
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
