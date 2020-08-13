<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Progress Circle</span>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-card v-for="(progress, index) in 2" :key="index">
          <el-form-item label="Progress">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="Title">
            <el-input class="input-label"></el-input>
          </el-form-item>

          <el-form-item label="List text">
            <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"
                       class="demo-dynamic">
                <el-form-item
                    label="Text"
                    :rules="[
                { required: true, trigger: 'blur' },
                 ]">
                  <el-col :span="12">
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item style="padding-top: 5px"
                              v-for="(domain) in dynamicValidateForm.domains"
                              :label="'Text'"
                              :key="domain.key"

                              :rules="{
                required: true, trigger: 'blur'
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
                  <el-button @click="addDomain">New text</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
        </el-card>

        <el-form-item style="text-align: center; padding-top: 10px" >
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      form: {},
      dynamicValidateForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      }
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ''
      });
    },
    handleChange(value) {
      console.log(value)
    }
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
