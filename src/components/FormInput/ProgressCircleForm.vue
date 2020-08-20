<template>
  <div v-if="progressCircle">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Progress Circle</span>
      </div>
      <el-row>
        <el-button @click.prevent="progressCircleIndex = 0">Circle 1</el-button>
        <el-button @click.prevent="progressCircleIndex = 1">Circle 2</el-button>
      </el-row>
      <el-form ref="form" label-width="120px">
        <el-card v-for="(progress, index) in progressCircle.featureProgressList"
                 :key="index"
                 v-show="progressCircleIndex === index"
        >
          <el-form-item label="Progress">
            <el-input-number v-model="progress.progress" @change="render += 1" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="Title">
            <el-input class="input-label" v-model="progress.featureListTitle"></el-input>
          </el-form-item>

          <el-form-item label="List text">
            <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
              <el-form ref="dynamicValidateForm" label-width="120px"
                       class="demo-dynamic">
                <el-form-item style="padding-top: 5px"
                              v-for="(list, index2) in progress.featureList"
                              :label="'Text'"
                              :key="index2"
                              :rules="{required: true, trigger: 'blur'}">
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="progress.featureList[index2]"></el-input>
                    </el-col>
                    <el-col :span="12 ">
                      <el-button @click.prevent="removeFeatureList(index,index2)">Delete</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="progress.featureList[progress.featureList.length-1]===''"
                             @click="addFeatureList(index)">New text
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
        </el-card>

        <el-form-item style="text-align: center; padding-top: 10px">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Progress Circle Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <ProgressCirclePreview :progressCircle="progressCircle" :render="render "></ProgressCirclePreview>
    </el-card>
  </div>
</template>

<script>
import {createProgressCircle} from "@/api/progressCircle";
import {successNotify, errorNotify} from '@/function/notify'
import ProgressCirclePreview from "@/components/previews/ProgressCirclePreview";
import {getProgressCircle} from '@/api/progressCircle'

export default {
  components: {
    ProgressCirclePreview
  },
  data() {
    return {
      progressCircleIndex:0,
      render: 0,
      num: 1,
      disable: false,
      progressCircle: null
    }
  },
  methods: {
    onSubmit() {
      createProgressCircle(this.progressCircle).then(() => {
        successNotify(this)
      }).catch(() => {
        errorNotify(this)
      })
    },
    removeFeatureList(index, item) {
      this.progressCircle.featureProgressList[index].featureList.splice(item, 1);
    },
    addFeatureList(index) {
      this.progressCircle.featureProgressList[index].featureList.push('');
    },
    onReset(){
      this.resetData()
      this.resetDispatch()
    },
    resetData(){
      this.progressCircle = null
    },
    resetDispatch() {
      getProgressCircle().then(resp => {
        this.progressCircle = resp.data.data
        this.progressCircle.id = null
        this.progressCircle.featureProgressList.forEach(e => {
          e.id = null
        })
      })
    }
  },
  created() {
    this.resetDispatch()
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
