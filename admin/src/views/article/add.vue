<template>
  <div class="app-container" style="max-width: 860px">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-switch v-model="form.isShow" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="form.date" type="datetime" placeholder="默认当前时间" />
      </el-form-item>
      <el-form-item label="分类内容">
        <el-input v-model="form.markdown" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAtricle } from '@/api/article'
export default {
  data() {
    return {
      form: {
        title: '',
        isShow: false,
        desc: '',
        date: null
      },
      rules: {
        title: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.form.date == null) {
        this.from.date = new Date()
      }
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          try {
            await addAtricle(this.form)
            this.$message.success('创建成功')
            this.$router.push('/article/all')
          } catch (error) {
            this.$message.error(error.response.data.message)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
