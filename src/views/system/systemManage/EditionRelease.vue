<template>
  <div class="info">
    <!--操作-->
    <div class="info-operating">
      <el-form :inline="true">
        <el-form-item>
            <el-button type="primary" size="medium" @click="addManageBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              添加新版本
            </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--数据-->
    <div class="info-main">
      <!--数据-表格-->
      <el-table :data="list" style="width: 100%" stripe> 
        <el-table-column prop="id" label="编号" align="center">
          <!-- vue+elementUI表格组件显示图片
          <template slot-scope="scope">
            <img :src="scope.row.photoUrl" style="width: 50px;height:20px">
          </template> -->
        </el-table-column>
        <el-table-column prop="version_status" label="状态" align="center"></el-table-column>
        <el-table-column prop="version_number" label="版本号" align="center"></el-table-column>
         <el-table-column prop="client_type" label="客户端类型" align="center"></el-table-column>
          <el-table-column prop="channel_name" label="渠道商" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="issue_time" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="desc" label="版本说明" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column  :width="350" label="操作" align="center">
          <template slot-scope="scope">
             <!-- <el-button  type="primary" size="small"  @click="changeBtn(scope.$index,scope.row)">
                <i class="el-icon-edit-outline"></i> <b>修改</b>
              </el-button> -->
             <el-button size="small" type="danger" @click="downloadeBtn(scope.row)">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改版本"
        :visible.sync="changeVisible"
        width="40%"
        >
        <el-form label-width="80px" label-position="left" :model="changeform" class="editform1">
          <el-form-item label="版本号">
            <el-input v-model="changeform.version_number"></el-input>
          </el-form-item>
          <el-form-item label="客户端类型">
             <el-select v-model="changeform.client_type" v-on:change="goodsSelect($event)">
                <el-option v-for="item in client_type" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="渠道商选择" v-show="changeform.client_type=='个人版客户端exe'">
             <el-select v-model="changeform.channel_number" v-on:change="qudaoSelect($event)">
                <el-option v-for="item in qudao_type" :key="item.Id" :label="item.name" :value="item.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自动发布时间">
                    <el-date-picker
                        v-model="changeform.issue_time"
                        type="datetime"
                        placeholder="发布日期"   @change="onPick" value-format='yyyy-MM-dd HH:mm:ss'>
                    </el-date-picker>
          </el-form-item>
          <el-form-item label="版本说明">
            <el-input v-model="changeform.desc"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="changeform.remark"></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload :action="uploadSys" :limit=1  :before-upload="newFile" :http-request="upload" v-model="changeform.file_name">
                    <el-button type="primary" size="small">点击上传</el-button>
             </el-upload>
          </el-form-item>
        </el-form>
       
        <div slot="footer" class="edit-footer">
          <el-button @click="changeVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd()">保 存</el-button>
        </div>
      </el-dialog>
      <!--添加管理员-->
      <el-dialog
        title="发布新版本"
        :visible.sync="addVisible" 
        width="40%"
        >
        <el-form label-width="120px" label-position="left" :model="addEdition">
           <el-form-item label="版本号">
            <el-input v-model="addEdition.version_number"></el-input>
          </el-form-item>
          <el-form-item label="客户端类型">
             <el-select v-model="addEdition.client_type" v-on:change="goodsSelect($event)">
                <el-option v-for="item in client_type" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道商选择" v-show="addEdition.client_type=='个人版客户端exe'">
             <el-select v-model="addEdition.channel_number"  v-on:change="qudaoSelect($event)">
                <el-option v-for="item in qudao_type" :key="item.Id" :label="item.name" :value="item.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自动发布时间">
                    <el-date-picker
                        v-model="addEdition.issue_time"
                        type="datetime"
                        placeholder="发布日期"  @change="onPick" value-format='yyyy-MM-dd HH:mm:ss'>
                    </el-date-picker>
          </el-form-item>
          <el-form-item label="版本说明">
            <el-input v-model="addEdition.desc"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addEdition.remark"></el-input>
          </el-form-item>
           <el-form-item label="上传文件">
            <el-upload :action="uploadSys" :limit=1  :before-upload="newFile" :http-request="upload" v-model="addEdition.file_name">
                    <el-button type="primary" size="small">点击上传</el-button>
             </el-upload>
          </el-form-item>
        </el-form>
       
        <div slot="footer" class="edit-footer">
          <el-button @click="cancelManage()">取 消</el-button>
          <el-button type="primary" @click="addRelease()">保 存</el-button>
        </div>
      </el-dialog>
      <!--删除按钮-->
      <el-dialog
        title="提示"
        :visible.sync="releaseVisible"
        width="30%"
        center>
        <div class="tooltips">是否确定发布 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="releaseVisible = false">取 消</el-button>
          <el-button type="primary" @click="releaseRow()">确 定</el-button>
        </span>
      </el-dialog>
      <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1" @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>

