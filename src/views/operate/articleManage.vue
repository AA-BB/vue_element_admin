<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="文章类型">
                        <el-select v-model="form.value"  v-on:change="TypeSelect($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                     <template v-if="form.value=='帮助中心'">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.payment"  v-on:change="ArticleSelect($event)">
                            <el-option v-for="item in payments" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                     </template>
                      <template v-else>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.payment"  v-on:change="ArticleSelect($event)" disabled>
                            <el-option v-for="item in payments" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                     </template>
                     <el-form-item label="日期">
                        <div class="block">
                                <el-date-picker
                                v-model="form.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"   @change="onPick" format="yyyy 年 MM 月 dd 日">
                                </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入文章名、文章ID" style="width: 250px"></el-input>
                    </el-form-item>
                     <template v-if="form.searchKey==''">
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search"  @click="search()" disabled></el-button>
                    </el-form-item>
                     </template>
                     <template v-else>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search"  @click="search()"></el-button>
                    </el-form-item>
                     </template>
                     
              <router-link to="/articleAdd"><el-button type="primary" size="medium">
              <i class="el-icon-circle-plus"></i>&nbsp;添加文章 </el-button></router-link>
              
           
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="文章ID" prop="article_id" align="center"></el-table-column>
                <el-table-column label="排序" prop="article_sort" align="center"></el-table-column>
                <el-table-column label="审核人" prop="approval_account" align="center"></el-table-column>
                <el-table-column label="发布人" prop="user_name" align="center"></el-table-column>
                <el-table-column label="状态" prop="article_status" align="center"></el-table-column>
                <el-table-column label="文章类型" prop="article_type" align="center"></el-table-column>
                <el-table-column label="文章分类" prop="article_class" align="center"></el-table-column>
                <el-table-column label="文章名" prop="article_name" align="center"></el-table-column>
                <el-table-column label="发布时间" prop="issue_time" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" @click="handleEdit(scope.row)">{{scope.row.article_status=="待审核"?"审核":""}}</el-button> -->
                        <template v-if="scope.row.article_status=='待审核'&&(admin_name==scope.row.approval_account || admin_name=='admin')">
                        <router-link :to="{ name: '审核文章', params: { id: scope.row.id }}">审核文章</router-link>
                        </template>
                        <template v-if="(scope.row.article_type=='帮助中心'&&scope.row.article_status!=='待审核')||scope.row.article_status=='等待发布'||scope.row.article_status=='审核未通过'">
                            <router-link :to="{name:'文章编辑',params: {id:scope.row.id,status:scope.row.article_status}}"> <el-button size="small">
                            <i class="el-icon-edit-outline"></i> <b>编辑</b></el-button></router-link>
                        </template>
                       <router-link :to="{name:'查看文章',params: {id:scope.row.id}}"> <el-button size="small" type="info">
                           <b>查看 </b></el-button></router-link>
                        <el-button size="small" type="danger" @click="deleteBtn(scope.row)">
                            删除
                        </el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        <!-- 查看详细 -->
        <el-dialog title="订单详细" :visible.sync="isShowDetail" center width="30%">
            <div>混子</div>
        </el-dialog>
         <!--删除文章-->
      <el-dialog
        title="停用管理员"
        :visible.sync="deleManage"
        width="30%"
        center>
        <div class="tooltips">确认删除文章?</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleManage = false">取 消</el-button>
          <el-button type="primary" @click="deleokBtn()">確定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
 import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
    data() {
        return {
            tableData: [{
                article_id: "454545454",
                article_sort: "待付款",
                approval_account:"",
                user_name:"",
                article_class: "1212131313",
                article_type: "133111111",
                article_class: "¥30",
                article_name: "微信",
                issue_time: "2018.08.23  12:20:20"
            }],
            form: {
                searchKey: '',
                value: '',
                payment: '',
                commodity:'会员季度卡',
                date:"",
                starttime:"",
                endtime:"",
            },
            total:1,
            value:[{
                label:"全部",
                statusId:"1"
            },{
                label:"官方公告",
                statusId:"2"
            },{
                label:"游戏资讯",
                statusId:"3"
            },{
                label:"帮助中心",
                statusId:"4"
            }],
            
            currentPage:1,
            isReadOnly:false,
            isShowDetail: false,
            payments: [{
                id: 1,
                name: '全部'
            },{
                id: 2,
                name: '新手上路'
            },{
                id: 3,
                name: '游戏故障'
            },{
                id: 4,
                name: 'PC客户端'
            },{
                id: 5,
                name: '其他'
            }],
            status: [
                {
                    statusId: 1,
                    label: '全部'
                },
                {
                    statusId: 2,
                    label: '官方公告'
                },
                {
                    statusId: 3,
                    label: '游戏资讯'
                },
                {
                    statusId: 4,
                    label: '帮助中心'
                }
            ],
            commodity: [
               {
                id: 1,
                name: '会员月度卡'
            },{
                id: 2,
                name: '会员季度卡'
            },{
                id: 3,
                name: '会员半年卡'
            },{
                id: 4,
                name: '会员年度卡'
            }
            ],
            rowId:"",
            deleManage:false,
            admin_name:''
        }
    },
    methods: {
        deleteBtn(row){
            this.rowId=row.id;
            this.deleManage=true;
        },
        deleokBtn(){
            var param={"id":parseInt(this.rowId)}
         sysApi.deleArticle(param)
        .then(data => {
            if(data.success==true){
                this.deleManage=false;
                this.$message({
                    type:"success",
                    message:data.info
                })
                 var param={"article_type":this.form.value,"page":1,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
      sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
            }
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
        handleEdit(row) {
            this.isShowDetail = true;
        },
        search(){
              var param={"article_type":this.form.value,"page":1,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
         sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
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
        var param={"article_type":this.form.value,"page":1,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
      sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
        TypeSelect(event){
            if(event=="全部"){
                this.form.value=""
            }else{
                this.form.value=event
            }
              var param={"article_type":this.form.value,"page":1,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
      sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
        ArticleSelect(event){
             if(event=="全部"){
                this.form.payment=""
            }else{
                this.form.payment=event
            }
              var param={"article_type":this.form.value,"page":1,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
      sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
        handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
      var param={"article_type":this.form.value,"page":this.currentPage,"article_class":this.form.payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
         sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created(){
    this.admin_name=localStorage.getItem("admin_name");
      var param={"article_type":"","page":this.currentPage,"article_class":"","start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,}
      sysApi.articleManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style>
.el-button--small{
    margin-right: 10px;
}
</style>



