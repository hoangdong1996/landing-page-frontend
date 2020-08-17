<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Pricing Section</span>
      </div>
      <el-form ref="form" :model="pricingSection" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="pricingSection.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="input-label" v-model="pricingSection.description"></el-input>
        </el-form-item>
        <el-form-item label="Popular title">
          <el-input class="input-label" v-model="pricingSection.popularTitle"></el-input>
        </el-form-item>
        <el-row style="text-align: center">
          <el-col :span="24"><span>Pricing List</span></el-col>
        </el-row>
        <el-row>
          <el-col  v-for="(pricing, index) in pricingSection.pricingTableList" :key="index"
                  style="padding-right: 10px">
            <div>
              <el-card>
                <el-form-item label="Icon">
                  <el-upload
                      accept="image/*"
                      name="files"
                      ref="upload"
                      class="upload-demo upload"
                      action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                      :file-list="fileList"
                      :auto-upload="false"
                      list-type="picture"
                      :limit="1"
                      :on-success="handleSuccess">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size 500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="Title">
                  <el-input class="input-label" v-model="pricing.title"></el-input>
                </el-form-item>
                <el-form-item label="Value">
                  <el-input class="input-label" v-model="pricing.value"></el-input>
                </el-form-item>
                <!--                <el-form-item label="isPopular">-->
                <!--                  <el-input class="input-label" v-model="pricing.isPopular"></el-input>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="isActive">-->
                <!--                  <el-input class="input-label" v-model="pricing.isActive"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="Duration">
                  <el-input class="input-label" v-model="pricing.duration"></el-input>
                </el-form-item>

                <el-form-item label="List text">
                  <div class="list-require" style="">
                    <el-form :model="dynamicValidateForm[index]" ref="dynamicValidateForm" label-width="120px"
                             class="demo-dynamic" style="">
                      <el-form-item style="padding-top: 5px"
                                    v-for="(domain) in dynamicValidateForm[index].domains"
                                    :label="'Text'"
                                    :key="domain.key"
                                    :rules="{required: true, message: 'domain can not be null', trigger: 'blur'}">
                        <el-row>
                          <el-col>
                            <el-input v-model="domain.value"></el-input>
                          </el-col>
                          <el-col>
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
            </div>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createPricingSection} from "@/api/pricingSection";

export default {
  computed: {
    ...mapGetters(['pricingSection'])
  },
  data() {
    return {
      fileList: [],
      imageList: [],
      pricingSectionForm: null,
      dynamicValidateForm: [
        {
          domains: []
        },
        {
          domains: []
        },
        {
          domains: []
        },
        {
          domains: []
        }
      ]
    }
  },
  methods: {
    onSubmit() {
        this.$refs.upload.forEach(child =>{
          child.submit()
        })
    },
    handleSuccess(response){
      this.imageList.push({
        id: response.data[0].id
      })
    this.submitFormRequest()
    },
    submitFormRequest(){
      if (this.imageList.length < this.pricingSection.pricingTableList.length){
        return
      }
      for (let i = 0; i < this.pricingSection.pricingTableList.length; i++) {
        this.pricingSection.pricingTableList[i].thumb = this.imageList[i]
      }
      createPricingSection(this.pricingSection).then(() => {
        console.log('done')
      }).catch(erorr => {
        console.log(erorr)
      })
    },
    removeDomain(index1, item) {
      let index = this.dynamicValidateForm[index1].domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm[index1].domains.splice(index, 1);
      }
    },
    addDomain(index1) {
      this.dynamicValidateForm[index1].domains.push({
        key: Date.now(),
        value: ''
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('updatePricingSection')
    this.pricingSection.id = null
    this.pricingSection.pricingTableList.forEach(pricing => {
      pricing.id = null
    })
    let indexPricing = 0
    this.pricingSection.pricingTableList.forEach(pricing => {
      let index = 1
      pricing.price.forEach(price => {
        let obj = {
          key: index,
          value: price
        }
        this.dynamicValidateForm[indexPricing].domains.push(obj)
        index++
      })
      indexPricing++
    })
  }
}
</script>

<style lang="scss" scoped>
.list-require {
  border: gainsboro 1px solid;
  border-radius: 5px;
  padding: 5px

}

.el-card .el-form .el-row .el-col .el-form-item {
  margin-bottom: 0px;
  margin-top: 5px;
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