</template>

<script>

import * as sysApi from "../../../common/sys";
import { getToken } from "../../../utils/auth";
  import {formatDate} from "../../../common/utils";
  import axios from "../../../common/axios.js";
  export default {
    data() {
      return {
        uploadSys:'http://fileserver.js.ispeed.cn'+'/api/v1/file/upload',
        //uploadSys:axios.defaults.baseURL+'/api/v1/version/upload',
        releaseVisible: false,        //模态框可视化
        currentPage: 1,              //当前页
        total: 1,                    //总条数
        changeVisible:false,
        addVisible:false,
        total:1,
        fileList:[],
        fileData: {},
        file_id:"",
         qudao_type:[],
        client_type:[
            // {
            //   name:'个人版客户端exe',
            //   id:'1'
            // },{
            //   name:'个人版客户端zip',
            //   id:'2'
            // },{
            //   name:'网吧包月版客户端exe',
            //   id:'3'
            // },{
            //   name:'网吧包月版客户端zip',
            //   id:'4'
            // },{
            //   name:'网吧扫码版客户端exe',
            //   id:'5'
            // },{
            //   name:'网吧扫码版客户端zip',
            //   id:'6'
            // },{
            //   name:'网吧包月版客户端7z',
            //   id:'7'
            // },{
            //   name:'网吧扫码版客户端7z',
            //   id:'8'
            // }
            {
              name:'个人版客户端exe',
              id:'1'
            },{
              name:'zip',
              id:'2'
            },{
              name:'7z',
              id:'3'
            }
          ],
        addEdition: {
          channel_number:'',
          client_type:"",
          download_url:"",
          version_number: "",
         issue_time: "",
            desc: "",
            remark: "",
            file_name:""
          //账号
        },
       
        form:{
          starttime:"",
          client_type:'个人版客户端'
        },
         changeform: {
            client_type:[
            {
              name:'个人版客户端exe',
              id:'1'
            },{
              name:'个人版客户端zip',
              id:'2'
            },{
              name:'网吧包月版客户端exe',
              id:'3'
            },{
              name:'网吧包月版客户端zip',
              id:'4'
            },{
              name:'网吧扫码版客户端exe',
              id:'5'
            },{
              name:'网吧扫码版客户端zip',
              id:'6'
            }
          ],
          channel_number:'',
           download_url:"",
          version_number: "",
         issue_time:"",
            desc: "",
            remark: "",
            file_name:"",
            file_id:""          //当前点击行index值
        },
        qudao:false,
        qudaobao:1,
        currentPage:1,
        rowId:1,
        //佛文当前页数据
        list: []
      }
    },
    methods: {
      cancelManage(){
        this.addVisible = false;
    this.addEdition.version_number="",//版本编号
    this.form.starttime="",//发布时间
    this.addEdition.desc="",//描述
    this.addEdition.remark="",//备注
    this.addEdition.client_type="",
    this.file_id="",//文件id，上传文件以后返回的file_id
    this.addEdition.channel_number=""
      },
      goodsSelect(event){
        this.addEdition.client_type=event;
        // if(event!=="个人版客户端exe"){
        //   this.addEdition.channel_number='';
        //   this.changeform.channel_number='';
        // }

      },
      qudaoSelect(event){
        //alert(event)
        this.addEdition.channel_number=event;
      },
      upload(content){
         let formData = new FormData();
        //  if(this.addEdition.client_type=="网吧包月版客户端zip" || this.addEdition.client_type=="网吧包月版客户端7z"){
        //     this.qudaobao=1
        //  }else if(this.addEdition.client_type=="网吧扫码版客户端zip" || this.addEdition.client_type=="网吧扫码版客户端7z"){
        //    this.qudaobao=2
        //  }
        formData.append("file",content.file);
        //formData.append("client_type",parseInt(this.qudaobao));
        var _this=this;
        let config = { headers: {'Content-Type': 'multipart/form-data',"token":getToken()} };
        this.$http.post(content.action,formData,config).then(function(res){
          _this.file_id=res.data.file_url;
          _this.changeform.file_id=res.data.file_url;
          console.log(res);
        });
      },
      onPick(val){
         if(val==null){
             var start_time="";
            }else{
                
          var start_time=formatDate(new Date(val),'yyyy-MM-dd hh:mm:ss')
            }
          this.form.starttime=start_time;
          this.changeform.issue_time=start_time;
        },
      newFile(file) {
        this.fileData = file;
      },
        /** 编辑按钮点击事件 **/
      changeBtn(index,row){
        this.changeform = Object.assign({},row,true);
        this.rowId=row.id;
        this.changeform.file_id=row.file_url;
        this.changeVisible=true;
            sysApi.qudao()
        .then(data => {
          if(data.success==true){
          console.log(data);
          this.qudao_type=[];
             for(var i=0;i<data.data.length;i++){
                  this.qudao_type.push({Id:data.data[i].channel_number,name:data.data[i].channel_name})
             }
             //console.log(this.qudao_type);
          this.$message({
            type:'success',
            message:data.info
          })

          }
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      addManageBtn(){
        this.addVisible=true;
        sysApi.qudao()
        .then(data => {
          if(data.success==true){
          console.log(data);
          this.qudao_type=[];
             for(var i=0;i<data.data.length;i++){
                  this.qudao_type.push({Id:data.data[i].channel_number,name:data.data[i].channel_name})
             }
             //console.log(this.qudao_type);
          this.$message({
            type:'success',
            message:data.info
          })

          }
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      // 确定添加版本
      addRelease(){
        //var start_time=formatDate(this.addEdition.issue_time,'yyyy-MM-dd');
         var pa={
    "id":0,//添加的时候不需要，修啊哥idea时候传入对应的id
    "version_number":this.addEdition.version_number,//版本编号
    "issue_time":this.form.starttime,//发布时间
    "desc":this.addEdition.desc,//描述
    "remark":this.addEdition.remark,//备注
    "client_type":this.addEdition.client_type,
    "download_url":"",//下载url
    "file_url":this.file_id,//文件id，上传文件以后返回的file_id
    "channel_number":this.addEdition.channel_number
}

         sysApi.versionAdd(pa)
                .then(res => {
                  if(res.success==true){
                    this.addVisible=false;
                    this.addEdition.version_number="",//版本编号
    this.form.starttime="",//发布时间
    this.addEdition.desc="",//描述
    this.addEdition.remark="",//备注
    this.addEdition.client_type="",
    this.file_id="",//文件id，上传文件以后返回的file_id
    this.addEdition.channel_number=""
                    this.$message({
                          type:'success',
                          message:res.info
                     })
                     var pa={"page":this.currentPage};
         sysApi.versionRelease(pa)
                .then(res => {
                    this.list=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
                  }
                    console.log(res);
                })
      },
        /** 添加管理员  ‘保存’  按钮点击事件 **/
      saveAdd(){
          //var start_time=formatDate(this.changeform.issue_time,'yyyy-MM-dd');
         var pa={
    "id":this.rowId,//添加的时候不需要，修啊哥idea时候传入对应的id
    "version_number":this.changeform.version_number,//版本编号
    "issue_time":this.changeform.issue_time,//发布时间
    "desc":this.changeform.desc,//描述
"client_type":this.changeform.client_type,
    "remark":this.changeform.remark,//备注
    "file_url":this.changeform.file_id,//下载url
 "channel_number":this.addEdition.channel_number
    //"file_id":""//文件id，上传文件以后返回的file_id
}

         sysApi.versionAdd(pa)
                .then(res => {
                  if(res.success==true){
                     this.changeVisible=false;
                    this.$message({
                          type:'success',
                          message:res.info
                     })
                     var pa={"page":this.currentPage};
         sysApi.versionRelease(pa)
                .then(res => {
                    this.list=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
                  }
                    console.log(res);
                })
       
      },
   
    downloadeBtn(row){
       var pa={
          "id":row.id,//添加的时候不需要
        }
         sysApi.versionDownload(pa)
                .then(res => {
                  if(res.success==true){
                    this.$message({
                          type:'success',
                          message:res.info
                     })
                     this.saveAs(res.url,"文件下载")
                  }
                    console.log(res);
                })
    },
   saveAs(obj,fileName){
            var tmpa=document.createElement("a");
            tmpa.download=fileName||'下载';
            tmpa.href=obj;
            tmpa.target="view_window";
            tmpa.click();
        },
      /** 分页条点击事件 **/
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
          var pa={"page":this.currentPage};
         sysApi.versionRelease(pa)
                .then(res => {
                    this.list=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
          .catch(err=>console.log('请求异常信息:'+err));
      }
    },
    created(){
         var pa={"page":this.currentPage};
         sysApi.versionRelease(pa)
                .then(res => {
                    this.list=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
    }
  }
</script>

<style>
  .info-title {
    padding: 10px 15px;
    font-size: 13px;
    font-weight: bold;
    background: #f0f0f0;
    border-bottom: 1px solid #B5CFD9;
  }
  .editform1 .el-form-item__label{
    width: 120px!important;
  }
.editform1 .el-form-item__content{
  margin-left: 120px!important;
}
  .info-operating {
    border-bottom: 1px solid #B5CFD9;
  }
.tip{
  width: 100%;
  margin-top:20px;


}
.tip p{
  text-align: center;
  color: #FF0000;
  

}
.el-checkbox, .el-checkbox__input{
  display: inline-block;
}
  .el-form-item {
    margin-bottom: 10px;
  }

  .el-pagination {
    text-align: center;
    padding: 30px 0;
  }

  .tooltips {
    text-align: center;
  }
</style>
