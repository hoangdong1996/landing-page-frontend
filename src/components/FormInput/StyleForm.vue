<template>
  <div v-if="style">
    <el-card>
      <div slot="header" class="clearfix">
        <span>Style</span>
      </div>
      <el-form>
        <el-form-item label="Style">
          <el-input class="input-label" :rows="10" type="textarea" v-model="style.styleCss"></el-input>
        </el-form-item>
      </el-form>
      <el-button
          type="primary"
          @click.prevent="onSubmit"
      >Save
      </el-button>
    </el-card>
  </div>
</template>

<script>
import {createStyle, getStyle} from "@/api/style";
import {errorNotify, successNotify} from "@/function/notify";

export default {
  data() {
    return {
      style: null
    }
  },
  methods: {
    onSubmit() {
      createStyle(this.style).then(() =>
          successNotify(this)
      ).catch(() => {
        errorNotify(this)
      })
    },
    async getStyleForm() {
      await getStyle().then(response => {
        this.style = response.data.data
      }).catch(er => console.log(er))
    }
  },
  async mounted() {
    await this.getStyleForm()
    let stylePage = document.getElementById('stylePage')
    stylePage.innerHTML = this.style.styleCss
  }
}
</script>

<style scoped>

</style>
