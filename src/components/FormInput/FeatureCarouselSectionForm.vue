<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span>Feature Carousel Section</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8" v-for="(card, index) in 3" :key="index" style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Image">
                  <el-upload
                      class="upload-demo upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      list-type="picture">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="form.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" v-model="form.name" size="small"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

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