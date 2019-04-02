<template>
    <!-- <div>添加文章</div> -->
    
     <div class="app-container article">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" class="form">
                <el-form-item label="文章标题">
                        <el-input v-model="form.articleTitle" placeholder="" style="width: 300px" disabled></el-input>
                    </el-form-item>
                 <el-form-item label="文章类型">
                        <el-select v-model="form.value" disabled>
                            <el-option v-for="item in value" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item><br>
                    <!-- <template v-if="form.value=='帮助中心'">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"  v-on:change="ArticleSelect($event)">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else> -->
                    <el-form-item label="文章分类">
                        <el-select v-model="form.classify"   disabled>
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- </template> -->
                    <!-- <template v-if="form.value=='帮助中心'">
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  v-on:change="IntroduceSelect($event)">
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </template>
                    <template v-else> -->
                    <el-form-item label="推荐阅读" >
                        <el-select v-model="form.introduce"  disabled>
                            <el-option v-for="item in introduce" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- </template> -->
                    <br>
                     <el-form-item label="定时发布">
                    <el-date-picker
                        is-range
                        v-model="form.date"
                        type="datetime"
                        placeholder="定时发布"  value-format='yyyy-mm-dd HH:mm:ss' disabled>
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="排序" >
                        <el-input v-model="form.sort" placeholder="" style="width: 300px" disabled></el-input>
                    </el-form-item>
            </el-form>
        </el-col>
        <Editor v-model="content" v-on:listenChildEvent='showData'/>
        <!-- <el-col :span="24" style="padding-bottom: 0px;">
         <div id="editorElem" style="text-align:left;z-index:-1">
         </div>
         </el-col> -->
         <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" label-width="80px" style="text-align:center">
                  <router-link :to="{name:'文章管理'}"> <el-button size="small" style="width:120px;margin-top:20px">
                            <i class="el-icon-back-outline"></i> <b>返回 </b></el-button></router-link>
            </el-form>
        </el-col>
        <!--提交审核-->
      
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
           Editor: resolve => resolve(require('../../layout/components/editor2/index'))          
    },
      data () {
        return {
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
            unpassArticle:false,
            passArticle:false,
            list:{
                name:""
            },
            name:[],
            fileList:[],
            value:[
            ],
            classify:[
            ],
            introduce:[
                
            ],
            namesObj:{},
          editorContent: '',
          file_id:[],
          file_url:"",
          id:1,
          content:""
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
     
        },
       
  
    created() {
      /**初次加载 数据列表 vue axios**/
      if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('id',this.$route.params.id);
        }else{
            this.id=parseInt(localStorage.getItem("id"));
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

