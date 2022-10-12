<template>
  <div class="nav">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          class="sidebar-el-menu"
          @select="selectUrl"
          :default-active="onRoutes"
          unique-opened
          router
          active-text-color="#276BFF">
          <template v-for="item in items">
            <template>
              <el-menu-item :index="item.pageUrl" :key="item.pageUrl">
                <i :class="item.icon"></i><span slot="title">{{ item.pageName }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    data() {
      return {
        ruleId: null,
        items: [{
          ruleId: 1,
          pageName: '用户列表',
          pageUrl: '/demo/User'
        }, {
          pageName: '今日计划',
          pageUrl: '/demo/DailyPlan'
        }],
      }
    },
    computed: {
      onRoutes() {
        return this.$route.meta.fatherPath ||  this.$route.path
      }
    },
    mounted() {
      this.ruleId = sessionStorage.getItem('ruleId')
      if(this.ruleId != 1) this.items = this.items.filter(el => el.ruleId != 1)
      let div = document.getElementsByClassName('mask_div')
      for(let i = div.length - 1; i >= 0; i--) {
        div[i].parentNode.removeChild(div[i])
      }
    },
    methods: {
      selectUrl(index) {
        this.$router.push(index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  .tac {
    width: 100%;
    height: 100%;
    .el-col {
      width: 100%;
      height: 100%;
      .el-menu {
        width: 100%;
        height: 100%;
        border: 0px;
        background-color: azure;
        .el-menu-item {
          >span{
            font-size: 14px;
          }
        }
        >.is-active {
          margin-left: 3px;
          border-left: 3px solid #8d9797;
          background-color: #ccd5d5;
        }
      }
    }
  }
}
</style>
