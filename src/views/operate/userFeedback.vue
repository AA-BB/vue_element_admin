<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="反馈来源">
                        <el-select v-model="form.value"  v-on:change="back($event)">
                            <el-option v-for="item in feedback" :key="item.Id" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status"  v-on:change="selectStatus($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="日期">
                        <div class="block">
                                <el-date-picker
                                v-model="form.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"  @change="onPick" format="yyyy 年 MM 月 dd 日">
                                </el-date-picker>
                        </div>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="用户名" prop="user_name" align="center"></el-table-column>
                <el-table-column label="网络状态" prop="net_status" align="center"></el-table-column>
                <el-table-column label="节点" prop="node_name" align="center"></el-table-column>
                <el-table-column label="状态" prop="feedback_status" align="center"></el-table-column>
                <el-table-column label="用户Ip" prop="user_ip" align="center"></el-table-column>
                <el-table-column label="重传率" prop="retry_rate" align="center"></el-table-column>
                 <el-table-column label="反馈来源" prop="source" align="center"></el-table-column>
                <el-table-column label="问题描述" prop="content" align="center" class="miaoshu"></el-table-column>
                <el-table-column label="提交时间" prop="submit_time" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="280">
                    <template slot-scope="scope">
                        <el-button size="small"  @click="desBtn(scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>详情</b>
                        </el-button>
                        <template v-if="scope.row.feedback_status=='未处理'">
                        <el-button size="small" type="danger" @click="handleEdit(scope.row)">处理</el-button>
                        </template>
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>   <!--分页条-->
         <!-- 详情 -->
      <el-dialog
        title="问题详情"
        :visible.sync="questionVisible"
        width="30%"
        center>
        <div class="tooltips">
            <el-form label-width="80px" label-position="left" :model="dataDes">
                <el-form-item label="问题描述">
                    <el-input v-model="dataDes.content" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="questionVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        <!-- 查看详细 -->
        <el-dialog title="订单详细" :visible.sync="isShowDetail" center width="30%">
            <div>混子</div>
        </el-dialog>
    </div>
</template>
<script>
 import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
    data() {
        return {
            form: {
                value: '',
                status: '',
                date:"",
                starttime:"",
                endtime:"",
            },
            total:1,
            currentPage:1,
            tableData: [],
            dataDes:{
                content:""
            },
            isReadOnly:false,
            isShowDetail: false,
            questionVisible:false,
            status: [
                {
                    statusId: 1,
                    label: '全部'
                },
                {
                    statusId: 2,
                    label: '未处理'
                },
                {
                    statusId: 3,
                    label: '已处理'
                }
            ],
            backValue:"",
            Userstatus:"",
            feedback:[
                {id:1,value:"全部"},{id:2,value:"官网"},{id:3,value:"加速器客户端"}
            ],
         
        }
    },
    methods: {
        onPick(val){
             if(val==null){
                 var start_time="";
                var end_time="";
            }else{
                
          var start_time=formatDate(val[0],'yyyy-MM-dd');
          var end_time=formatDate(val[1],'yyyy-MM-dd');
            }
          this.form.starttime=start_time;
          this.form.endtime=end_time;
             var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": 1//页数
            }
             var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": 1//页数
            }

      sysApi.userBack(param)
        .then(data => {
            this.tableData=data.data;
            this.total=data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      back(event){
          if(event=='全部'){
              this.form.value="全部"
                this.backValue=""
          }else{
              this.form.value=event;
               this.backValue=event
          }
            var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": 1//页数
            }

      sysApi.userBack(param)
        .then(data => {
            this.tableData=data.data;
            this.total=data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
    //   处理
    handleEdit(row){
        var param={
            "id":row.id// 反馈id 
        }
         sysApi.userBackDo(param)
        .then(data => {
            if(data.success==true){
                this.$message({
                    type:"success",
                    message:data.info
                })
                row.feedback_status="已处理"
            }
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
    },
    selectStatus(event){
         if(event=='全部'){
              this.form.status="全部"
                this.Userstatus=""
          }else{
              this.form.status=event;
               this.Userstatus=event
          }
              var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": 1//页数
            }

      sysApi.userBack(param)
        .then(data => {
            this.tableData=data.data;
            this.total=data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
    },
      handleCurrentChange(val){
          this.currentPage = parseInt(`${val}`);
           var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": this.currentPage//页数
            }

      sysApi.userBack(param)
        .then(data => {
            this.tableData=data.data;
            this.total=data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
        // desBtn(row) {
        //     this.dataDes=Object.assign({},row,true)
        //     this.questionVisible = true;
        // },
         desBtn(row) {
        this.$alert(row.content, '详情', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
    },
    created(){
          var param={
                "start_time":this.form.starttime,//开始时间
                "end_time":this.form.endtime, //结束时间
                "source":this.backValue,//来源
                "status":this.Userstatus,//状态
                "page": this.currentPage//页数
            }

      sysApi.userBack(param)
        .then(data => {
            this.tableData=data.data;
            this.total=data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style>
td.el-table_1_column_8  .cell{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
        word-break:none;
}
.el-message-box__message p{
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;

}
</style>



