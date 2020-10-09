<template>
  <div class="app-container">
    预览
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in list.list" :key="item._id">
        <img :src="item.url">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSwiperList } from '@/api/swiper'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const { data } = await getSwiperList()
      this.list = data
      console.log(this.list)
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
