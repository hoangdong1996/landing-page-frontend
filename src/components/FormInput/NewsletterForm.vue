<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Newsletter Section</span>
      </div>
      <el-form ref="form" label-width="120px" v-if="newsletter">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="newsletter.title"></el-input>
        </el-form-item>
        <el-form-item label="Button Title">
          <el-input class="input-label" v-model="newsletter.button_title"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label" v-model="newsletter.button_href"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="newsletter.description"></el-input>
        </el-form-item>
        <el-form-item label="Description Title">
          <el-input class="input-label" v-model="newsletter.description_button_title"></el-input>
        </el-form-item>
        <el-form-item label="Description Href">
          <el-input class="input-label" v-model="newsletter.description_button_href"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onPreview">Preview</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <NewsletterPreview :newsletter="newsletter"></NewsletterPreview>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createNewsletter} from "@/api/newsletter";
import {successNotify, errorNotify} from '@/function/notify'
import NewsletterPreview from "@/components/previews/NewsletterPreview";
export default {
  components:{
    NewsletterPreview
  },
  computed: {
    ...mapGetters(['newsletter'])
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      createNewsletter(this.newsletter).then(() => {
        successNotify(this)
      }).catch(() => {
        errorNotify(this)
      })
    },
    onPreview() {

    }
  },
  async mounted() {
   await this.$store.dispatch('newsletter/getNewsletter')
    this.newsletter.id = null
  }
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
