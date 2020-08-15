<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Newsletter Section</span>
      </div>
      <el-form ref="form" :model="newsletter" label-width="120px">
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
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createNewsletter} from "@/api/newsletter";
import {successNotify, errorNotify} from '@/function/notify'
export default {
  computed: {
    ...mapGetters(['newsletter'])
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      const newsletter = {
        title: this.newsletter.title,
        button_title: this.newsletter.button_title,
        button_href: this.newsletter.button_href,
        description: this.newsletter.description,
        description_button_title: this.newsletter.description_button_title,
        description_button_href: this.newsletter.description_button_href
      }
      createNewsletter(newsletter).then(() => {
        successNotify(this)
      }).catch(() => {
        errorNotify(this)
      })
    },

  },
  mounted() {
    this.$store.dispatch('newsletter/newsletter')
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
