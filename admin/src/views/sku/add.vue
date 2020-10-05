<template>
  <div class="app-container">
    <el-row type="flex">
      <el-col :span="6">
        <el-input
          v-model="attrAddText"
          placeholder="添加属性"
          style="padding-bottom: 20px"
        >
          <el-button
            slot="append"
            type="primary"
            @click="addAttr"
          >添加</el-button>
        </el-input>

        <el-card
          v-for="(item, index) in spec"
          :key="index"
          class="box-card"
          shadow="hover"
          style="marginBottom: 30px"
        >
          <el-row slot="header" align="middle" type="flex">
            <el-col :span="21">
              <span>{{ item.name }} </span>
            </el-col>
            <el-col :span="3">
              <el-button type="text" @click="removeSpec(index)">删除</el-button>
            </el-col>
          </el-row>

          <el-tag
            v-for="(children, i) in item.item"
            :key="i"
            closable
            @close="removeSpecItem(index, i)"
          >
            {{ children.name }}
          </el-tag>

          <el-input
            v-if="item.addinputVisible"
            ref="saveTagInput"
            v-model="item.addText"
            style="width: 90px"
            size="small"
            @keyup.enter.native="handleInputConfirm(index)"
            @blur="handleInputConfirm(index)"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(index)"
          >+ 添加新规格</el-button>
        </el-card>
      </el-col>
      <el-col :span="1" />
      <el-col v-if="sku" :span="17">
        <el-table :data="sku" style="width: 100%">
          <el-table-column prop="name" label="名称" />

          <el-table-column width="100" prop="stock" label="库存" fixed="right">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.stock"
                size="mini"
                clearable
                placeholder="库存"
              />
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="price" label="价格" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                size="mini"
                clearable
                placeholder="价格"
              />
            </template>
          </el-table-column>
        </el-table>

        <el-card style="margin-top: 20px" shadow="hover">
          <el-row type="flex" align="middle">
            <el-col :span="16">批量设置</el-col>
            <el-col :span="8">
              <el-input v-model="batchNum" size="mini" placeholder="请输入内容">
                <el-select
                  slot="prepend"
                  v-model="batchType"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="库存" value="stock" />
                  <el-option label="价格" value="price" />
                </el-select>
                <el-button
                  slot="append"
                  type="primary"
                  @click="batchSetting"
                >设置</el-button>
              </el-input>
            </el-col>
          </el-row>
          <div style="el-flex">
            <el-button
              type="primary"
              @click="batchSetting"
            >确认添加</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getCategory } from '@/api/category'
export default {
  data() {
    return {
      batchNum: 0,
      batchType: 'stock',
      attrAddText: null,
      inputVisible: false,
      spec: [
        {
          name: '颜色',
          addText: null,
          addinputVisible: false,
          item: [
            {
              name: '黑'
            },
            {
              name: '红'
            }
          ]
        },
        {
          name: '内存',
          addText: null,
          addinputVisible: false,
          item: [
            {
              name: '16G'
            },
            {
              name: '32G'
            }
          ]
        },
        {
          name: '运营商',
          addText: null,
          addinputVisible: false,
          item: [{ name: '电信' }, { name: '移动' }, { name: '联通' }]
        }
      ],
      addText: null,
      isLoading: false,
      form: {
        title: ''
      },
      imageUrl: '',
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      category: []
    }
  },
  computed: {
    sku: {
      get() {
        const spec = this.spec.map(x => {
          return x.item.map(xx => xx.name)
        })
        return this.createSku(spec)
      },
      set() {

      }
    }
  },
  methods: {
    addAttr() {
      if (this.attrAddText == '' || this.attrAddText == null) return
      if (this.spec.findIndex(item => item.name === this.attrAddText) === -1) {
        this.spec.push({
          name: this.attrAddText,
          addText: null,
          addinputVisible: false,
          item: []
        })
        this.$message.success('添加成功!')
      } else {
        this.$message.error('已有此属性,请勿重复添加!')
      }
      this.attrAddText = null
    },
    handleInputConfirm(e) {
      if (
        this.spec[e].addText !== null &&
        this.spec[e].item.findIndex(
          item => item.name === this.spec[e].addText
        ) === -1
      ) {
        // 数组中没有这个规格
        this.spec[e].item.push({
          name: this.spec[e].addText
        })
        this.spec[e].addText = null
      } else {
        this.spec[e].addText = null
        this.$message.error('添加错误,请输入有效值或规格不能重复')
      }

      this.spec[e].addinputVisible = false
    },
    showInput(e) {
      this.spec[e].addinputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },
    removeSpec(index) {
      /* @params { index } Number | String 属性下标 */
      this.spec.splice(index, 1)
    },
    removeSpecItem(index, i) {
      // 删除 一个 规格
      /* @params { index } Number | String 属性下标
      /* @params { i } Number | String 规格下标
      */
      console.log(index, i)
      this.spec[index].item.splice(i, 1)
    },
    createSku(args) {
      const reslut = []
      const nextPush = (index, prev) => {
        // prev 下一次遍历
        const isLasted = index === args.length - 1 // 最后一项
        const arg = args[index]

        arg.forEach(item => {
          const cur = [...prev, item]
          if (isLasted) {
            // 如果已是最后一项
            reslut.push({ name: cur.toString(), price: 0, stock: 0 })
          } else {
            // 否则继续遍历下一项
            nextPush(index + 1, cur)
          }
        })
      }
      nextPush(0, [])
      console.log(reslut)
      return reslut
    },
    batchSetting() {
      console.log(this.batchNum)
      console.log(this.batchType)
      console.log(this.sku)
      this.sku = this.sku.map(x => {
        x[this.batchType] = this.batchNum
        return x
      })
    }
  }
}
</script>
<style lang="scss">
.avatar {
  width: 148px;
  height: auto;
}
.spec-wrap {
  .spec-attr {
    border: 1px solid #333;
    display: inline-block;
    width: 220px;
    width: 100%;
  }
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
