<template>
    <div class="app-container">
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="生成时间" prop="gen_time" align="center"></el-table-column>
                <el-table-column label="时长" prop="duration" align="center"></el-table-column>
                <el-table-column label="有效期" prop="validity_day" align="center"></el-table-column>
                <el-table-column label="生成量" prop="gen_amount" align="center"></el-table-column>
                <el-table-column label="已兑换" prop="used_amount" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                         <el-button size="small"  @click="daochu(scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>导出</b>
                        </el-button>
                        <el-button size="small" type="danger"  @click="dele(scope.row)">
                            删除
                        </el-button>
                        <router-link :to="{ name: '兑换记录', params: { id: scope.row.id}}">兑换记录</router-link>
                    
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
      
 <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page=currentPage  @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    
    </div>
</template>
<script>
import * as sysApi from "../../common/sys";
export default {
    name:'',
    data() {
        return {
            tableData:[{
                gen_time:"",
                gen_amount:"",
                used_amount:"",
            }],
            total:1,
            currentPage:1,
            id:"",
        }
    },
    methods: {
        dele(row){
            var param={"id":row.id};
        sysApi.deleRecord(param)
        .then(data => {
          console.log(data);
             this.$message({
                    type:'success',
                    message:data.info
                    })
            this.init();
        })
        },
        daochu(row){
              
      var param={"id":row.id};
        sysApi.Daochu(param)
        .then(data => {
          if(data.success==true){}
           this.$message({
                    type:'success',
                    message:data.info
                    })
            this.saveAs(data.url,"导出表格")
        })
        },
        saveAs(obj,fileName){
            var tmpa=document.createElement("a");
            tmpa.download=fileName||'下载';
            tmpa.href=obj;
            tmpa.target="view_window";
            tmpa.click();
        },
        init(){
        var param={"page":this.currentPage,"id":this.id};
       console.log(param)
        sysApi.generOrder(param)
        .then(data => {
        this.tableData = data.data;
        this.total =data.total_count;
          console.log(data)
        })
      .catch(err=>console.log('请求异常信息:'+err));
        },
           /** 分页条点击事件 **/
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
        this.init();
      }
    },
    //  mounted(){
    //   this.id=this.$route.params.id;
    //   localStorage.setItem('id',this.$route.params.id);
    // },
    created(){
        if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('Pageid',this.id);
           // var id=parseInt(localStorage.getItem("Pageid"));
        }else{
            this.id=parseInt(localStorage.getItem("Pageid"));
        }
      this.init();
 
    },
   
  
}
</script>
<style>
 .el-form-item {
    margin-bottom: 22px;
  }
  .newGenerate .el-form--label-left .el-form-item__label,.editGenerate .el-form--label-left .el-form-item__label{
    width: 100px!important;
  }
   .newGenerate .el-form-item__content,.editGenerate .el-form-item__content{
    margin-left: 100px!important;
  }

</style>



