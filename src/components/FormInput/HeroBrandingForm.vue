<template>
  <div>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>Hero Branding</span>
      </div>
      <el-form ref="form" :model="heroBranding" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="heroBranding.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="heroBranding.description"></el-input>
        </el-form-item>
        <el-form-item label="Button title">
          <el-input class="input-label" v-model="heroBranding.button_title"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label" v-model="heroBranding.button_href"></el-input>
        </el-form-item>
        <el-form-item label="Background">
          <el-upload
            accept="image/*"
            name="files"
            ref="upload"
            class="upload-demo upload"
            action="http://192.168.1.122:8081/api/image/uploadFile"
            :file-list="fileList "
            :auto-upload="false"
            list-type="picture"
            :limit="1"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <section
        id="home"
        class="hero-branding bg-cover"
        style="position: relative"
        :style="{ 'background-image': 'url(data:image/png;base64,' + preview.background_img.data +')' }"
      >
        <div class="container-fluid container-fluid--cp-150">
          <div class="hero-branding">
            <div class="hero-content">
              <h2 class="h1 hero-content-title">{{ preview.title }}</h2>
              <h6 class="hero-content-subtitle mt-20">{{ preview.description }}</h6>
              <div class="slider-button mt-30">
                <router-link
                  class="ht-btn ht-btn-md"
                >{{ preview.button_title }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHeroBranding } from "@/api/heroBranding";

export default {
  computed: {
    ...mapGetters(["heroBranding"]),
    preview(){
      return {...this.heroBranding}
    }
  },
  data() {
    return {
      fileList: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("heroBranding/getHeroBranding");
    this.heroBranding.id = null;
  },
  methods: {
    onSubmit() {
      this.$refs.upload.submit();
    },
    successNotify() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    },
    errorNotify() {
      this.$notify({
        title: "Error",
        message: "error",
      });
    },
    handleSuccess(response) {
      this.heroBranding.background_img = response.data;
      createHeroBranding(this.heroBranding)
        .then(() => {
          this.successNotify();
        })
        .catch(() => {
          this.errorNotify();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variabls.scss";
@import "@/assets/scss/elements/_hero-branding.scss";
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
