<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Progress Circle</span>
      </div>

      <el-form ref="form" :model="progressCircleForm" label-width="120px">

        <el-form v-for="(subForm,index) in progressCircleForm.featureProgressList" :key="index" :model="subForm">
          <el-card>
            <el-form-item>
              <el-input v-model="subForm.progress"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="subForm.featureListTitle"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(feature, index) in subForm.featureList"
                :label="'Feature' + index"
                :key="index"
                :prop="'featureList.' + index + '.value'"
                :rules="{
                  required: true, message: 'feature can not be null', trigger: 'blur'
                }"
            >
              <el-input v-model="feature.value"></el-input>
              <el-button @click.prevent="removeFeature(feature)">Delete</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <el-form-item style="text-align: center; padding-top: 10px">
          <el-button type="primary">Create</el-button>
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
      progressCircleForm: {
        featureProgressList: [
          {
            progress: '',
            featureListTitle: '',
            featureList: [
              {
                key: 1,
                value: ''
              }
            ]
          }, {
            progress: '',
            featureListTitle: '',
            featureList: [
              {
                key: 1,
                value: ''
              }
            ]
          },
        ]
      }
    }
  },
  methods: {
    removeText(item) {
      var index = this.progressCircle.featureList.indexOf(item);
      if (index !== -1) {
        this.progressCircle.text.splice(index, 1);
      }
    },
    addText() {
      this.progressCircle.text.push({
        key: Date.now(),
        value: ''
      });
    },
    handleChange(value) {
      console.log(value)
    },
    removeFeature(item) {
      var index = this.progressCircleForm.featureProgressList.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
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
