<template>
  <div class="info">
    <!--操作-->
    <div class="info-operating">
      <el-form :inline="true" :model="form">
        <el-form-item>
            <el-button type="primary" size="medium" @click="addManageBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              添加banner
            </el-button>
        </el-form-item>
        <el-form-item label="banner位置">
            <el-select v-model="form.option" v-on:change="goodsSelect($event)">
                <el-option v-for="item in option" :key="item.optionId" :label="item.label" :value="item.optionId"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!--数据-->
    <div class="info-main">
      <!--数据-表格-->
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="banner_id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="banner_url" label="banner图" align="center">
             <!--vue+elementUI表格组件显示图片-->
          <template slot-scope="scope">
            <img :src="scope.row.banner_url" style="width: 50px;height:20px">
          </template>
        </el-table-column>
        <el-table-column prop="banner_sort" label="banner客户端排序" align="center"></el-table-column>
        <el-table-column prop="banner_name" label="banner名称" align="center"></el-table-column>
        <el-table-column prop="banner_location" label="banner位置" align="center"></el-table-column>
        <el-table-column prop="related_url" label="关联页面" align="center"></el-table-column>
        <el-table-column prop="related_type" label="关联类型" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="editBtn(scope.$index,scope.row)">
                编辑
              </el-button>
            <el-button size="small" type="danger" @click="deleteBtn(scope.$index,scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--编辑按钮-->
      <el-dialog
        title="编辑"
        :visible.sync="editVisible"
        width="40%"
        >
        <el-form label-width="80px" label-position="left" :model="editForm">
              <el-form-item label="banner图片">
                <!-- :before-upload="newFile" -->
                  <el-upload action="http://api.admin.js.ispeed.cn/api/v1/banner/upload" :limit="addForm.count"  v-model="editForm.file_name" :before-upload="newFile" :http-request="upload" :file-list="fileList">
                    <el-button type="primary" size="small">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="color:red">只能上传jpg/png/gif文件,且不超过10m(只允许上传一张图片)</div>
                  </el-upload>
              </el-form-item>
               <el-form-item label="名称">
                  <el-input v-model="editForm.banner_name"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                  <el-input v-model="editForm.banner_sort"></el-input>
              </el-form-item>
              <el-form-item label="显示位置">
                  <el-select v-model="editForm.banner_location" style="width:100%">
                    <el-option v-for="item in banner_location" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="关联页面" prop="related_type">
                  <radio-link :items="radioArray" :model="radioModel"></radio-link>
              </el-form-item>
             
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit()">保 存</el-button>
        </div>
      </el-dialog>
      <!--添加管理员-->
      <el-dialog
        title="添加Banner"
        :visible.sync="addVisible"
        width="40%"
        >
        <el-form label-width="80px" label-position="left" :model="addForm">
              <el-form-item label="banner图片">
                  <el-upload action="http://api.admin.js.ispeed.cn/api/v1/banner/upload"  :limit="addForm.count" :before-upload="newFile" :http-request="upload" v-model="addForm.file_name">
                    <el-button type="primary" size="small">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="color:red">只能上传jpg/png/gif文件,且不超过10m(只允许上传一张图片)</div>
                  </el-upload>
              </el-form-item>
               <el-form-item label="名称">
                  <el-input v-model="addForm.banner_name"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                  <el-input v-model="addForm.banner_sort"></el-input>
              </el-form-item>
              <el-form-item label="显示位置">
                  <el-select v-model="addForm.banner_location" style="width:100%">
                    <el-option v-for="item in banner_location" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
              </el-form-item>
               <el-form-item label="关联页面" prop="related_type">
                  <radio-link :items="radioArray" :model="radioModel"></radio-link>
              </el-form-item>
             
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd()">保 存</el-button>
        </div>
      </el-dialog>
      <!--删除按钮-->
      <el-dialog
        title="提示"
        :visible.sync="deleteVisible"
        width="30%"
        center>
        <div class="tooltips">删除不可恢复，是否确定删除 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow()">确 定</el-button>
        </span>
      </el-dialog>
      <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>

</template>

<script>
 import * as sysApi from "../../common/sys";
