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
        <el-row style="">
          <el-button @click.prevent="aboutExpandIndex = 0">1</el-button>
          <el-button @click.prevent="aboutExpandIndex = 1">2</el-button>
          <el-button @click.prevent="aboutExpandIndex = 2">3</el-button>
        </el-row>
        <el-row>
          <el-col
              v-for="(about, index) in aboutSection.aboutExpandList"
              :key="index"
              style="padding-right: 10px"
              v-show="aboutExpandIndex === index"
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
                      :on-change="handleChange"
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
import {mapGetters} from "vuex";
import {createAboutSection} from '@/api/aboutSection'
import {uploadFile} from '@/api/upload'

export default {
  computed: {
    ...mapGetters(["aboutSection"]),
  },
  data() {
    return {
      aboutExpandIndex: 0,
      fileList: [],
      requestForm: null,
      imageList: new Array(3),
      resImageList: new Array(3),
    };
  },
  methods: {
    handleChange(file) {
      this.imageList[this.aboutExpandIndex] = file.raw;
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined)
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => {
            this.resetAll()
            return
          })
      }
    },
    resetAll() {
      this.resImageList = new Array(3)
      this.imageList = new Array(3)
    },
    async onSubmit() {
      await this.uploadFile()
      this.submitFormRequest();
    },
    successNotify() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success",
      })
    },
    errorNotify() {
      this.$notify({
        title: "Error",
        message: "error",
      });
    },
    submitFormRequest() {
      let list = this.aboutSection.aboutExpandList
      for (let i = 0; i < list.length; i++) {
        // list.id = null
        if (this.resImageList[i] !== undefined) {
          list[i].icon = this.resImageList[i]
        }
      }
      createAboutSection(this.aboutSection)
          .then(() => this.successNotify())
          .catch(() => this.errorNotify())
    }
  },
  async mounted() {
    await this.$store.dispatch("aboutSection/aboutSection");
    this.aboutSection.id = null
    this.aboutSection.aboutExpandList.forEach(item => {
      item.id = null
    })
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
