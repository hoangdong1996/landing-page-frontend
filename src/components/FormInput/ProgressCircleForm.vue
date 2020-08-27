<template>
  <div v-if="progressCircle">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Progress Circle</span>
        <el-checkbox v-model="progressCircle.showSection" style="margin-left: 20px" label="Show" border></el-checkbox>
        <el-button @click="dialogFormVisible = true" style="margin-left: 10px">Change Style CSS</el-button>
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

      <el-dialog title="Change style" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="Change progress css" :label-width="formLabelWidth">
            <el-input v-model="progressCircle.progress_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change title css" :label-width="formLabelWidth">
            <el-input v-model="progressCircle.title_style" type="textarea" :rows="2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Change text css" :label-width="formLabelWidth">
            <el-input v-model="progressCircle.list_text_style" type="textarea" :rows="2" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onChangeStyle">Confirm</el-button>
      </span>
      </el-dialog>
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
import {createProgressCircle, getProgressCircle} from "@/api/progressCircle";
import {errorNotify, successNotify} from '@/function/notify'
import ProgressCirclePreview from "@/components/previews/ProgressCirclePreview";
import {addStyleInClass, getStyleById} from "@/function/style";

const progressCircleDefault = {
  featureProgressList: [{
    progress: 0,
    featureListTitle: '',
    featureList: []
  }, {
    progress: 0,
    featureListTitle: '',
    featureList: []
  }]
}
export default {
  components: {
    ProgressCirclePreview
  },
  data() {
    return {
      loading: true,
      progressCircleIndex: 0,
      render: 0,
      num: 1,
      disable: false,
      progressCircle: null,
      dialogFormVisible: false,
      formLabelWidth: '200px',
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      createProgressCircle(this.progressCircle)
          .then(() => successNotify(this))
          .catch(() => {
            errorNotify(this)
            this.onReset()
          })
      this.loading = false
    },
    removeFeatureList(index, item) {
      this.progressCircle.featureProgressList[index].featureList.splice(item, 1);
    },
    addFeatureList(index) {
      this.progressCircle.featureProgressList[index].featureList.push('');
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.progressCircle = null
    },
    async resetDispatch() {
      await this.getProgressCircle()
      this.progressCircle.id = null
      this.progressCircle.featureProgressList.forEach(e => {
        e.id = null
      })
    },
    getProgressCircle() {
      return getProgressCircle().then(response => {
        if (response.data.data === null) {
          this.progressCircle = progressCircleDefault
        } else {
          this.progressCircle = response.data.data
        }
      })
    },
    onChangeStyle() {
      this.dialogFormVisible = false
      this.getStyleProgressCircle()
    },
    getStyleProgressCircle() {
      getStyleById('stylePricingSection').innerHTML = (addStyleInClass('style-circle-progress', this.progressCircle.progress_style) +
          addStyleInClass('style-circle-title', this.progressCircle.title_style) +
          addStyleInClass('style-circle-list-text', this.progressCircle.list_text_style))
    }
  },
  async mounted() {
    await this.resetDispatch()
    this.getStyleProgressCircle()
    this.loading = false
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