import { getToken } from "../../utils/auth";

 import radioLink from "@/components/RadioLink";
  export default {
    name: "Managepower",
     components: {
        radioLink
    },
    data() {
      return {
          form: {
                option: '全部',
            },
            option: [
              {
                optionId: 1,
                label: '全部'
            },
            {
                optionId: 2,
                label: '加速器官网'
            },
            {
                optionId: 3,
                label: '加速器客户端'
            }
            ],
            total:'10',
         radioArray: [{
              label: '无'
          },{
              label: '活动链接',
              subItems: {
                  type: 'input',
                  prop: 'activityLink',
                  isShow: true
              }
          },{
              label: '站内普通链接',
              subItems: {
                  type: 'input',
                  prop: 'commonLink',
                  isShow: true
              }
          },{
              label: '站外链接',
              subItems: {
                  type: 'input',
                  prop: 'outLink',
                  isShow: true
              }
          }],
          radioModel: {
              value: '无',
              selectValue: '',
              activityLink: '',
              commonLink: '',
              outLink: ''
          },
        isActive:false,
        deleteVisible: false,        //模态框可视化
        // rowIndex: '',                //当前点击行index值
        currentPage: 1,              //当前页
        pageSize: 20,                 //每页条数
        total: 1,                    //总条数
        editVisible:false,
        addVisible:false,
        fileData: {},
        //对话框获取保存数据
        editForm: {
          file_name:'',
          banner_name: '',
          banner_sort: '',
          banner_location:'',
          related_url: '',   
          file_id:""             //当前点击行index值
        },
        banner_location:[{
          name:"加速器客户端",
          id:1,
        },{
          name:"加速器官网",
          id:2,
        }],
        addForm: {
         file_name:'',
          banner_name: '',
          banner_sort: '',
          banner_location:'',
          related_url: '',   
          file_id:"",
          count:1
        },
        params:{
          id:0,
          banner_name:"",// banner名称
          banner_location:"",//位置
          related_url:"",//关联页面
          banner_sort:0,// 排序
          file_name:"",// 文件名
        },
        fileList:[],
        file_id:"",
        //佛文当前页数据
        list: [
            {
                banner_id:"1",
                banner_sort:'',
                banner_name:'',
                file_url:'',
                banner_location:'banner',
                related_url:'加速器官网',
                related_type:'www.baidu.com',
                file_name:'首页banner图',
            }
        ],
        bannerId:"",
        file_id:"",
      }
    },
    methods: {

      newFile(file) {
        console.log(file);
        this.fileData = file;
         const isJPG = file.type === 'image/jpeg'||'image/png'||'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 10;
 
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式或者png格式或者GIF格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500k!');
        }
        return isJPG && isLt2M;
      },
        /** 编辑按钮点击事件 **/
      editBtn(index,row){
        this.editVisible=true;
            this.editForm = Object.assign({},row,true);
            console.log(this.editForm);
            //nice  
            if(this.editForm.related_type=="官网活动"){
                this.radioModel.value="活动链接";
                this.radioModel.activityLink=this.editForm.related_url;
            }else if(this.editForm.related_type=="站内普通链接"){
              this.radioModel.value="站内普通链接";
                this.radioModel.commonLink=this.editForm.related_url;
            }else if(this.editForm.related_type=="活动链接"){
              this.radioModel.value="活动链接";
                this.radioModel.activityLink=this.editForm.related_url;
            }
            // if(this.editForm.file!==""){
            //   this.editForm.file_id=this.editForm.file.file_id;
            //   this.editForm.file_name=this.editForm.file.file_name;
            // }
      },
      upload(content){
         let formData = new FormData();
        formData.append("file",content.file);
        formData.append("file_type","banner");
        var _this=this;
        let config = { headers: {'Content-Type': 'multipart/form-data','token':getToken()} };
        this.$http.post(content.action,formData,config).then(function(res){
          console.log(res);
          _this.file_id=res.data.banner_url;
          _this.editForm.banner_url=res.data.banner_url;
        });
      },
        /** 编辑对话框  ‘保存’  按钮点击事件 **/
      saveEdit(){
        if(this.editForm.banner_name==''){
          alert('标题不能为空');
          return;
        }
        if(this.radioModel.value=="无"){
          this.editForm.related_url="";
        }else if(this.radioModel.value=="活动链接"){
          this.editForm.related_url=this.radioModel.activityLink;
        }else if(this.radioModel.value=="站内普通链接"){
          this.editForm.related_url=this.radioModel.commonLink;
        }else if(this.radioModel.value=="站外链接"){
          this.editForm.related_url=this.radioModel.activityLink;
        }
        console.log(this.radioModel.selectValue+'>>')
        var params={
              id:parseInt(this.editForm.id),
              banner_name:this.editForm.banner_name,
              banner_location:this.editForm.banner_location,
              related_url:this.editForm.related_url,
              file_name:this.fileData.name,
              banner_url:this.editForm.banner_url,
              related_type:this.radioModel.value,//关联类型
              banner_sort:parseInt(this.editForm.banner_sort),
        };
         console.log(params);
        sysApi.bannerEdit(params)
                .then(res => {
                   console.log(res);
                   if(res.success==true){
                     this.editVisible=false;
                       this.$message({
                            type: 'success',
                            message:res.info
                        });
                                              if(this.form.option=="全部"){
        var option=''
      }else{
        var option=this.form.option
      }
      var param={"location":option,"page":1}
      sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                   }
                })
        
      },
     
      addManageBtn(){
        this.addVisible=true;
      },
      // 下拉框事件
      goodsSelect(event){
         if(event==1){
        this.form.option=''
      }else if(event==2){
        this.form.option="加速器官网";
      }else if(event==3){
        this.form.option="加速器客户端";
      }
      var param={"location":this.form.option,"page":1}
      sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        },
      deleteBtn(index, row) {
        this.deleteVisible = true;
        this.bannerId=row.id;
      },
       saveAdd() {
         if(this.addForm.banner_name==''){
          alert('标题不能为空');
          return;
        }
        var params={
              id:0,
              banner_name:this.addForm.banner_name,
              banner_location:this.addForm.banner_location,
              related_url:this.radioModel.selectValue,
              file_name:this.fileData.name,
              banner_url:this.file_id,
              related_type:this.radioModel.value,//关联类型
              banner_sort:parseInt(this.addForm.banner_sort),
        };
         console.log(params);
        sysApi.bannerEdit(params)
                .then(res => {
                   console.log(res);
                   if(res.success==true){
                     this.addVisible=false;
                       this.$message({
                            type: 'success',
                            message:res.info
                        });
                       if(this.form.option=="全部"){
        var option=''
      }else{
        var option=this.form.option
      }
      var param={"location":option,"page":1}
      sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                   }
                })
         .catch(err => console.log('请求异常信息:' + err));
      },
      /** 删除模态框  ‘确定’  按钮点击事件 **/
      deleteRow() {
        var param={"id":parseInt(this.bannerId)}
         sysApi.bannerDele(param)
        .then(data => {
          if(data.success==true){
            this.deleteVisible=false;
              this.$message({
                            type: 'success',
                            message:data.info
                        });
                         if(this.form.option=="全部"){
        var option=''
      }else{
        var option=this.form.option
      }
      var param={"location":option,"page":1}
      sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
          }
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      /** 分页条点击事件 **/
      handleCurrentChange(val) {
          if(this.form.option=="全部"){
        var option=''
      }else{
        var option=this.form.option
      }
        this.currentPage = parseInt(`${val}`);
        var param={"location":option,"page":this.currentPage}
         sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
            this.$message({
                            type: 'success',
                            message:res.info
                        });
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created() {
      /**初次加载 数据列表 vue axios**/
      if(this.form.option=="全部"){
        var option=''
      }else{
        var option=this.form.option
      }
      var param={"location":option,"page":this.currentPage}
      sysApi.bannerManage(param)
        .then(data => {
          this.list = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
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
  .el-form--inline .el-form-item{
    margin-bottom: 10px;
}
  .phide{
    display: block
  }

  .info-operating {
    border-bottom: 1px solid #B5CFD9;
  }
.tip{
  width: 100%;
  margin-top:20px;


}
p.active{
  display:none;
}
.tip p{
  text-align: center;
  color: #FF0000;
  

}
.el-radio__label {
  width: 75%;
}
.el-radio{
  width: 100%;
}
.radiogroup .el-radio{
width: 100%;
}
.special_input{
  width: 75%;
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
