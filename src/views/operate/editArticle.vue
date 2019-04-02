<template>
    <!-- <div>添加文章</div> -->
    
     <div class="app-container article">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" class="form">
                <template v-if="status=='已发布'">
                <el-form-item label="文章标题">
                        <el-input v-model="form.articleTitle" placeholder="" style="width: 300px" disabled></el-input>
                    </el-form-item>
                 <el-form-item label="文章类型">
                        <el-select v-model="form.value"  v-on:change="TypeSelect($event)" disabled>
                            <el-option v-for="item in value" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item><br>
                    <template v-if="form.value=='帮助中心'">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"  v-on:change="ArticleSelect($event)" disabled>
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"  v-on:change="ArticleSelect($event)" disabled>
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-if="form.value=='帮助中心'">
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  v-on:change="IntroduceSelect($event)" disabled>
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else>
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  v-on:change="IntroduceSelect($event)" disabled>
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <br>
                     <el-form-item label="定时发布">
                    <el-date-picker
                        is-range
                        v-model="form.date"
                        type="datetime"
                        placeholder="定时发布" @change="onPick" value-format='yyyy-mm-dd HH:mm:ss' disabled>
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="排序" >
                        <el-input v-model="form.sort" placeholder="" style="width: 300px" disabled></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                     <el-form-item label="文章标题">
                        <el-input v-model="form.articleTitle" placeholder="" style="width: 300px"></el-input>
                    </el-form-item>
                 <el-form-item label="文章类型">
                        <el-select v-model="form.value"  v-on:change="TypeSelect($event)">
                            <el-option v-for="item in value" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item><br>
                    <template v-if="form.value=='帮助中心'">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"  v-on:change="ArticleSelect($event)">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"  v-on:change="ArticleSelect($event)" disabled>
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-if="form.value=='帮助中心'">
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  v-on:change="IntroduceSelect($event)">
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else>
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  v-on:change="IntroduceSelect($event)" disabled>
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <br>
                     <el-form-item label="定时发布">
                    <el-date-picker
                        is-range
                        v-model="form.date"
                        type="datetime"
                        placeholder="定时发布"  :picker-options="pickerOptions0" @change="onPick" value-format='yyyy-MM-dd HH:mm:ss'>
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="排序" >
                        <el-input v-model="form.sort" placeholder="" style="width: 300px"></el-input>
                    </el-form-item>
                </template>
            </el-form>
        </el-col>
        <Editor v-model="content" v-on:listenChildEvent='showData'/>
        <!-- <el-col :span="24" style="padding-bottom: 0px;">
         <div id="editorElem" style="text-align:left;z-index:-1">
         </div>
         </el-col> -->
         <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" label-width="80px" >
                <el-button type="success" plain>预览</el-button>
                <el-button type="primary" plain @click="submit()">提交审核</el-button>
            </el-form>
        </el-col>
        <!--提交审核-->
      <el-dialog
        title="提交审核"
        :visible.sync="Examinevis"
        width="30%"
        center>
        <el-form :inline="true" :model="list" label-width="80px" >
                    <el-form-item label="审核人">
                        <el-select v-model="list.name" v-on:change="paySelect($event)">
                            <el-option v-for="item in name" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                  
            </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Examinevis = false">取 消</el-button>
          <el-button type="primary" @click="subOk()">確定</el-button>
        </span>
      </el-dialog>
     </div>
    
</template>
<script>
import E from 'wangeditor'
 import * as sysApi from "../../common/sys";
