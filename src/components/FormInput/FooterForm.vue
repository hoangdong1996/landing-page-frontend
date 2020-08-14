<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Footer</span>
      </div>
      <el-form ref="form" :model="footer" label-width="120px">
        <el-form-item label="Image">
          <el-upload
              class="upload-demo upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline;padding-left: 5px ">jpg/png files with a size
              less than 500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Title">
          <el-input class="input-label" v-model="footer.title"></el-input>
        </el-form-item>

        <el-form-item label="List text">
          <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"
                     class="demo-dynamic">
              <el-form-item style="padding-top: 5px"
                            v-for="(domain) in dynamicValidateForm.domain"
                            :label="'Text'"
                            :key="domain.key"
                            :rules="{required: true, trigger: 'blur'}">
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
    ...mapGetters(['footer'])

  },
  data () {
    return{
      dynamicValidateForm:
        {
          domain: [{
            key: 1,
            value:''
          }]
        }
    }
  },
  created() {
    this.$store.dispatch('footer/getFooter')

  },
  methods: {
    removeDomain(index1,item) {
      var index = this.dynamicValidateForm[index1].domain.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm[index1].domain.splice(index, 1);
      }
    }
    ,
    addDomain(index1) {
      this.dynamicValidateForm[index1].domain.push({
        key: 1,
        value: ''
      });
    }
  },
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
