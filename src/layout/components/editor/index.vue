<template>
    <div>
        <div ref="editor" style="text-align:left">
        </div>
    </div>
</template>

<script>

import { getToken } from "../../../utils/auth.js";
    import E from 'wangeditor'
    export default {
      name: 'editor',
      data () {
        return {
          _content : null,
          fileList:'',
          file_url:'',
          file_id:[]
        }
      },
      props: {
        value: {
          type: String,
          default: ''
        }
      },
      model: {
        prop: 'value',
        event: 'change'
      },
      mounted() {
        var _this=this;
         _this.file_id=[];
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.onchange = (html) => { // 获取内容
          _this._content = html;
          this.$emit('change',this._content);
          _this.test(html);
          console.log(_this.test(html));
          _this.$emit("listenChildEvent",html)
          //var arr=html.split("img");
          // var str =html;
          // var imgReg = /<img.*?(?:>|\/>)/gi;
          // var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          // var arr = str.match(imgReg);  // arr 为包含所有img标签的数组
          // for (var i = 0; i < arr.length; i++) {
          //   var src = arr[i].match(srcReg);
          //   //获取图片地址
          //   _this.file_id.push(src[1]);
          // }

          // _this.file_id=_this.file_id.slice(0, _this.file_id.length-1)
          // console.log(_this.file_id)
        }
        // this.editor.customConfig.onchange = (html) => {
        //   this.editorContent = html
        // }
        this.editor.customConfig.uploadImgServer = 'http://api.admin.js.ispeed.cn/api/v1/banner/upload'
        // 将图片大小限制为 3M
        this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024,
        // 限制一次最多上传 5 张图片
        this.editor.customConfig.uploadImgMaxLength =1,
        this.editor.customConfig.uploadImgHeaders = {
            'token':getToken()
        }
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.customConfig.uploadImgParams = {
            file_type:"article"
        }
        this.editor.customConfig.uploadImgHooks = {
    before: function (xhr, editor, files) {
        _this.fileList=files
        console.log(_this.fileList)
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
    },
    success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(_this.file_id);
        _this.file_url=result.file_url;
        _this.file_id.push(result.article_url)
    },
    fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    },
    error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },
    timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    },

    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.article_url
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
    }
    }
        this.editor.create();
      },
      watch: {
        value(newVal,oldVal) {
          if (this.editor) {
            if (newVal && newVal !== this._content) {
                console.log(this.editor);
                this.editor.txt.html(newVal);
            }
          }
        }
      },
      methods: {
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
}
      }
    }
</script>