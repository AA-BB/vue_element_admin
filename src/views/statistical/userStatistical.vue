<template>
    <div class="userstatistical">
        <ul class="headurl">
            <li>
                <p>注册用户总数</p>
                <p>{{list.total_register_count}}</p>
            </li>
            <li>
                <p>付费用户总数</p>
                <p>{{list.total_paid_count}}</p>
            </li>
            <li>
                <p>禁用用户</p>
                <p>{{list.total_disabled_count}}</p>
            </li>
            <li>
                <p>绑定手机用户</p>
                <p>{{list.total_bind_phone_count}}</p>
            </li>
            <!-- <li>
                <p>绑定QQ</p>
                <p>{{list.total_bind_qq}}</p>
            </li> -->
            <li>
                <p>绑定邮箱</p>
                <p>{{list.total_bind_email}}</p>
            </li>
        </ul>
        <!-- tab -->
            <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                        <el-form-item label="日期">
<div class="block">
<el-date-picker
v-model="form.date"
type="datetimerange"
range-separator="至"
start-placeholder="开始日期"
end-placeholder="结束日期"    @change="onPick" format="yyyy 年 MM 月 dd 日">
</el-date-picker>
</div>
</el-form-item>
                 <el-form-item>
                        <el-button type="primary" @click="exportToExcel()">导出Excel</el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-table ref="multipleTable" :data="tableData3"  tooltip-effect="dark" border  style="width: 97.7%;margin-top:10px">
    <el-table-column label="日期" prop='date_time'>
    </el-table-column>
    <el-table-column  prop="register_count"  label="新增注册用户"></el-table-column>
    <el-table-column  prop="register_rate" label="注册用户新增率" show-overflow-tooltip></el-table-column>
    <el-table-column  prop="paid_count"   label="新增付费用户"  show-overflow-tooltip></el-table-column>
    <el-table-column  prop="paid_rate" label="付费用户新增率" show-overflow-tooltip></el-table-column>
  </el-table>
   <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
  </div>
</template>
<script>
import * as sysApi from "../../common/sys";
import { export_json_to_excel } from "../../vendor/Export2Excel";
import {formatDate} from "../../common/utils";
export default {
     data() {
      return {
    
      form:{
          date:formatDate(new Date(),'yyyy-MM-dd'),
                starttime:"",
                endtime:"",
      },
      tableData3: [{
           date_time:"",
          register_count:"",
          register_rate:"",
          paid_count:"",
          paid_rate:""
      }
         
      ],
      total:2,
      currentPage:1,
      list:{
        total_bind_email:"",
        total_bind_phone_count:"",
        total_bind_qq:"",
        total_disabled_count:"",
        total_paid_count:"",
        total_register_count:""
      }
    }
},
    methods:{
         exportToExcel() {
            require.ensure([], () => {
                const tHeader = ['日期','新增注册用户','注册用户新增率','新增付费用户','付费用户新增率'];
                const filterVal = ['date_time','register_count',"userRegUserRate",'paid_count','userFeiUserRate'];
                const list = this.tableData3;
                const data = this.formatJson(filterVal,list);
                export_json_to_excel(tHeader, data, '列表excel');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
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
         
         var params={"start_time":this.form.starttime,"end_time":this.form.endtime,"page":1}
       sysApi.memberStatislist(params)
            .then(res => {
              this.tableData3 = res.data;
              this.total =res.total_count;
              console.log(res)
          })
      .catch(err => console.log('请求异常信息:' + err));
      },
       handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
          var param={"start_time":this.form.starttime,"end_time":this.form.endtime,"page":this.currentPage}
         sysApi.memberStatislist(param)
        .then(data => {
          this.tableData3 = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created(){
        sysApi.memberStatis()
            .then(res => {
                  this.list.total_bind_email=res.data.total_bind_email;
                  this.list.total_bind_phone_count=res.data.total_bind_phone_count;
                  this.list.total_bind_qq=res.data.total_bind_qq;
                  this.list.total_disabled_count=res.data.total_disabled_count;
                  this.list.total_paid_count=res.data.total_paid_count;
                  this.list.total_register_count=res.data.total_register_count;
                    console.log(res);
          })
      .catch(err => console.log('请求异常信息:' + err));
          // 列表
     var params={"start_time":this.form.starttime,"end_time":this.form.endtime,"page":this.currentPage}
      console.log(params)
       sysApi.memberStatislist(params)
            .then(res => {
              this.tableData3 = res.data;
              this.total =res.total_count;
              console.log(res)
          })
      .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style>
.headurl{
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    overflow: hidden;
}
.el-col{margin-bottom: 10px;}
.headurl li{
    flex: 2;
    list-style: none;
    padding:10px 0;
    background: #fff;
    border-right: 1px solid #eee

}
.headurl li p{
    text-align: center;
    line-height: 35px;
}
.headurl li p:nth-child(1){
    color: #409EFF;
}
.demonstration{
    background: #409EFF;
    display: inline-block;
    width: 80px;
    height:38px;
    line-height: 38px;
    border-radius: 5px;
    margin-right: 5px;
    text-align: center;
    color: #fff;
}
.el-form-item__label{
    text-align: left;
    width:auto!important;
}
.el-form--inline{
    margin:10px 0
}
</style>


