<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>About Section</span>
      </div>
      <el-form ref="form" :model="aboutSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="aboutSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" v-model="aboutSection.text"></el-input>
        </el-form-item>

        <el-row style="text-align: center">
          <el-col :span="24">
            <span>About Expand</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="8"
            v-for="(about, index) in aboutSection.aboutExpandList"
            :key="index"
            style="padding-right: 10px"
          >
            <div>
              <el-card>
                <el-form-item label="Icon">
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
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="about.title" size="small"></el-input>
                </el-form-item>
                <el-form-item label="Href">
                  <el-input class="input-label" v-model="about.href" size="small"></el-input>
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
import { mapGetters } from "vuex";
import { createAboutSection } from '@/api/aboutSection'
export default {
  computed: {
    ...mapGetters(["aboutSection"]),
  },
  data() {
    return {
      fileList: [],
      requestForm: null,
      imageList: [],
    };
  },
  methods: {
    onSubmit() {
      // reset back
      this.imageList = [];
      // submit upload all file
      this.$refs.upload.forEach(child => {
        child.submit();
      })
    },
    successNotify(){
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success",
      })
    },
    errorNotify(){
      this.$notify({
        title: "Error",
        message: "error",
      });
    },
    handleSuccess (response) {
      this.imageList.push({
        id: response.data[0].id}
      )
      this.submitFormRequest()
    },
    submitFormRequest() {
      const imageCount = this.imageList.length
      if(imageCount < 3){
        return;
      } else if (imageCount === 3) {
        let list = this.requestForm.aboutExpandList
        for(let i = 0; i < list.length; i++) {
          // list.id = null
          list[i].icon = this.imageList[i]
        }
        createAboutSection(this.requestForm)
        .then(() => this.successNotify())
        .catch(() => this.errorNotify())
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("aboutSection/aboutSection");
    this.requestForm = {
      title: this.aboutSection.title,
      text: this.aboutSection.text,
      aboutExpandList: this.aboutSection.aboutExpandList
    }
  },
};
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
