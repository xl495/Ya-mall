<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            @click="handleClick(scope.row)"
          >编辑</el-button>
          <el-button
            size="small"
            type="text"
            @click="removeSku(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodAttr, removeGoodAttr } from '@/api/good'
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data } = await getGoodAttr()
      this.list = data.list
      this.listLoading = false
    },
    handleClick(row) {
      console.log(row)
    },
    async removeSku(row) {
      this.$confirm('是否要删除这个规格?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            this.listLoading = true
            await removeGoodAttr(row._id)
            this.listLoading = false
            this.fetchData()
            this.$message.success('删除成功!')
          } catch (error) {
            this.$message.error('删除失败!')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
