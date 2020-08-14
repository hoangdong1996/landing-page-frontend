<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Feature Carousel Section</span>
      </div>
      <el-form ref="form" :model="featureCarouselSection" label-width="120px">
        <el-row>
          <el-col :span="8" v-for="(feature, index) in featureCarouselSection" :key="index" style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Image">
                  <el-upload
                      class="upload-demo upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture"
                      v-model="feature.icon"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="feature.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" v-model="feature.description" size="small"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button type="primary" >Create</el-button>
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
      featureCarouselSection:[
        {
          icon: '',
          title: '',
          description: ''
        },
        {
          icon: '',
          title: '',
          description: ''
        },
        {
          icon: '',
          title: '',
          description: ''
        }
      ]
    }
  },
  methods: {}
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
