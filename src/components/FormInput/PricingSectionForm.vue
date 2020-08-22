<template>
  <div>
    <el-card class="box-card" v-if="pricingSection" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Pricing Section</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="Title">
          <el-input class="input-label" v-model="pricingSection.title" ></el-input>
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
        <el-row style="text-align: center">
          <el-button @click.prevent="pricingSectionIndex = 0">1</el-button>
          <el-button @click.prevent="pricingSectionIndex = 1">2</el-button>
          <el-button @click.prevent="pricingSectionIndex= 2">3</el-button>
          <el-button @click.prevent="pricingSectionIndex= 3">4</el-button>
        </el-row>
        <el-row>
          <el-col v-for="(pricing, index) in pricingSection.pricingTableList" :key="index"
                  style="padding-right: 10px"
                  v-show="pricingSectionIndex === index">
            <div>
              <el-card>
                <el-form-item label="Icon">
                  <el-upload
                      accept="image/*"
                      name="files"
                      ref="upload"
                      class="upload-demo upload"
                      action="http://192.168.1.122:8081/api/image/uploadMultiFile"
                      :file-list="fileList[index]"
                      :auto-upload="false"
                      list-type="picture"
                      :limit="1"
                      :on-change="handleChange"
                  >
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
                <el-form-item label="Popular">
                  <el-switch v-model="pricing.isPopular"></el-switch>
                </el-form-item>
                <el-form-item label="Active">
                  <el-switch v-model="pricing.active"></el-switch>
                </el-form-item>
                <el-form-item label="Duration">
                  <el-input class="input-label" v-model="pricing.duration"></el-input>
                </el-form-item>

                <el-form-item label="List text">
                  <div class="list-require" style="">
                    <el-form ref="dynamicValidateForm" label-width="120px"
                             class="demo-dynamic" style="">
                      <el-form-item style="padding-top: 5px"
                                    v-for="(price,indexPrice) in pricing.price"
                                    :label="'Text'"
                                    :key="indexPrice"
                                    :rules="{required: true, message: 'domain can not be null', trigger: 'blur'}">
                        <el-row>
                          <el-col>
                            <el-input v-model="pricing.price[indexPrice]"></el-input>
                          </el-col>
                          <el-col>
                            <el-button @click.prevent="removePrice(index,indexPrice)">Delete</el-button>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item>
                        <el-button
                            :disabled="pricing.price[pricing.price.length-1]===''"
                            @click="addPrice(index)">New text
                        </el-button>
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
          <el-button @click="onReset">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Pricing Section Preview</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <PricingSectionPreview :pricingSection="pricingSection"></PricingSectionPreview>
    </el-card>
  </div>
</template>

<script>
import {createPricingSection, getPricingSection} from "@/api/pricingSection";
import {uploadFile} from "@/api/upload";
import {errorNotify, successNotify} from "@/function/notify";
import PricingSectionPreview from "@/components/previews/PricingSectionPreview";
import {getBase64, getImageUrl} from "@/function/data";


const pricingSectionDefault = {
  title: '',
  description: '',
  popularTitle: '',
  pricingTableList: [{
    title: '',
    image: {},
    value: '',
    isPopular: false,
    active: false,
    duration: '',
    price: []
  }, {
    title: '',
    image: {},
    value: '',
    isPopular: false,
    active: false,
    duration: '',
    price: []
  }, {
    title: '',
    image: {},
    value: '',
    isPopular: false,
    active: false,
    duration: '',
    price: []
  }, {
    title: '',
    image: {},
    value: '',
    isPopular: false,
    active: false,
    duration: '',
    price: []
  }]
}
export default {
  components: {
    PricingSectionPreview
  },
  data() {
    return {
      pricingSection: null,
      pricingSectionIndex: 0,
      fileList: [],
      pricingSectionForm: null,
      imageList: new Array(4),
      resImageList: new Array(4),
      disable: false,
      loading: true
    }
  },
  methods: {
    handleChange(file) {
      this.imageList[this.pricingSectionIndex] = file.raw;
      this.onPreview()
    },
    async onPreview() {
      for (let i = 0; i < this.pricingSection.pricingTableList.length; i++) {
        if (this.imageList[i] !== undefined) {
          await getBase64(this.imageList[i]).then((data) => {
            this.$set(this.pricingSection.pricingTableList[i].image, 'data', data)
          })
        }
      }
    },
    async onSubmit() {
      this.loading = true
      await this.uploadFile()
      await this.submitFormRequest();
      this.loading = false
    },
    async uploadFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i] !== undefined)
          await uploadFile(this.imageList[i]).then(res => {
            this.resImageList[i] = res.data.data
          }).catch(() => {
            this.onReset()
          })
      }
    },
    async submitFormRequest() {
      for (let i = 0; i < this.pricingSection.pricingTableList.length; i++) {
        if (this.resImageList[i] !== undefined) {
          this.pricingSection.pricingTableList[i].image = this.resImageList[i]
        }
      }
      await createPricingSection(this.pricingSection)
          .then(() => successNotify(this)
          ).catch(() => errorNotify(this)
          )
      await this.getPricingSection()
    },
    onReset() {
      this.loading = true
      this.resetData()
      this.resetDispatch()
      this.loading = false
    },
    resetData() {
      this.pricingSection = null
      this.fileList = []
      this.pricingSectionForm = null
      this.imageList = new Array(4)
      this.resImageList = new Array(4)
    },
    async resetDispatch() {
      await this.getPricingSection()
      this.pricingSection.pricingTableList.forEach(pricing => {
        let obj = {
          name: pricing.image.name,
          url: getImageUrl(pricing.image)
        }
        this.fileList.push([obj])
      })
    },
    async getPricingSection() {
      await getPricingSection().then(response => {
        if (response.data.data === null) {
          this.pricingSection = pricingSectionDefault
        } else {
          this.pricingSection = response.data.data
        }
      })
    },
    removePrice(index, item) {
      this.pricingSection.pricingTableList[index].price.splice(item, 1);
    },
    addPrice(index) {
      this.pricingSection.pricingTableList[index].price.push('');
    }
  },
  async created() {
    await this.resetDispatch()
    this.loading = false
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
