/* eslint-disable vue/require-default-prop */
<template>
  <div class="app-container" style="max-width: 860px">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="分类名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-switch v-model="form.isShow" />
      </el-form-item>
      <el-form-item label="分类描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCategory, editCategory, getCategoryDetails } from '@/api/category'
export default {
  props: {
    id: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      form: {
        title: '',
        isShow: false,
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入名称描述', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id && this.fetchData()
  },
  methods: {
    async fetchData() {
      const data = await getCategoryDetails(this.id)
      console.log(data)
      this.form = data.data
    },
    async onSubmit() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          try {
            this.id ? await editCategory(this.id, this.form) : await addCategory(this.form)
            this.$message.success(`${this.id ? '编辑' : '创建'} 成功`)
            this.$router.push('/category/all')
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
