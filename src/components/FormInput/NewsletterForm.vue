<template>
  <div v-if="newsletter">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Newsletter Section</span>
        <el-checkbox v-model="newsletter.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
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
        <el-form-item label="Description_Title">
          <el-input class="input-label" v-model="newsletter.description_button_title"></el-input>
        </el-form-item>
        <el-form-item label="Description_Href">
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
                         :isStyle="isStyle"
                         v-if="newsletter"
                         :render="key"
      />
    </el-card>

    <el-dialog title="Change style" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="Change title css" :label-width="formLabelWidth">
          <el-input v-model="newsletter.title_style" type="textarea" :rows="2"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change description css" :label-width="formLabelWidth">
          <el-input v-model="newsletter.description_style" type="textarea" :rows="2"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change button css" :label-width="formLabelWidth">
          <el-input v-model="newsletter.button_style" type="textarea" :rows="2"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Change newsletter css" :label-width="formLabelWidth">
          <el-input v-model="newsletter.newsletter_style" type="textarea" :rows="2"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createNewsletter, getNewsletter} from "@/api/newsletter";
import {successNotify, errorNotify} from '@/function/notify'
import NewsletterPreview from "@/components/previews/NewsletterPreview";
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  components: {
    NewsletterPreview
  },
  data() {
    return {
      newsletter: null,
      form: {
        name: '',
      },
      formLabelWidth: '200px',
      dialogFormVisible: false,
      isStyle: true,
      key: 0
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
          this.getStyleNewsletter()
        }
      })
    },
    onReset() {
      this.newsletter = null
      this.getNewsletter()
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleNewsletter()
      this.key = this.key + 1;
    },
    getStyleNewsletter() {
      getStyleById('styleNewsletter').innerHTML = (addStyleInClass('style-newsletter-title', this.newsletter.title_style) +
          addStyleInClass('style-newsletter-description', this.newsletter.description_style) +
          addStyleInClass('style-newsletter', this.newsletter.newsletter_style) +
          addStyleInClass('style-newsletter-button', this.newsletter.button_style))
    }
  },
  async mounted() {
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
