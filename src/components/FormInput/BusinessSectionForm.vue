<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Business Section</span>
      </div>
      <el-form ref="form" :model="businessSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="businessSection.section_title"></el-input>
        </el-form-item>
        <el-form-item label="Video url">
          <el-input class="input-label" v-model="businessSection.video_url"></el-input>
        </el-form-item>
        <el-form-item label="Video title">
          <el-input class="input-label" v-model="businessSection.video_title"></el-input>
        </el-form-item>
        <el-form-item label="Image ">
          <el-upload
            accept="image/*"
            name="files"
            ref="mainUpload"
            class="upload-demo upload"
            action="http://192.168.1.122:8081/api/image/uploadMultiFile"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
            :limit="1"
            :on-success="handleSectionSuccess"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: center">
          <el-col :span="24">
            <span>Feature List</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="8"
            v-for="(feature, index) in businessSection.businessFeatureList"
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
                  <el-input class="input-label" size="small" v-model="feature.title"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="input-label" size="small" v-model="feature.description"></el-input>
                </el-form-item>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="reset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createBusinessSection } from "@/api/businessSection";
export default {
  computed: {
    ...mapGetters(["businessSection"]),
  },
  async mounted() {
    await this.$store.dispatch("businessSection/businessSection");
    this.businessSection.id = null;
  },
  data() {
    return {
      fileList: [],
      sectionImage: null,
      imageList: [],
      requestForm: null,
    };
  },
  methods: {
    async onSubmit() {
      this.sectionImage = null;
      this.imageList = [];
      this.$refs.mainUpload.submit();
    },
    handleSectionSuccess(response) {
      this.sectionImage = response.data[0];
      this.$refs.upload.forEach((element) => {
        element.submit();
      });
    },
    handleSuccess(response) {
      this.imageList.push(response.data[0]);
      this.submitForm();
    },
    submitForm() {
      if (this.imageList.length != 3 || this.sectionImage == null) {
        return;
      } else {
        this.businessSection.image_url = this.sectionImage;
        let list = this.businessSection.businessFeatureList;
        for (let i = 0; i < list.length; i++) {
          list[i].icon = this.imageList[i];
        }
        createBusinessSection(this.businessSection)
          .then(() => this.successNotify())
          .catch(() => this.errorNotify());
      }
    },
    errorNotify() {
      this.$notify({
        title: "Error",
        message: "error",
      });
    },
    successNotify() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    },
    async reset() {
      await this.$store.dispatch("businessSection/businessSection");
      this.businessSection.id = null;
    },
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
