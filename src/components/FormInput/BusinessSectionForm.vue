<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Business Section</span>
      </div>
      <el-form ref="form" :model="businessSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="businessSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Video url" >
          <el-input class="input-label" v-model="businessSection.videoUrl"></el-input>
        </el-form-item>
        <el-form-item label="Video title" >
          <el-input class="input-label" v-model="businessSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Image ">
          <el-input class="input-label" v-model="businessSection.image"></el-input>
        </el-form-item>
        <el-row style="text-align: center">
          <el-col :span="24"><span>Feature List</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" v-for="(feature, index) in businessSection.featureList" :key="index" style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Icon">
                  <el-upload
                      class="upload-demo upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      list-type="picture"
                      v-model="feature.icon"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title" >
                  <el-input class="input-label" size="small" v-model="feature.title"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" size="small"  v-model="feature.description"></el-input>
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
      businessSection: {
        title: '',
        videoTitle:'',
        videoUrl:'',
        image:'',
        featureList:[
          {
            icon:'',
            title:'',
            description:''
          },
          {
            icon:'',
            title:'',
            description:''
          },
          {
            icon:'',
            title:'',
            description:''
          }
        ]
      }
    }
  }
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
