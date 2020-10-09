<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="max-width: 500px"
    >
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" placeholder="请输入排序" />
      </el-form-item>

      <el-form-item
        label="请上传图片
      "
      >
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSwiper } from '@/api/swiper'
export default {
  data() {
    return {
      options: [
        {
          value: 'index',
          label: '首页'
        },
        {
          value: 'store',
          label: '商城'
        }
      ],
      imageUrl: null,
      value: '',
      form: {
        title: null,
        type: 'index',
        sort: 0
      }
    }
  },
  methods: {
    async onSubmit() {
      await addSwiper(this.form)
      this.$message.success('添加成功!')
      this.$router.push({
        name: 'swiperAll'
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('上传成功')
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.url = res.url
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
    }
  }
}
</script>
<style>
.avatar {
  max-width: 600px;
}
</style>
