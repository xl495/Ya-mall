<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      v-loading="isLoading"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="封面图" prop="cover">
        <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          list-type="picture"
          :limit="1"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i
            v-else
            style="font-size: 5rem"
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title" class="input-with-select">
        <el-input v-model="form.title">
          <el-select
            slot="prepend"
            v-model="form.category"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in category"
              :key="item._id"
              :label="item.title"
              :value="item._id"
            />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" placeholder="系统自会保留两位小数" />
      </el-form-item>
      <el-form-item label="划线价格" prop="through_price">
        <el-input
          v-model="form.through_price"
          placeholder="系统自会保留两位小数"
        />
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-switch v-model="form.isShow" />
      </el-form-item>
      <el-form-item label="是否开启多规格">
        <el-switch v-model="form.isSku" />
      </el-form-item>
      <el-form-item label="选择规格">
        <el-select v-model="form.spec" placeholder="请选择规格">
          <el-option
            v-for="(item, index) in sepcList"
            :key="index"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述" prop="content">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload
          ref="uploadImages"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          list-type="picture-card"
          :on-success="imagesSuccess"
          :on-remove="handleRemove"
          multiple
          :limit="7"
          :auto-upload="false"
          :on-exceed="
            () => {
              $message.error('最多上传 7 张图片')
            }
          "
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitImages">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGood, addGood, getGoodAttr } from '@/api/good'
import { getCategory } from '@/api/category'
export default {
  props: {
    id: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    var valiPrice = (rule, value, callback) => {
      var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('输入不正确'))
      }
    }
    return {
      isLoading: false,
      form: {
        title: '',
        isShow: false,
        content: '',
        cover: null,
        images: []
      },
      imageUrl: '',
      isUpimagesEd: false,
      rules: {
        cover: [{ required: true, message: '请上传封面图!', trigger: 'blur' }],
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '长度在 1 到 300 个字符',
            trigger: 'blur'
          }
        ],
        price: [{ validator: valiPrice, required: true, trigger: 'blur' }],
        through_price: [
          { validator: valiPrice, required: true, trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          {
            min: 3,
            max: 500,
            message: '长度在 3 到 500 个字符',
            trigger: 'blur'
          }
        ]
      },
      sepcList: [],
      category: []
    }
  },
  created() {
    this.id && this.fetData()
    this.fetchCategory()
    this.fetchGetGoodAttr()
  },
  methods: {
    async fetData() {
      const { data } = await getGood(this.id)
      this.form = data
      this.imageUrl = data.cover
    },

    async fetchGetGoodAttr() {
      const { data } = await getGoodAttr()
      this.sepcList = data.list
    },
    async fetchCategory() {
      const { data } = await getCategory()
      this.category = data.list
    },
    onSubmitImages() {
      this.$refs.uploadImages.submit()
    },
    onSubmit() {
      this.isLoading = true
      this.$refs['ruleForm'].validate(valid => {
        if (this.form.category === null) {
          return this.$alert('请选择分类!')
        }
        if (
          valid &&
          this.form.images.length === this.$refs.uploadImages.uploadFiles.length
        ) {
          // 校验通过 && 商品轮播图已经上传完成
          this.form.images = this.form.images
          addGood(this.form)
            .then(res => {
              this.$message.success('创建成功')
              this.$router.push('/good/all')
            })
            .catch(error => {
              this.$message.error(error.response.data.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.isLoading = false
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('上传成功')
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.cover = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG  PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt5M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    imagesSuccess(res, file, fileList) {
      this.form.images.push(res.url)
      this.onSubmit()
    }
  }
}
</script>
<style lang="scss">
.avatar {
  width: 148px;
  height: auto;
}
.input-with-select {
  /deep/ .el-input-group__prepend {
    min-width: 150px;
  }
}
</style>
