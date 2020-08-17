<template>
  <div>
      <el-form ref="form"   label-width="120px">
        <el-card v-for="(progress, index) in progressCircle.featureProgressList" :key="index">
          <el-form-item label="Progress">
            <el-input-number v-model="progress.progress"
                             :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="Title">
            <el-input class="input-label" v-model="progress.featureListTitle"></el-input>
          </el-form-item>

          <el-form-item label="List text">
            <div class="list-require" style="border: gainsboro 1px solid; border-radius: 5px; padding: 5px">
              <el-form :model="dynamicValidateForm[index]" ref="dynamicValidateForm" label-width="120px"
                       class="demo-dynamic">
                <el-form-item style="padding-top: 5px"
                              v-for="(domain) in dynamicValidateForm[index].domain"
                              :label="'Text'"
                              :key="domain.key"
                              :rules="{required: true, trigger: 'blur'}">
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="domain.value"></el-input>
                    </el-col>
                    <el-col :span="12 ">
                      <el-button @click.prevent="removeDomain(index,domain)">Delete</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button @click="addDomain(index)">New text</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
        </el-card>

        <el-form-item style="text-align: center; padding-top: 10px">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createProgressCircle} from "@/api/progressCircle";
import {successNotify, errorNotify} from '@/function/notify'
export default {
  computed: {
    ...mapGetters(['progressCircle'])
  },
  props: {
    indexProgressList: {
      type: Number,
      default: 0,
      required: true
    },
  },
  methods: {
    onSubmit() {
      let listFeature = [[], []]
      for (let i = 0; i <= 1; i++) {
        this.dynamicValidateForm[i].domain.forEach(e => {
          listFeature[i].push(e.value)
        })
      }
      let progressOne = 0
      let progressTow = 1
      const progressForm = {
        featureProgressList: [
          {
            progress: this.progressCircle.featureProgressList[progressOne].progress,
            featureListTitle: this.progressCircle.featureProgressList[progressOne].featureListTitle,
            featureList: listFeature[progressOne]
          },
          {
            progress: this.progressCircle.featureProgressList[progressTow].progress,
            featureListTitle: this.progressCircle.featureProgressList[progressTow].featureListTitle,
            featureList: listFeature[progressTow]
          },
        ]
      };
      createProgressCircle(progressForm).then(() => {
        successNotify(this)
      }).catch(() => {
        errorNotify(this)
      })
    },

    removeDomain(index1, item) {
      var index = this.dynamicValidateForm[index1].domain.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm[index1].domain.splice(index, 1);
      }
    }
    ,
    addDomain(index1) {
      this.dynamicValidateForm[index1].domain.push({
        key: Date.now(),
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
