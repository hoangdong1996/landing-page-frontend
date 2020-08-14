<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Progress Circle</span>
      </div>
      <el-form ref="form" :model="progressCircle" label-width="120px">
        <el-card v-for="(progress, index) in progressCircle.featureProgressList" :key="index">
          <el-form-item label="Progress">
            <el-input-number v-model="progress.progress"
                             :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="Title">
            <el-input class="input-label" v-model="progress.featureListTitle"></el-input>
          </el-form-item>

<!--          <el-form-item label="List text">-->
<!--            <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">-->
<!--              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"-->
<!--                       class="demo-dynamic">-->
<!--                <el-form-item style="padding-top: 5px"-->
<!--                              v-for="(domain) in dynamicValidateForm[index].domain"-->
<!--                              :label="'Text'"-->
<!--                              :key="domain.key"-->
<!--                              :rules="{required: true, trigger: 'blur'}">-->
<!--                  <el-row>-->
<!--                    <el-col :span="12">-->
<!--                      <el-input v-model="domain.value"></el-input>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12 ">-->
<!--                      <el-button @click.prevent="removeDomain(index,domain)">Delete</el-button>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-button @click="addDomain(index)">New text</el-button>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--            </div>-->
<!--          </el-form-item>-->
        </el-card>

        <el-form-item style="text-align: center; padding-top: 10px">
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
    ...mapGetters(['progressCircle'])
  },
  data() {
    return {
      num: 1,

      // progressCircleSection: {
      //   featureProgressList: [
      //     {
      //       progress: null,
      //       featureListTitle: '',
      //       featureList: []
      //     },
      //     {
      //       progress: null,
      //       featureListTitle: '',
      //       featureList: []
      //     }
      //   ]
      // },
      dynamicValidateForm: [
        {
          domain: [{
            key: 1,
            value:''
          }]
        },
        {
          domain: [{
            key: 1,
            value:''
          }]
        }
      ]
    }
  },
  methods: {
    // removeDomain(index1,item) {
    //   var index = this.dynamicValidateForm[index1].domain.indexOf(item);
    //   if (index !== -1) {
    //     this.dynamicValidateForm[index1].domain.splice(index, 1);
    //   }
    // }
    // ,
    // addDomain(index1) {
    //   this.dynamicValidateForm[index1].domain.push({
    //     key: 1,
    //     value: ''
    //   });
    // }
  },
  mounted() {
    this.$store.dispatch('progressCircle/updateProgressCircle')
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
