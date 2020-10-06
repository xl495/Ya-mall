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
          v-for="(item, index) in specAttr"
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
          <el-table-column prop="name" label="规格名称" />

          <el-table-column width="150" prop="stock" label="库存" fixed="right">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.stock"
                size="mini"
                clearable
                placeholder="留空为无限库存"
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
          <div class="submit">
            <el-button
              type="primary"
              size="mini"
              @click="preview"
            >预览</el-button>

            <el-input
              v-model="form.name"
              placeholder="规格标题"
              style="200px"
              size="mini"
            >
              <el-button
                slot="append"
                type="primary"
                size="mini"
                @click="submit"
              >确认添加</el-button>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="规格预览" :visible.sync="dialogTableVisible">
      <div class="sku-wrap">
        <div v-for="(item, index) in previewSku" :key="index" class="sku">
          <div class="sku-attr">
            <div class="sku-attr__title">
              {{ item.name }}
            </div>
          </div>
          <div class="sku-content">
            <el-radio-group
              v-model="item.check"
              size="mini"
              @change="skuSelected"
            >
              <el-radio-button
                v-for="(items, i) in item.item"
                :key="i"
                :disabled="items.disabled"
                :label="i"
              >
                {{ items.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="sku-minor">
        <div class="sku-minor__title">已选规格： {{ skuSelectedText }}</div>
        <div class="sku-minor__title">已选库存： {{ skuSelectedStock }}</div>
        <div class="sku-minor__title">已选价格： {{ skuSelectedPrice }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addGoodAttr, addGoodSpec } from '@/api/good'
export default {
  data() {
    return {
      batchNum: 0,
      batchType: 'stock',
      attrAddText: null,
      inputVisible: false,
      dialogTableVisible: false, // 预览
      specAttr: [
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
      previewSku: [],
      addText: null,
      isLoading: false,
      imageUrl: '',
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      category: [],
      skuSelectedText: null, // 已选规格
      skuSelectedStock: null, // 已选规格库存
      skuSelectedPrice: null, // 已选规格价格
      form: {
        name: null
      }
    }
  },
  computed: {
    sku: {
      get() {
        const specAttr = this.specAttr.map(x => {
          return x.item.map(xx => xx.name)
        })
        return this.createSku(specAttr)
      },
      set() {}
    }
  },
  methods: {
    addAttr() {
      if (this.attrAddText === '' || this.attrAddText === null) return
      if (this.specAttr.findIndex(item => item.name === this.attrAddText) === -1) {
        this.specAttr.push({
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
        this.specAttr[e].addText !== null &&
        this.specAttr[e].item.findIndex(
          item => item.name === this.specAttr[e].addText
        ) === -1
      ) {
        // 数组中没有这个规格
        this.specAttr[e].item.push({
          name: this.specAttr[e].addText
        })
        this.specAttr[e].addText = null
      } else {
        this.specAttr[e].addText = null
        this.$message.error('添加错误,请输入有效值或规格不能重复')
      }

      this.specAttr[e].addinputVisible = false
    },
    showInput(e) {
      this.specAttr[e].addinputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },
    removeSpec(index) {
      /* @params { index } Number | String 属性下标 */
      this.specAttr.splice(index, 1)
    },
    removeSpecItem(index, i) {
      // 删除 一个 规格
      /* @params { index } Number | String 属性下标
      /* @params { i } Number | String 规格下标
      */
      this.specAttr[index].item.splice(i, 1)
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
            reslut.push({ name: cur.toString(), price: 0, stock: null })
          } else {
            // 否则继续遍历下一项
            nextPush(index + 1, cur)
          }
        })
      }
      nextPush(0, [])
      return reslut
    },
    batchSetting() {
      this.sku = this.sku.map(x => {
        x[this.batchType] = this.batchNum
        return x
      })
    },
    preview() {
      // 预览
      const arr = this.specAttr.map(item => {
        item.check = 0
        item.item.map(items => {
          items.disabled = items.stock === null
          return items
        })
        return item
      })
      this.previewSku = JSON.parse(JSON.stringify(arr))

      // 预览 已选规格
      this.skuSelected()
      this.dialogTableVisible = true
    },
    skuSelected() {
      const ised = []
      this.previewSku.forEach(item => {
        ised.push(item.item[item.check].name)
      })
      const text = ised.toString() // 已选规格
      this.sku.forEach(item => {
        if (item.name === text) {
          this.skuSelectedStock = item.stock === null ? '无限库存' : item.stock
          this.skuSelectedPrice = item.price
        }
      })
      this.skuSelectedText = text
    },
    async submit() {
      try {
        const { data } = await addGoodSpec({ spec: this.sku })
        await addGoodAttr({
          name: this.form.name,
          spec: data._id,
          attribute: this.specAttr
        })

        this.$message.success('添加成功')

        this.$router.push('/sku/all')
      } catch (error) {
        console.log(error)
      }
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
.submit {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 0;
  /deep/ .el-input {
    max-width: 180px;
    margin-left: 20px;
  }
}

.sku {
  &-attr {
    padding: 10px 0 20px;
    &__title {
      color: #666;
    }
  }
  &-minor {
    &__title {
      padding: 10px 0;
    }
  }
}
</style>
