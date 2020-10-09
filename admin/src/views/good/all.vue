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
      <el-table-column label="标题" width="130">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="130">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="划线价格" width="130">
        <template slot-scope="scope">
          {{ scope.row.through_price }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="状态" width="100">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.isShow ? 'danger' : 'primary'"
            @click="update(scope.row)"
          >
            {{ scope.row.isShow | getStatus }}
          </el-button>
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
            @click="removeCategory(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodList, removeGood, updateGood } from '@/api/good'
export default {
  filters: {
    getStatus(status) {
      return status ? '已下架' : '已上架'
    }
  },
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
      const { data } = await getGoodList()
      console.log(data)
      this.list = data.list
      this.listLoading = false
    },
    handleClick(row) {
      console.log(row)
      this.$router.push(`/good/edit/${row._id}`)
    },
    async removeCategory(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            this.listLoading = true
            await removeGood(row._id)
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
    },
    async update(data) {
      this.$confirm(
        `您确定  ${data.isShow ? ' 上架 ' : '下架'} 产品吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async() => {
          const sendData = { ...data }
          sendData.isShow = !data.isShow
          await updateGood(data._id, sendData)
          this.fetchData()
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
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
<style lang="scss">
.app-container {
  /deep/ .cell {
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    max-height: 70px;
  }
}
</style>
