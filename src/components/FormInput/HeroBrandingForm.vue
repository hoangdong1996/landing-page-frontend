<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span>Hero Branding</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="Button title">
          <el-input class="input-label"  v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label"  v-model="form.desc"></el-input>
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
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a size less than 500kb</div>
          </el-upload>
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
      form: {
        name: '',
        desc: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.upload{
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
