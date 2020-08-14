<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Navbar</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-form ref="form" :model="navbar" label-width="120px">
        <el-row>
          <el-col :span="8" style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Icon">
                  <el-upload
                      class="upload-demo upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture"
                      v-model="navbar.logoSrc"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-top: 20px">
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
      navbar: {
        logoSrc: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.upload {
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


</style>
