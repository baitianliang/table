<template>
    <div id="Page">
        <el-container>
            <el-header>
                <Head></Head>
            </el-header>
            <el-main>
                <el-aside>
                    <Nav></Nav>
                </el-aside>
                <div class="main">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Page',
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    }
}
</script>

<style lang="scss">
#Page {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    padding: 0px 20px;
    box-shadow: 0px 2px 6px 0px rgba(0, 21, 41, 0.12);
    z-index: 9;
    background-color: floralwhite;
    // background-color: white;
  }
  .el-main {
      display: flex;
      padding: 0px;
      height: calc(100% - 60px);
      .el-aside {
          height: 100%;
      }
      .main {
          height: calc(100% - 20px);
          margin: 10px 10px;
          padding: 30px 20px;
          border-radius: 20px;
          // width: 100%;
          width: calc(100% - 60px);
          background-color: #fff;
          overflow: hidden;
          >div {
            height: 100%;
            overflow: auto;
          }
      }
  }

  .el-dialog {
    .el-dialog__header {
      margin: 0 20px 10px 20px;
      border-bottom: 1px solid #d1dbe5;
    }
    .el-dialog__title {
      font-size: 18px;
      font-weight: 700;
    }
    .el-dialog__body {
      padding: 20px;
      max-height: 550px;
      overflow: auto;
      .el-divider {
        margin-bottom: 40px;
      }
    }
  }
}
</style>
