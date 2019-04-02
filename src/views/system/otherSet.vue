<template>
    <div class="app-container otherset">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="150px" >
                    <el-form-item label="注册赠送时长设置" class="label_div">
                        <template v-if="form.open=='关闭'&& form.ok==false">
                        <el-select v-model="form.value"  v-on:change="indexSelect($event)" disabled>
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                        </template>
                        <template v-else>
                             <el-select v-model="form.value"  v-on:change="indexSelect($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                        </template>
                        <el-form-item label="体验时长_天数">
                            <template v-if="form.open=='关闭'">
                                <el-input v-model="form.dayCount" placeholder="天数" style="width: 140px" disabled></el-input>
                            </template>
                            <template v-else>
                                <el-input v-model="form.dayCount" placeholder="天数" style="width: 140px"></el-input>
                            </template>
                            
                        </el-form-item>
                        <el-form-item label="体验时长_时长">
                            <template v-if="form.open=='关闭'">
                                <el-input v-model="form.hourCount" placeholder="时长" style="width: 140px" disabled></el-input>
                                小时
                            </template>
                            <template v-else>
                                <el-input v-model="form.hourCount" placeholder="时长" style="width: 140px"></el-input>
                                小时
                            </template>
                        </el-form-item>
                        <template v-if="form.change1==false">
                        <el-button class="change_btn" @click="changeBtn()" disabled>修改</el-button>
                        </template>
                        <template v-else>
                        <el-button class="change_btn" @click="changeBtn()">修改</el-button>
                        </template>
                         <template v-if="form.btn==false">
                        <el-button type="primary" @click="deleteRow()" disabled>确 定</el-button>
                         </template>
                         <template v-else>
                             <el-button type="primary" @click="deleteRow()" >确 定</el-button>
                         </template>
                    </el-form-item><br>
                    <el-form-item label="新手券设置" class="label_div">
                         <template v-if="form.open2=='关闭'&& form.ok2==false">
                        <el-select v-model="form.value2"  v-on:change="indexSelect2($event)" disabled>
                            <el-option v-for="item in status2" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                        </template>
                        <template v-else>
                             <el-select v-model="form.value2"  v-on:change="indexSelect2($event)">
                            <el-option v-for="item in status2" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                        </template>
                        <el-form-item label="券名称">
                                <el-input v-model="form.name" placeholder="券名称" style="width: 140px" disabled>新手券</el-input>
                        </el-form-item>
                        <el-form-item label="面值">
                             <template v-if="form.open2=='关闭'">
                                <el-input v-model="form.moneyValue" placeholder="面值" style="width: 140px" disabled></el-input>元
                             </template>
                                <template v-else>
                                     <el-input v-model="form.moneyValue" placeholder="面值" style="width: 140px"></el-input>元
                                </template>
                        </el-form-item>
                        <el-form-item label="有效期">
                            <template v-if="form.open2=='关闭'">
                                <el-input v-model="form.userfulTime" placeholder="有效期" style="width: 140px" disabled></el-input>天
                             </template>
                            <template v-else>
                                 <el-input v-model="form.userfulTime" placeholder="有效期" style="width: 140px"></el-input>天
                             </template>
                        </el-form-item>
                         <template v-if="form.change2==false">
                        <el-button class="change_btn" @click="changeBtn2()" disabled>修改</el-button>
                        </template>
                        <template v-else>
                        <el-button class="change_btn" @click="changeBtn2()">修改</el-button>
                        </template>
                        <template v-if="form.btn2==false">
                        <el-button type="primary" @click="deleteRow2()" disabled>确 定</el-button>
                         </template>
                         <template v-else>
                             <el-button type="primary" @click="deleteRow2()" >确 定</el-button>
                         </template>
                    </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
 import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
    data() {
        return {
            form:{
                value:"",value2:"",
                dayCount:"",
                hourCount:"",
                name:"新手券",
                moneyValue:"",
                userfulTime:"",
                 open2:"关闭",
                open:"关闭",
                ok:true,
                btn:false,
                 btn2:false,
                 ok2:true,
                 change1:true,
                 change2:true
            },
            status:[{
                label:"关闭",
                statusId:"1"
            },{
                label:"开启",
                statusId:"2"
            }],
            status2:[{
                label:"关闭",
                statusId:"1"
            },{
                label:"开启",
                statusId:"2"
            }],
            rowId1:1,
            rowId2:1,
        }
    },
    methods: {
        deleteRow(){
            var param={
                 "id":this.rowId1,//新增的时候不需要，修改的时候传id过来
                "setting_type":"注册赠送时长",//设置类型。新手券， 注册赠送时长
                "day":parseInt(this.form.dayCount),//天
                "hour":parseInt(this.form.hourCount),//小时
                "price":parseInt(this.form.moneyValue),//面值
                "enable":this.form.value=="关闭"?false:true //启用true，关闭：false
            }
            sysApi.otherSet(param).then(
                data=>{
                    if(data.success==true){
                         this.$message({
                             type:"success",
                             message:data.info
                         })
                        this.form.ok=false;
                        this.form.btn=false;
                    }
                    console.log(data);
            })
        },
         deleteRow2(){
            var param={
                 "id":this.rowId2,//新增的时候不需要，修改的时候传id过来
                "setting_type":"新手券",//设置类型。新手券， 注册赠送时长
                "day":parseInt(this.form.userfulTime),//天
                "hour":parseInt(this.form.hourCount),//小时
                "price":parseInt(this.form.moneyValue),//面值
                "enable":this.form.value2=="关闭"?false:true //启用true，关闭：false
            }
            sysApi.otherSet(param).then(
                data=>{
                     if(data.success==true){
                         this.$message({
                             type:"success",
                             message:data.info
                         })
                        this.form.ok2=false;
                        this.form.btn2=false;
                    }
                    console.log(data);
            })
        },
        changeBtn(){
            this.form.btn=true;
            if(this.form.value=="关闭"){
                 this.form.open="关闭";
                 this.form.ok=true
            }else{
                 this.form.open="开启";
                 this.form.ok=true
            }
        },
        changeBtn2(){
            this.form.btn2=true;
             if(this.form.value2=="关闭"){
                 this.form.open2="关闭";
                 this.form.ok2=true
            }else{
                 this.form.open2="开启";
                 this.form.ok2=true
            }
        },
       indexSelect2(event){
        if(event=="1"){
            this.form.value2="关闭";
            this.form.ok2=true;
            this.form.open2="关闭"
        }else{
            this.form.value2="开启"
            this.form.ok2=true;
            this.form.open2="开启"
        }
       },
       indexSelect(event){
        if(event=="1"){
            this.form.value="关闭"
          this.form.ok=true;
          this.form.open="关闭"
        }else{
            this.form.value="开启"
           this.form.ok=true;
            this.form.open="开启"
        }
       },
    },
    created(){
        sysApi.otherSetLook().then(
            data=>{
                console.log(data);
                if(data.success==true){
                    if(data.data.length>0){
                         if(data.data.length>1){
                    if(data.data[0].setting_type=="注册赠送时长"){
                        this.rowId1=data.data[0].id;
                        if(data.data[0].enable==true){
                            this.form.value="开启"
                        }else{
                            this.form.value="关闭"
                        }
                        this.form.dayCount=data.data[0].day;
                        this.form.hourCount=data.data[0].hour;
                        this.form.open="关闭";
                        this.form.ok=false;
                    }else{
                        this.rowId2=data.data[0].id;
                        if(data.data[0].enable==true){
                            this.form.value2="开启"
                        }else{
                            this.form.value2="关闭"
                        }
                        this.form.userfulTime=data.data[0].day;
                        this.form.moneyValue=data.data[0].price;
                        this.form.open2="关闭";
                        this.form.ok2=false;
                    }
                     if(data.data[1].setting_type=="注册赠送时长"){
                         this.rowId1=data.data[1].id;
                        if(data.data[1].enable==true){
                            this.form.value="开启"
                        }else{
                            this.form.value="关闭"
                        }
                        this.form.dayCount=data.data[1].day;
                        this.form.hourCount=data.data[1].hour;
                        this.form.open="关闭";
                        this.form.ok=false;
                    }else{
                        this.rowId2=data.data[1].id;
                        if(data.data[1].enable==true){
                            this.form.value2="开启"
                        }else{
                            this.form.value2="关闭"
                        }
                        this.form.userfulTime=data.data[1].day;
                        this.form.moneyValue=data.data[1].price;
                        this.form.open2="关闭";
                        this.form.ok2=false;
                    }
                }else if(data.data.length=1){
                    if(data.data[0].setting_type=="注册赠送时长"){
                        this.rowId1=data.data[0].id;
                        if(data.data[0].enable==true){
                            this.form.value="开启"
                        }else{
                            this.form.value="关闭"
                        }
                        this.form.dayCount=data.data[0].day;
                        this.form.hourCount=data.data[0].hour;
                        this.form.open="关闭";
                        this.form.open2="";
                        this.form.ok=false;
                        this.change1=true;
                        this.change2=false;
                    }else{
                        this.rowId2=data.data[0].id;
                        if(data.data[0].enable==true){
                            this.form.value2="开启"
                        }else{
                            this.form.value2="关闭"
                        }
                        this.change2=true;
                        this.change1=false;
                        this.form.userfulTime=data.data[0].day;
                        this.form.moneyValue=data.data[0].price;
                         this.form.open2="关闭";
                         this.form.open="";
                         this.form.ok2=false;
                    }
                }
                    }
                      else{
                    this.form.change1=false;
                    this.form.change2=false;
                    this.form.btn=true;
                    this.form.btn2=true;
                }
                }
             
            }
        )
    }
}
</script>
<style>
.otherset .change_btn{
    margin-left: 20px;
}
.otherset .el-button{
    width: 80px;
}
.otherset .el-form-item:last-child{
    margin-top: 10px!important;
}
</style>



