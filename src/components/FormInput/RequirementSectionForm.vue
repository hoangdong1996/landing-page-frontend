<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Requirement Section</span>
      </div>
      <el-form ref="form" :model="requirementSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="requirementSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" type="textarea" v-model="requirementSection.description"></el-input>
        </el-form-item>
        <el-form-item label="Button Title">
          <el-input class="input-label" v-model="requirementSection.button_title"></el-input>
        </el-form-item>
        <el-form-item label="Button href">
          <el-input class="input-label" v-model="requirementSection.button_href"></el-input>
        </el-form-item>
        <el-form-item label="Icon" v-model="requirementSection.image">
          <el-upload
              class="upload-demo upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a size
              less than 500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="List text">
          <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(domain) in dynamicValidateForm.domains"
                            :label="'Text'"
                            :key="domain.key"
                            :rules="{
                required: true, message: 'domain can not be null', trigger: 'blur'
                }">
                <el-row>
                  <el-col :span="12">
                    <el-input v-model="domain.value"></el-input>
                  </el-col>
                  <el-col :span="12 ">
                    <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button @click="addDomain()">New text</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['requirementSection'])
  },
  created() {

  },
  data() {
    return {
      // requirementSection: {
      //   title: '',
      //   description: '',
      //   image: '',
      //   button_title: '',
      //   button_href: '',
      //   requirementList: ['a', 'b]
      // },
      dynamicValidateForm: {
        domains: [
          {
            key: 0,
            value: 'a'
          },
          {}
        ],
      },

    };
  },
  methods: {
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ''
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('requirementSection/requirementSection')
    // for (let item in this.requirementSection.requirementList) {
    //   let i = 0;
    //   this.dynamicValidateForm.domains.$set(this.dynamicValidateForm.domains, i, item),
    //       this.dynamicValidateForm.domains.key += 1
    //   i++
    // }
    let i = 0
    this.requirementSection.requirementList.forEach(e => {
      this.dynamicValidateForm.domains[i].value = e
      this.dynamicValidateForm.domains[i].key = ++i
    })
    console.log(this.dynamicValidateForm.domains)
  }
}
</script>

<style lang="scss" scoped>
.list-require {
  border: gainsboro 1px solid;
}

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
