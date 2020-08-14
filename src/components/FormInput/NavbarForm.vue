<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Navbar</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Brand Icon">
          <el-upload
            accept="image/*"
            name="files"
            ref="upload"
            class="upload-demo upload"
            action="http://192.168.1.122:8081/api/image/uploadMultiFile"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
            :limit="1"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createNavbar } from "@/api/navbar";

export default {
  data() {
    return {
      form: {},
      fileList: [],
      response: null,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.upload.submit();
    },
    handleSuccess(response) {
      this.response = response;
      const navbar = {
        logo_src: {
          id: response.data[0].id,
        },
      };
      createNavbar(navbar).then((response) => {
        this.$notify({
          title: "Success",
          message: "This is a success message",
          type: "success",
        }).catch(() => {
          this.$notify.error({
            title: "Error",
            message: "error",
          })
        })
      })
    },
  },
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
  clear: both;
}
</style>