import { getToken } from "../../utils/auth";
import {formatDate} from "../../common/utils";
export default {
      // name: 'editor',
    components: {
           Editor: resolve => resolve(require('../../layout/components/editor/index'))          
    },
      data () {
        return {
             pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },  
            form:{
               articleTitle :"",
               value:"",
               classify:"",
               introduce:"",
                date:"",
                starttime:"",
               sort:"1",
               count:1
            },
            Examinevis:false,
            list:{
                name:""
            },
            name:[],
            fileList:[],
            value:[
                {
                    statusId:"1",
                    label:'官方公告'
                },
                {statusId:"2",
                    label:'游戏资讯'},
                {statusId:"3",
                    label:'帮助中心'}
            ],
            classify:[
                {
                    id:"1",
                    name:'新手上路'
                },
                {id:"2",
                    name:'游戏故障'},
                {id:"3",
                    name:'PC客户端'},
                {id:"4",
                    name:'其他'}
            ],
            introduce:[
                {
                    id:"1",
                    name:'热门问题'
                },
                {id:"2",
                    name:'安装使用支持'},
                {id:"3",
                    name:'艾速活动参与引导'},
            ],
            namesObj:{},
          editorContent: '',
          file_id:[],
          file_url:"",
          id:1,
          content:"",
          status:'',
          boolean:false
        }
      },
      methods: {
          showData:function(data){
              this.editorContent=data;
              this.test(data);
              console.log(this.editorContent,this.file_id);
          },
           test(html) {
var allStr =html;
function createNode(htmlStr) {
var div = document.createElement("div");
div.innerHTML = htmlStr;
return div.childNodes[0];
}
let imgArr = createNode(allStr).getElementsByTagName("img");
let imgArrSrc = [];
for (let i = 0; i < imgArr.length; i++) {
imgArrSrc.push(imgArr[i].getAttribute("src"));
}
this.file_id=imgArrSrc
return(this.file_id);
},
          TypeSelect(event){
              if(event=="无"){
                  this.form.value=""
              }else{
                  this.form.value=event
              }
              if(event!=="帮助中心"){
                  this.form.classify="";
                  this.form.introduce=""
              }
          },
          ArticleSelect(event){
              if(event=="无"){
                  this.form.classify=""
              }else{
                 this.form.classify=event
              }
          },
          IntroduceSelect(event){
               if(event=="无"){
                  this.form.introduce=""
              }else{
                  this.form.introduce=event
              }
          },
         
        submit(){
            this.Examinevis=true;
            sysApi.Examine()
                .then(data => {
                    if(data.success==true){
                        for(var i=0;i<data.names.length;i++){
                             this.name.push({statusId:parseInt(i+1),label:data.names[i]})
                        }
                        console.log(this.name)
                             
             
                    }
                    console.log(data)
            })
        },
        paySelect(event){
              this.list.name=event;
        },
        subOk(){
            var param={
                    "id":this.id,//添加的时候不需要，修改的时候传入id
                    "article_type":this.form.value,//文章类型
                    "article_sort":parseInt(this.form.sort),//文章排序
                    "article_class":this.form.classify,//文章分类
                    "article_name":this.form.articleTitle,//文章标题
                    "issue_time": this.form.starttime,//发布时间
                    "recommend_reading":this.form.introduce,//推荐阅读
                    "content":this.editorContent,// 文件内容
                    "approval_account": this.list.name,//审核人
                    "file_ids":this.file_id //这里请传入article文件上传成功以后的file_id数组
            }
            console.log(param)
            sysApi.AddArticle(param)
                .then(data => {
                    if(data.success==true){
                        this.Examinevis=false;
                        this.$message({
                            type:"success",
                            message:data.info
                        })
                        this.$router.push({path:"/article"});
                    }
                    console.log(data)
            })
            .catch(err=>console.log('请求异常信息:' + err))
      },
        onPick(val){
            var start_time=formatDate(new Date(val),'yyyy-MM-dd hh:mm:ss')
          this.form.starttime=start_time;
        },
      },
      mounted() {
    //     editor.customConfig.onchange = (html) => {
    //       this.editorContent = html
    //     }
    //     editor.customConfig.uploadImgServer = 'http://testjiasu.api.ispeed.cn/api/v1/banner/upload'
    //     // 将图片大小限制为 3M
    //     editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024,
    //     // 限制一次最多上传 5 张图片
    //     editor.customConfig.uploadImgMaxLength =1,
    //     editor.customConfig.uploadImgHeaders = {
    //         'token':getToken()
    //     }
    //     editor.customConfig.uploadFileName = 'file'
    //     editor.customConfig.uploadImgParams = {
    //         file_type:"article"
    //     }
    //     editor.customConfig.uploadImgHooks = {
    // before: function (xhr, editor, files) {
    //     _this.fileList=files
    //     console.log(_this.fileList)
    //     // 图片上传之前触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        
    //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
    //     // return {
    //     //     prevent: true,
    //     //     msg: '放弃上传'
    //     // }
    // },
    // success: function (xhr, editor, result) {
    //     // 图片上传并返回结果，图片插入成功之后触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //     console.log(result);
    //     _this.file_url=result.file_url;
    //     _this.file_id.push(result.file_id)
    // },
    // fail: function (xhr, editor, result) {
    //     // 图片上传并返回结果，但图片插入错误时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    // },
    // error: function (xhr, editor) {
    //     // 图片上传出错时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    // },
    // timeout: function (xhr, editor) {
    //     // 图片上传超时时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    // },

    // // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    // customInsert: function (insertImg, result, editor) {
    //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

    //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //     var url = result.file_url
    //     insertImg(url)

    //     // result 必须是一个 JSON 格式字符串！！！否则报错
    // }
    // }
    //     editor.create()
      },
//     mounted: function () {
//   this.$nextTick(function () {
      
   
//   })
// },
    created() {
      /**初次加载 数据列表 vue axios**/
        if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('id',this.$route.params.id);
        }else{
            this.id=parseInt(localStorage.getItem("id"));
        }
        if(this.$route.params.status){
            this.status=this.$route.params.status;
            localStorage.setItem('status',this.$route.params.status);
        }else{
            this.status=localStorage.getItem("status");
        }
        if(this.status=="已发布"){
            this.boolean=true;
        }else{
            this.boolean=false;
        }
        var param={
                    "id":this.id,//添加的时候不需要，修改的时候传入id
                    "is_official":false// 区分是否来自官网。true来自官网
            }
            sysApi.detailArticle(param)
                .then(data => {
                    if(data.success==true){
                        this.$message({
                            type:"success",
                            message:data.info
                        })
                        this.form.value=data.data.article_type,//文章类型
                        this.form.sort=data.data.article_sort,//文章排序
                        this.form.classify=data.data.article_class,//文章分类
                        this.form.articleTitle=data.data.article_name,//文章标题
                        this.form.date=data.data.issue_time,//发布时间
                        this.form.introduce=data.data.recommend_reading;
                        this.content=data.data.content;
                         this.form.starttime=data.data.issue_time,
                        this.editorContent=data.data.content;
                        this.file_id=data.data.article_urls
                        //this.editor.txt.html(data.data.content)
                    }
                    
            console.log(data)
            })
            .catch(err=>console.log('请求异常信息:' + err))
    
    }
}
</script>
<style>
.w-e-text-container{
    z-index: 1!important;
}
.w-e-menu{
    z-index: 1!important;
}
.form{
    margin-bottom: 40px;
}
#editorElem{
    background: #fff;
    z-index: -1;
}
w-e-toolbar{
    margin-top: 230px!important;
}
.article .article_item{
    display: block;
}
.article .el-form--inline .el-form-item{
    margin-bottom: 10px!important;
}
</style>

