<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Newsletter Section</span>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change background</el-button>
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
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Newsletter Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <NewsletterPreview :newsletter="newsletter"
                         :styleNewsletter="styleNewsletter"
      ></NewsletterPreview>
    </el-card>

    <el-dialog title="Change style" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Background color" :label-width="formLabelWidth">
          <el-input v-model="styleNewsletter" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {createNewsletter, getNewsletter} from "@/api/newsletter";
import {successNotify, errorNotify} from '@/function/notify'
import NewsletterPreview from "@/components/previews/NewsletterPreview";

export default {
  components: {
    NewsletterPreview
  },
  data() {
    return {
      styleNewsletter: {},
      newsletter: {},
      dialogFormVisible: false,
      form: {
        name: '',
      },
      formLabelWidth: '200px',
    }
  },
  methods: {

    onSubmit() {
      createNewsletter(this.newsletter).then(() => {
        successNotify(this)
      }).catch(() => {
        errorNotify(this)
      })
    },
    async getNewsletter() {
      await getNewsletter().then(response => {
        if (response.data.data !== null) {
          this.newsletter = response.data.data
        }
      })
    },
    onReset() {
      this.newsletter = null
      this.getNewsletter()
    }
  },
  async mounted() {
    let styleJSO = '{"backgroundColor": "gray","border": "2px solid black","fontSize": "40px"}'
    this.styleNewsletter = JSON.parse(styleJSO)
    await this.getNewsletter()
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
