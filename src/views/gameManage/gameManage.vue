<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="状态">
                        <el-select v-model="form.status" v-on:change="classifyBth($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-select v-model="form.orders" v-on:change="sortBtn($event)">
                            <el-option v-for="item in orders" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入游戏名搜索" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search"  @click="search()"></el-button>
                    </el-form-item>
                     <el-button type="primary" size="medium" @click="addGameBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              添加游戏
            </el-button>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="状态" prop="game_status" align="center"></el-table-column>
                <el-table-column label="是否免费" prop="is_free" align="center"></el-table-column>
                <el-table-column label="排序" prop="game_sort" align="center"></el-table-column>
                <el-table-column label="游戏缩略图" prop="slt_url" align="center">
                     <template slot-scope="scope">
                        <img :src="scope.row.slt_url" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column label="游戏LOGO" prop="logo_url" align="center">
                     <template slot-scope="scope">
                        <img :src="scope.row.logo_url" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column label="游戏名称" prop="game_name" align="center"></el-table-column>
                <el-table-column label="调度方式" prop="dispatch_type" align="center"></el-table-column>
                <el-table-column label="区域名称" prop="region_name" align="center"></el-table-column>
                <el-table-column label="加速模式" prop="speedZ" align="center"></el-table-column>
                <el-table-column label="一级分类" prop="first_names" align="center"></el-table-column>
                <el-table-column label="二级分类" prop="second_names" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="cancelBtn(scope.$index,scope.row)">
                          {{scope.row.game_status=="上架"?"下架":"上架"}}
                        </el-button>
                         <el-button size="small"  @click="changeBtn(scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>修改</b>
                        </el-button>
                        <el-button size="small" type="danger" @click="deleteBtn(scope.$index,scope.row)">
                            删除
                        </el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
        <!-- 查看详细 -->
        <el-dialog title="提示" :visible.sync="isShowDetail" center width="30%">
            <div>确认删除该游戏？</div>
            <div slot="footer" class="edit-footer">
          <el-button @click="isShowDetail = false">取 消</el-button>
          <el-button type="primary" @click="savedele()">确定删除</el-button>
        </div>
        </el-dialog>
          <!-- x修改商品 -->
         <el-dialog
        title="编辑游戏"
        :visible.sync="changeGoods"
        width="40%"
        center>
         <el-form label-width="80px" label-position="left" :model="changeGoodsData" class="change_dialog">
          <el-form-item label="游戏名">
            <el-input v-model="changeGoodsData.game_name"></el-input>
          </el-form-item>
           <el-form-item label="排序">
            <el-input v-model="changeGoodsData.game_sort"></el-input>
          </el-form-item>
          <el-form-item label="是否收费" prop="is_free" >
        <el-radio-group v-model="changeGoodsData.is_free" v-on:change="edit_free($event)">
          <el-radio label="免费"></el-radio>
          <el-radio label="收费"></el-radio>
        </el-radio-group>
      </el-form-item>
           <el-form-item label="状态" prop="game_status">
        <el-radio-group v-model="changeGoodsData.game_status">
          <el-radio label="上架"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="游戏缩略图" prop="gameImg">
           <el-upload :action="uploadSys"  :limit=1 v-model="addGameData.gameImg" :before-upload="newFile" :http-request="upload" :file-list="gameLogoList">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                <div class="el-upload__tip" slot="tip">jpg/png 格式小于500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="游戏LOGO" prop="gameLogo">
            <el-upload :action="uploadSys"  :limit=1 v-model="addGameData.gameLogo" :before-upload="newFile" :http-request="upload2" :file-list="thumbnailList">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                    <div class="el-upload__tip" slot="tip">jpg/png 格式小于500kb</div>
            </el-upload>
        </el-form-item>
         <el-form-item label="调度类型" prop="dispatch_type">
        <el-radio-group v-model="changeGoodsData.dispatch_type" v-on:change="radio_c1($event)">
          <el-radio label="智能调度"></el-radio>
          <el-radio label="选区调度"></el-radio>
        </el-radio-group>
         </el-form-item>
          <el-form-item label="区域" v-show="showArea1" style="margin-bottom:10px" class="area_item">
            <el-select v-model="changeGoodsData.region_name" v-on:change="radio_select($event)">
                <el-option v-for="item in areaID" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
       <el-form-item label="调度选择" v-if="showArea1" style="margin-bottom:10px" class="area_item">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="tcp智能调度"></el-checkbox>
                    <el-checkbox label="udp智能调度"></el-checkbox>
                </el-checkbox-group>
         </el-form-item>
        <!-- 加速模式 -->
          <el-form-item label="加速模式" prop="speed_mode_arr">
        <!-- <el-radio-group v-model="changeGoodsData.speed_mode" v-on:change="add_c1($event)">
          <el-radio label="驱动加速"></el-radio>
          <el-radio label="VPN加速"></el-radio>
        </el-radio-group> -->
        <el-checkbox-group v-model="changeGoodsData.speed_mode_arr"  @change="add_c1($event)">
           <el-checkbox v-for="modelJiasu in jiasuModel" :label="modelJiasu" :key="modelJiasu">{{modelJiasu}}</el-checkbox>
        </el-checkbox-group>
         </el-form-item>
         <!-- vpn加速需要填写路由 -->
        <el-form-item label="路由表" prop="luyou_list" v-show="booleanLuyou_card==true">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>路由表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addLuyouEdit()"> 添加路由</el-button>
            </div>
            <div class="text item">
                <div class="itom_con">
                    <span class="con_name listban">
                        {{changeGoodsData.route_table}}
                    </span>
                    <span class="cancel_btn" @click="removeTodoLuyou_edit()">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="booleanLuyou==true" v-model.trim="luyou_dns"  placeholder="回车添加白名单"  v-on:keyup.enter.native="addluyou_dns_edit"></el-input>
            </template>
        </el-card>
        </el-form-item>
        <el-form-item label="进程" prop="process_list">
            <!-- <el-input v-model="changeGoodsData.process_name"></el-input> -->
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button style="float: right; padding: 3px 0" type="text" @click="addchild_processes_edit()"> 添加进程</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in changeGoodsData.process_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodochild_processes_edit(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="form.boolean3==true" v-model.trim="changeAdd.child_processes_value"  placeholder="回车添加进程"  v-on:keyup.enter.native="addchild_processes_key_edit"></el-input>
            </template>
        </el-card>
        </el-form-item> 
        <el-form-item label="子进程" prop="enable_child_process">
             <!-- @change='change2_edit' -->
            <el-switch
                v-model="changeGoodsData.enable_child_process"
                active-color="#13ce66"
                inactive-color="#ff4949"  @change='change2_edit'>
            </el-switch>
        </el-form-item> 
        <el-form-item label="一、二级分类" prop="oneClassify" class="gameCategory">
          <treeselect v-model="changeGoodsData.value2" :multiple="multiple" :options="editOptions"/>
      </el-form-item>
          <el-form-item label="域名白名单" prop="while_list">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>域名白名单</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addWhite_edit()"> 添加白名单</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in changeGoodsData.while_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodo_edit(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="form.boolean==true" v-model.trim="changeAdd.while_dns"  placeholder="回车添加白名单"  v-on:keyup.enter.native="addWhite_dns_edit"></el-input>
            </template>
        </el-card>
        </el-form-item>
       <el-form-item label="域名黑名单" prop="black_list">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>域名黑名单</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addBlack_edit()"> 添加黑名单</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in changeGoodsData.black_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodoBlack_edit(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="form.boolean2==true" v-model.trim="changeAdd.black_dns"  placeholder="回车添加黑名单"  v-on:keyup.enter.native="addBlack_dns_edit"></el-input>
            </template>
        </el-card>
        </el-form-item>
        <!-- 禁用列表 -->
        <el-form-item label="banlist(禁用列表)" prop="">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>禁用列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="editBanList()"> 添加禁用列表</el-button>
            </div>
            <div class="text item">
                <div class="itom_con">
                    <span class="con_name listban">
                        {{changeGoodsData.forbid_list}}
                    </span>
                    <span class="cancel_btn" @click="removeTodobanList_edit()">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="booleanBan==true" v-model.trim="banlist_dns"  placeholder="回车添加禁用列表"  v-on:keyup.enter.native="editbanList_dns"></el-input>
            </template>
        </el-card>
        </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="changeGoods = false">取 消</el-button>
          <el-button type="primary" @click="editAdd()">确定修改</el-button>
        </div>
      </el-dialog>
      <!-- 添加游戏 -->
            <!-- x修改商品 -->
         <el-dialog
        title="添加游戏"
        :visible.sync="addGame"
        width="40%"
        center>
         <el-form label-width="80px" label-position="left" :model="addGameData" class="change_dialog">
          <el-form-item label="游戏名">
            <el-input v-model="addGameData.game_name"></el-input>
          </el-form-item>
           <el-form-item label="排序">
            <el-input v-model="addGameData.game_sort"></el-input>
          </el-form-item>
          <el-form-item label="是否收费" prop="is_free">
        <el-radio-group v-model="addGameData.is_free">
          <el-radio label="免费"></el-radio>
          <el-radio label="收费"></el-radio>
        </el-radio-group>
      </el-form-item>
           <el-form-item label="状态" prop="game_status">
        <el-radio-group v-model="addGameData.game_status">
          <el-radio label="上架"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="游戏缩略图" prop="gameImg">
        <el-upload :action="uploadSys"  :limit=1 v-model="addGameData.gameImg" :before-upload="newFile" :http-request="upload" :file-list="gameLogoList">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                <div class="el-upload__tip" slot="tip">jpg/png 格式小于500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="游戏LOGO" prop="gameLogo">
            <el-upload :action="uploadSys"  :limit=1 v-model="addGameData.gameLogo"  :before-upload="newFile" :http-request="upload2" :file-list="thumbnailList">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                    <div class="el-upload__tip" slot="tip">jpg/png 格式小于500kb</div>
            </el-upload>
        </el-form-item>
         <el-form-item label="调度类型" prop="game_diaodu">
        <el-radio-group v-model="addGameData.game_diaodu" v-on:change="radio_c($event)">
          <el-radio label="智能调度"></el-radio>
          <el-radio label="选区调度"></el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="区域" v-show="showArea" style="margin-bottom:10px" class="area_item">
            <el-select v-model="addGameData.areaID">
                <el-option v-for="item in areaID" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="调度选择" v-if="showArea" style="margin-bottom:10px" class="area_item">
                <el-checkbox-group v-model="addGameData.checkList">
                    <el-checkbox label="tcp智能调度"></el-checkbox>
                    <el-checkbox label="udp智能调度"></el-checkbox>
                </el-checkbox-group>
         </el-form-item>
         <el-form-item label="加速模式" prop="speed_type">
        <!-- <el-radio-group v-model="addGameData.speed_type">
          <el-radio label="驱动加速"></el-radio>
          <el-radio label="VPN加速"></el-radio>
        </el-radio-group> -->
        <el-checkbox-group v-model="addGameData.speed_type"  @change="add_c2($event)">
           <el-checkbox v-for="modelJiasu in jiasuModel" :label="modelJiasu" :key="modelJiasu">{{modelJiasu}}</el-checkbox>
        </el-checkbox-group>
         </el-form-item>
         <!-- vpn加速需要填写路由 -->
        <el-form-item label="路由表" prop="luyou_list" v-show="addGameData.booleanLuyou_card==true">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>路由表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addLuyou()"> 添加路由</el-button>
            </div>
            <div class="text item">
                <div class="itom_con">
                    <span class="con_name listban">
                        {{addGameData.luyou_list}}
                    </span>
                    <span class="cancel_btn" @click="removeTodoLuyou()">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="addGameData.booleanLuyou==true" v-model.trim="addGameData.luyou_dns"  placeholder="回车添加白名单"  v-on:keyup.enter.native="addluyou_dns"></el-input>
            </template>
        </el-card>
        </el-form-item>
        <el-form-item label="进程" prop="process_list">
            <!-- <el-input v-model="addGameData.process_name"></el-input> -->
             <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <el-button style="float: right; padding: 3px 0" type="text" @click="addchild_processes()"> 添加进程</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in addGameData.process_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodochild_processes(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="addGameData.boolean3==true" v-model.trim="addGameData.child_processes_value"  placeholder="回车添加进程"  v-on:keyup.enter.native="addchild_processes_key"></el-input>
            </template>
        </el-card>
        </el-form-item> 
        <el-form-item label="子进程" prop="child_processes_status">
            <el-switch
                v-model="addGameData.child_processes_status"
                active-color="#13ce66"
                inactive-color="#ff4949" @change='change'>
            </el-switch>
        </el-form-item> 
        <el-form-item label="一、二级分类" prop="oneClassify" class="gameCategory"><br>
          <treeselect v-model="addGameData.value2" :multiple="multiple" :options="options" :load-options="loadOptions" />
      </el-form-item>
        <el-form-item label="域名白名单" prop="white_list">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>域名白名单</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addWhite()"> 添加白名单</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in addGameData.white_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodo(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="addGameData.boolean==true" v-model.trim="addGameData.white_dns"  placeholder="回车添加白名单"  v-on:keyup.enter.native="addWhite_dns"></el-input>
            </template>
        </el-card>
        </el-form-item>
       <el-form-item label="域名黑名单" prop="">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>域名黑名单</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addBlack()"> 添加黑名单</el-button>
            </div>
            <div class="text item">
                <div v-for="(item, index) in addGameData.black_list" :kay="index" class="itom_con">
                    <span class="con_name">
                        {{item}}
                    </span>
                    <span class="cancel_btn" @click="removeTodoBlack(index)">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="addGameData.boolean2==true" v-model.trim="addGameData.black_dns"  placeholder="回车添加黑名单"  v-on:keyup.enter.native="addBlack_dns"></el-input>
            </template>
        </el-card>
        </el-form-item>
        <el-form-item label="banlist(禁用列表)" prop="">
             <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>禁用列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addBanList()"> 添加禁用列表</el-button>
            </div>
            <div class="text item">
                <div class="itom_con">
                    <span class="con_name listban">
                        {{addGameData.ban_list}}
                    </span>
                    <span class="cancel_btn" @click="removeTodobanList()">x</span>
                </div>
            </div>
            <template>
                <el-input type="textarea" :rows="5" v-show="addGameData.booleanBan==true" v-model.trim="addGameData.banlist_dns"  placeholder="回车添加禁用列表"  v-on:keyup.enter.native="addbanList_dns"></el-input>
            </template>
        </el-card>
        </el-form-item>
        
        
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addGame = false">取 消</el-button>
          <el-button type="primary" @click="saveAddGame()">确定添加</el-button>
        </div>
      </el-dialog>
       <!--下架按钮-->
      <el-dialog
        title="提示"
        :visible.sync="downVisible"
        width="30%"
        center>
        <div class="tooltips">确认下架？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="downVisible = false">取 消</el-button>
          <el-button type="primary" @click="downRow()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 上架 -->
      <el-dialog
        title="提示"
        :visible.sync="upVisible"
        width="30%"
        center>
        <div class="tooltips">确认上架？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="upVisible = false">取 消</el-button>
          <el-button type="primary" @click="upRow()">确 定</el-button>
        </span>
      </el-dialog>
       <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page=currentPage 
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
</template>
<script>
 // import the component
  import Treeselect,{LOAD_ROOT_OPTIONS,LOAD_CHILDREN_OPTIONS} from '@riophae/vue-treeselect'
  import { generateUUId } from "@/common/utils";
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as sysApi from "../../common/sys";
import { getToken } from "../../utils/auth";
import axios from "../../common/axios.js";
const simulateAsyncOperation = fn => {
  setTimeout(fn, 2000)
}
const jiasu=["驱动加速","VPN加速"];
export default {
     components: { Treeselect },
    data() {
        return {
            jiasuModel:jiasu,
            uploadSys:axios.defaults.baseURL+'/api/v1/game/upload',
            checkList:[],
            normal:[],
            normal2:[],
            zhineng:false,
        areaID:[],
        editOptions:[],
        options: null,
        multiple: true,
        options_had: null,
            form: {
                searchKey: '',
                status: '',
                orders: '',
                
             boolean:false,
            boolean2:false,
            boolean3:false,
            },
            gameLogoId: null,
            thumbnailId: null,
            gameLogoList:[],
            thumbnailList:[],
            downVisible:false,
            upVisible:false,
            currentPage:1,
            tableData: [],
            isReadOnly:false,
            isShowDetail: false,
            changeGoods:false,
            addGame:false,
            orders: [{
                id: 1,
                name: '从添加时间从远到近'
            },{
                id: 2,
                name: '从添加时间从近到远'
            }],
            status: [
                {
                    statusId: 1,
                    label: '全部'
                },
                {
                    statusId: 2,
                    label: '上架'
                },
                {
                    statusId: 3,
                    label: '下架'
                }
            ],
              changeGoodsData:{
                  region_id:'',
                  region_name:'',
            game_name:"",
            game_status:"",
             game_diaodu:'',
            gameImg:"",
            gameLogo:"",
            enable_child_process:false,
            oneClassify:"",
            twoClassify:"",
            value2:null,
              game_sort:"",
             dns_name:"",
              file_id:[],
              slt_url:'',
              logo_url:'',
            process_name:"",
            process_list:[],
             child_processes_status:false,
            child_processes_value:'',
            while_list:[],
            child_process_list:[],
            black_list:[],
            childOpen:'',
             childOpen:'',
            while_dns:'',
            black_dns:'',
        },
            isOk:true,
        fileData: {},
        while_list_value_hang:[],
        black_list_value_hang:[],
          addGameData:{
              is_free:3,
              banlist_dns:'',
              ban_list:'',
              booleanBan:false,
              speed_type:[],
              speed_mode:-1,
               speed_mode_vpn:-1,
              dispatch_auto_tcp:'',
              dispatch_auto_udp:'',
              tcp:'',
              udp:'',
            //   zhineng:false,
              checkList:[],
              game_diaodu:0,
              areaID:"",
            value2: null,
            child_processes_status:false,
            child_processes_value:'',
            child_processes_value_hang:[],
            white_list:[],
             process_list:[],
            child_process_list:[],
            black_list:[],
            booleanLuyou:false,
            booleanLuyou_card:false,
            luyou_list:'',
            luyou_dns:'',
            childOpen:'',
            game_name:"",
            white_dns:'',
            white_dns_hang:[],
            black_dns:'',
             black_dns_hang:[],
            boolean:false,
            boolean2:false,
            boolean3:false,
            enable_child:false,
            game_status:"",
            gameImg:"",
            gameLogo:"",
            game_sort:"",
            oneClassify:["全部"],
            twoClassify:"",
            dns_name:"",
            process_name:"",
              slt_url:'',
              logo_url:'',
            file_id:[],
            file_id_logo:"",
            file_id_img:""
        },
        booleanLuyou_card:false,
        total:1,
        rowId:"",
        region_id:'',
        file_id_logo:'',
        file_id_img:"",
        choose:[],
        file_id:[],
        arr_class:[],
        slt_url:'',
        logo_url:'',
        showArea:false,
        showArea1:false,
        banlist_dns:'',
        booleanBan:false,
        diaodu:'',
        diaodu1:'',
        luyou_dns:'',
        dispatch_auto_tcp:"",
        dispatch_auto_udp:"",
        booleanLuyou:false,
        speed_mode_vpn:-1,
        speed_mode:-1,
        speed_mode1:[],
        changeAdd:{
            child_processes_value:"",
            black_dns:"",
            while_dns:""
        },
         is_free:'',  
        }
    },
    methods: {
        // add_free(event){
        //     if(event=="免费"){
        //         this.addGameData.is_free=1
        //     }else if(event=="收费"){
        //         this.addGameData.is_free=0
        //     }
        // },
        edit_free(event){
            if(event=="免费"){
                this.is_free=1
            }else if(event=="收费"){
                this.is_free=0
            }
        },
        // 添加禁用列表
        addBanList(){
            this.addGameData.booleanBan=true;
        },
        editBanList(){
            this.booleanBan=true;
        },
        // 添加单选框事件
       radio_c(event){
           this.diaodu=event;
           if(event=="智能调度"){
              this.showArea=false;
               this.addGameData.checkList=[];
              //this.addGameData.zhineng=true;
           }else{
               this.showArea=true;
              // this.addGameData.zhineng=false;
           }
       },
       //添加加速模式事件
       add_c2(event){
           if(event.length==1){
                if(event[0]=="VPN加速"){
                    this.addGameData.speed_mode_vpn=1;
                    this.addGameData.speed_mode=-1;
                    this.addGameData.booleanLuyou_card=true;
                }else{
                    this.addGameData.speed_mode=0;
                    this.addGameData.speed_mode_vpn=-1;
                    this.addGameData.booleanLuyou_card=false;
                }
           }else if(event.length==2){
               this.addGameData.speed_mode_vpn=1;
               this.addGameData.speed_mode=0;
               this.addGameData.booleanLuyou_card=true;
           }else{
               this.addGameData.speed_mode=-1;
                this.addGameData.speed_mode_vpn=-1;
                this.addGameData.booleanLuyou_card=false;
           }
            this.addGameData.speed_type=event;
        //    if(event=="驱动加速"){
        //         this.addGameData.booleanLuyou_card=false;
        //    }else{
        //        this.addGameData.booleanLuyou_card=true;
        //    }
       },
       //添加加速模式事件
       add_c1(event){
           this.changeGoodsData.speedC=event;
        //    if(event=="驱动加速"){
        //         this.booleanLuyou_card=false;
        //    }else{
        //        this.booleanLuyou_card=true;
        //    }
           if(event.length==1){
                if(event[0]=="VPN加速"){
                    this.speed_mode_vpn=1;
                    this.speed_mode=-1;
                    this.booleanLuyou_card=true;
                }else{
                        this.speed_mode=0;
                    this.speed_mode_vpn=-1;
                    this.booleanLuyou_card=false;
                    
                }
           }else if(event.length==2){
               this.speed_mode_vpn=1;
               this.speed_mode=0;
               this.booleanLuyou_card=true;
           }else{
               this.speed_mode=-1;
                this.speed_mode_vpn=-1;
                this.booleanLuyou_card=false;
           }
       },
     radio_c1(event){
            this.diaodu1=event;
           if(event=="智能调度"){
              this.showArea1=false;
               this.checkList=[];
           }else{
               this.showArea1=true;
           }
       },
       radio_select(event){
           this.region_id=event;
       },
        //加载树型结构
        loadOptions({ action, parentNode, callback }) {
            console.log("初始化加载");
            if ( action == LOAD_ROOT_OPTIONS) {
                sysApi.allClass()
                    .then((res) => {
                        this.options = [];
                        var all = [];
                        res.game_classes.forEach((item,i) => {
                            if (item.second.length > 0) {
                                let child = []
                                item.second.filter((item) => {
                                    child.push({id: generateUUId(), label: item});
                                });
                                all.push({id: generateUUId(), label: item.first, children: child});
                            }else {
                                all.push({id: generateUUId(), label: item.first, children: null});
                            }
                        });
                        this.options = all;
                        console.log("test");
                        console.log(this.options);
                        callback();
                    })
            }
            
        },
        addWhite(){
            this.addGameData.boolean=true;
        },
        addLuyou(){
            this.addGameData.booleanLuyou=true;
        },
        addLuyouEdit(){
            this.booleanLuyou=true;
        },
        addBlack(){
            this.addGameData.boolean2=true;
        },
        addchild_processes(){
            this.addGameData.boolean3=true;
        },
        addWhite_dns(){
            if(this.addGameData.white_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
               this.addGameData.white_dns_hang = this.addGameData.white_dns.replace(/\n/g, ',');
                if (!this.addGameData.white_dns_hang) return false;
                this.addGameData.white_dns_hang = this.addGameData.white_dns_hang.split(",")
                if (this.addGameData.white_dns_hang == []) {
                    alert("请输入要操作的白名单");
                    return false
                }
                this.addGameData.white_list=this.addGameData.white_list.concat(this.addGameData.white_dns_hang);
                console.log(this.addGameData.white_list)
                this.addGameData.boolean=false;
                this.addGameData.white_dns=''
            }
        },
        // 回车添加路由
        addluyou_dns(){
            if(this.addGameData.luyou_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                this.addGameData.luyou_list=this.addGameData.luyou_dns;
                //console.log(this.addGameData.white_list)
                this.addGameData.booleanLuyou=false;
                this.addGameData.luyou_dns=''
            }
        },
        addluyou_dns_edit(){
            if(this.luyou_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                this.changeGoodsData.route_table=this.luyou_dns;
                //console.log(this.addGameData.white_list)
                this.booleanLuyou=false;
                this.luyou_dns=''
            }
        },
        removeTodo(index) {
            this.addGameData.white_list.splice(index, 1);
        },
        removeTodobanList(){
            this.addGameData.ban_list='';
        },
        removeTodobanList_edit(){
            this.changeGoodsData.forbid_list=''
        },
        removeTodoLuyou() {
            this.addGameData.luyou_list='';
        },
        removeTodoLuyou_edit(){
            this.changeGoodsData.route_table='';
        },
        // 回车添加禁用列表
        addbanList_dns(){
            if(this.addGameData.banlist_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                this.addGameData.ban_list=this.addGameData.banlist_dns;
                this.addGameData.booleanBan=false;
                this.addGameData.banlist_dns=""
            }
        }
        ,
        editbanList_dns(){
               if(this.banlist_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                this.changeGoodsData.forbid_list=this.banlist_dns;
                this.booleanBan=false;
                this.banlist_dns=""
            }
        },
        addBlack_dns(){
            if(this.addGameData.black_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
               this.addGameData.black_dns_hang = this.addGameData.black_dns.replace(/\n/g, ',');
                if (!this.addGameData.black_dns_hang) return false;
                this.addGameData.black_dns_hang = this.addGameData.black_dns_hang.split(",")
                if (this.addGameData.black_dns_hang == []) {
                    alert("请输入要操作的黑名单");
                    return false
                }
                this.addGameData.black_list=this.addGameData.black_list.concat(this.addGameData.black_dns_hang);
                console.log(this.addGameData.black_list)
                // this.addGameData.black_list.push(this.addGameData.black_dns);
                this.addGameData.boolean2=false;
                this.addGameData.black_dns=""
            }
        },
        removeTodoBlack(index) {
            this.addGameData.black_list.splice(index, 1);
        },
        // 子进程
        addchild_processes_key(){
            if(this.addGameData.child_processes_value==""){
                this.$message({
                    type:"error",
                    message:"添加内容不能为空"
                })
            }else{
                this.addGameData.child_processes_value_hang = this.addGameData.child_processes_value.replace(/\n/g, ',');
        if (!this.addGameData.child_processes_value_hang) return false;
        this.addGameData.child_processes_value_hang = this.addGameData.child_processes_value_hang.split(",")
        if (this.addGameData.child_processes_value_hang == []) {
            alert("请输入要操作的進程");
            return false
        }
            this.addGameData.process_list=this.addGameData.process_list.concat(this.addGameData.child_processes_value_hang);
 console.log(this.addGameData.process_list)
                //this.addGameData.process_list.push(this.addGameData.child_processes_value);
                this.addGameData.boolean3=false;
                this.addGameData.child_processes_value=""
            }
        },
        removeTodochild_processes(index) {
            this.addGameData.process_list.splice(index, 1);
        },
        change(val){
            this.addGameData.enable_child=val;
        },
        // 编辑修改
         addWhite_edit(){
            this.form.boolean=true;
        },
        addBlack_edit(){
            this.form.boolean2=true;
        },
        addchild_processes_edit(){
            this.form.boolean3=true;
        },
        addWhite_dns_edit(){
            if(this.changeAdd.while_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                 if(this.changeGoodsData.while_list==null){
                    this.changeGoodsData.while_list=[];
                }
                 this.while_list_value_hang = this.changeAdd.while_dns.replace(/\n/g, ',');
        if (!this.while_list_value_hang) return false;
        this.while_list_value_hang = this.while_list_value_hang.split(",")
        if (this.while_list_value_hang == []) {
            alert("请输入要操作的進程");
            return false
        }
            this.changeGoodsData.while_list=this.changeGoodsData.while_list.concat(this.while_list_value_hang);
                //this.changeGoodsData.while_list.push(this.changeAdd.while_dns);
                this.form.boolean=false;
                this.changeAdd.while_dns=""
            }
        },
        removeTodo_edit(index) {
            this.changeGoodsData.while_list.splice(index, 1);
        },
        addBlack_dns_edit(){
            if(this.changeAdd.black_dns==""){
                this.$message({
                    type:"success",
                    message:"添加内容不能为空"
                })
            }else{
                if(this.changeGoodsData.black_list==null){
                    this.changeGoodsData.black_list=[];
                }
                    this.black_list_value_hang = this.changeAdd.black_dns.replace(/\n/g, ',');
        if (!this.black_list_value_hang) return false;
        this.black_list_value_hang = this.black_list_value_hang.split(",")
        if (this.black_list_value_hang == []) {
            alert("请输入要操作的進程");
            return false
        }
            this.changeGoodsData.black_list=this.changeGoodsData.black_list.concat(this.black_list_value_hang);
                //this.changeGoodsData.black_list.push(this.changeAdd.black_dns);
                this.form.boolean2=false;
                this.changeAdd.black_dns=""
            }
        },
        removeTodoBlack_edit(index) {
            this.changeGoodsData.black_list.splice(index, 1);
        },
        // 子进程
        addchild_processes_key_edit(){
            if(this.changeAdd.child_processes_value==""){
                this.$message({
                    type:"error",
                    message:"添加内容不能为空"
                })
            }else{
                if(this.changeGoodsData.process_list==null){
                    this.changeGoodsData.process_list=[];
                }
                 this.child_processes_value_hang = this.changeAdd.child_processes_value.replace(/\n/g, ',');
        if (!this.child_processes_value_hang) return false;
        this.child_processes_value_hang = this.child_processes_value_hang.split(",")
        if (this.child_processes_value_hang == []) {
            alert("请输入要操作的進程");
            return false
        }
            this.changeGoodsData.process_list=this.changeGoodsData.process_list.concat(this.child_processes_value_hang);
                //this.changeGoodsData.process_list.push(this.changeAdd.child_processes_value);
                //console.log(this.changeGoodsData.child_process_list)
                this.form.boolean3=false;
                this.changeAdd.child_processes_value=""
            }
        },
        removeTodochild_processes_edit(index) {
            this.changeGoodsData.process_list.splice(index, 1);
        },
         change2_edit(val){
            this.changeGoodsData.child_processes_status=val;
            this.changeGoodsData.enable_child_process=val
        },



        upload(content){
         let formData = new FormData();
        formData.append("file",content.file);
        formData.append("file_type","缩略图");
        var _this=this;
        let config = { headers: {'Content-Type': 'multipart/form-data','token':getToken()} };
        this.$http.post(content.action,formData,config).then(function(res){
            //_this.gameLogoId = res.data.file_ids[0];
            console.log(res);
            _this.addGameData.slt_url=res.data.slt_url;
            _this.changeGoodsData.slt_url=res.data.slt_url;
        //   _this.file_id.push(res.data.file_ids[0]);
        //   _this.addGameData.file_id.push(res.data.file_ids[0]);
        //   console.log( _this.addGameData.file_id)
        });
      },
          upload2(content){
         let formData = new FormData();
        formData.append("file",content.file);
        formData.append("file_type","logo");
        var _this=this;
        let config = { headers: {'Content-Type': 'multipart/form-data','token':getToken()} };
        this.$http.post(content.action,formData,config).then(function(res){
            _this.addGameData.logo_url=res.data.logo_url;
            _this.changeGoodsData.logo_url=res.data.logo_url;
            //_this.thumbnailId = res.data.file_ids[0];
        //   _this.file_id.push(res.data.file_ids[0]);
        //   _this.addGameData.file_id.push(res.data.file_ids[0]);
        //   console.log( _this.addGameData.file_id)
        });
      },
        classifyBth(event){
            if(event=="全部"){
                var status=""
            }else{
               var status=event
            }
            this.form.status=event
            var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1//第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                    for(var i in res.data){
                         var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                            console.log(res.data)
                    this.total=res.total_count;
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
        },
        sortBtn(event){
            if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
            this.form.orders=event;
            var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                     for(var i in res.data){
                          var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                            this.total=res.total_count;
                            console.log(res);
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
        },
        search(){
                if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
            if(this.form.searchKey==""){
                this.$message({
                    type:"error",
                    message:"搜索框内容不能为空"
                })
            }else{
             
                 var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1//第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
               for(var i in res.data){
                    var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
            }
            
        },
        // 删除游戏
        deleteBtn(index,row){
            this.isShowDetail=true;
            this.rowId=row.id;
        },
        savedele(){
            var pa={
                "id":this.rowId,// 添加的时候不需要传入，修改的时候填入对应的id
            }
               sysApi.deleteGame(pa)
                .then(res => {
                    if(res.success==true){
                        this.isShowDetail=false;
                            if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
            this.currentPage=1
                         //  重新
                           var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                       for(var i in res.data){
                            var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    console.log( this.tableData.gameImg)
                    }
                })
                    }
            })
        },
        handleEdit(row) {
            this.isShowDetail = true;
        },
         changeBtn(row){
            this.changeGoodsData = Object.assign({},row,true);
            this.rowId=row.id;
            this.region_id=row.region_id;
            if(row.is_free=="收费"){
                //this.changeGoodsData.is_free="收费"
                this.is_free=0
            }else if(row.is_free=="免费"){
                //this.changeGoodsData.is_free="免费"
                this.is_free=1
            }
         
            if(row.speed_mode_arr.length==1){
                if(row.speed_mode_arr[0]=="VPN加速"){
                    this.speed_mode_vpn=1;
                    this.speed_mode=-1;
                    this.booleanLuyou_card=true;
                }else{
                    this.speed_mode=0;
                    this.speed_mode_vpn=-1;
                    this.booleanLuyou_card=false;
                }
           }else if(row.speed_mode_arr.length==2){
               this.speed_mode_vpn=1;
               this.speed_mode=0;
               this.booleanLuyou_card=true;
           }else{
                this.speed_mode_vpn=-1;
               this.speed_mode=-1;
               this.booleanLuyou_card=false;
           }
            if(row.dispatch_type=="选区调度"){
            this.showArea1=true;
            //this.zhineng=false;
            this.diaodu1="选区调度"
            }else if(row.dispatch_type=="选区调度(tcp,udp)" || row.dispatch_type=="选区调度(tcp)" || row.dispatch_type=="选区调度(udp)"){
                this.changeGoodsData.dispatch_type="选区调度"
                this.showArea1=true;
                //this.zhineng=true;
                this.diaodu1="选区调度"
                if(row.dispatch_auto_tcp==1&&row.dispatch_auto_udp==1){
                    this.checkList=["tcp智能调度","udp智能调度"]
                }else if(row.dispatch_auto_tcp==0&&row.dispatch_auto_udp==1){
                    this.checkList=["udp智能调度"]
                }else if(row.dispatch_auto_tcp==1&&row.dispatch_auto_udp==0){
                    this.checkList=["tcp智能调度"]
                }
            }else if(row.dispatch_type=="智能调度"){
            this.showArea1=false;
            this.diaodu1="智能调度"
            }
            if(row.region_name=="全球服"){
                this.changeGoodsData.region_name=""
            }
           this.changeGoodsData.child_processes_status=row.enable_child_process;
            this.changeGoods=true;
                    sysApi.region()
                .then(res => {
                    if(res.success==true){
                    console.log(res)
                    this.areaID=[];
                    for(var i=0;i<res.data.length;i++){
                    this.areaID.push({id:parseInt(res.data[i].ID),name:res.data[i].Name,type:parseInt(res.data[i].Type)})
                }
                    }
                })
                 .catch(err=>console.log('请求异常信息:' + err))
            
             sysApi.allClass()
                    .then((res) => {
                        // this.options = [];
                        var all = [];
                        res.game_classes.forEach((item,i) => {
                            if (item.second.length > 0) {
                                let child = []
                                item.second.filter((item) => {
                                    child.push({id: generateUUId(), label: item});
                                });
                                all.push({id: generateUUId(), label: item.first, children: child});
                            }else {
                                all.push({id: generateUUId(), label: item.first, children: null});
                            }
                        });
                        this.editOptions = all;
                        // this.changeGoodsData.value2 = [all[0].id];
                        console.log(row);
                        //console.log(this.tranateOptionData(row.game_classes,this.editOptions));
                        this.changeGoodsData.value2 = this.tranateOptionData(row.game_classes,this.editOptions);
                    })
            
            row.game_classes.forEach((item)=>{
               this.arr_class.push({id: generateUUId(),label:item.first,children:item.second});
            })
      },
      tranateOptionData(all_options,allClass){
          let select_opts = [];
          all_options.forEach(item => {
              var obj = allClass.find(it => {
                  if (it.label === item.first) {
                      //判断子集合是否相同
                      if(it.children.length == item.second.length) {
                          select_opts.push(it.id);
                      }else {
                          item.second.filter(te => {
                             var obj =  it.children.find(tm => tm.label == te);
                             if (obj) {
                                 select_opts.push(obj.id);
                             }
                             
                          })
                      }
                  }
              })
          });
          return select_opts;
      },
      addGameBtn(){
          this.addGame=true;
              sysApi.region()
                .then(res => {
                    if(res.success==true){
                    console.log("添加游戏按钮点击");
                    console.log(res)
                    this.areaID=[];
                    for(var i=0;i<res.data.length;i++){
                    this.areaID.push({id:parseInt(res.data[i].ID),name:res.data[i].Name,type:parseInt(res.data[i].Type)})
                }
                    }
                })
                 .catch(err=>console.log('请求异常信息:' + err))
          var _this=this;
      },
   
      cancelBtn(index,row){
          this.rowId=row.id;
          if(row.game_status=="上架"){
              this.downVisible=true;
          }else{
               this.upVisible=true;
          }
      },
    //   确认下架按钮
    downRow(){
          var pa={
            "id":this.rowId,// 添加的时候不需要传入，修改的时候填入对应的id
        }
        sysApi.gameDown(pa)
                .then(res => {
                    if(res.success==true){
                         this.downVisible=false;
                             if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
            //  重新
            var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
            sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                     for(var i in res.data){
                          var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    console.log( this.tableData.gameImg)
                    }
                })
                    }
          })
    },
    upRow(){
             var pa={
            "id":this.rowId,// 添加的时候不需要传入，修改的时候填入对应的id
        }
        
        sysApi.gameUp(pa)
                .then(res => {
                    if(res.success==true){
                         this.upVisible=false;
                        //  重新
                            if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
                           var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                     for(var i in res.data){
                          var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    console.log( this.tableData.gameImg)
                    }
                })
                    }
          })
    },
     newFile(file) {
        console.log(file);
        this.fileData = file;
         const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.5;
 
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式或者png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500k!');
        }
        return isJPG && isLt2M;
      },
    
    //   一级分类
        goodsSelect(event){
           console.log(event);
        },
   
    // gameUpload
    editAdd(){
            let arr1 = [];
 this.changeGoodsData.value2.forEach((item) => {
              var firtData = this.findFromFirstClass2(item);
              if (firtData) {
                  var child = [];
                  firtData.children.filter((item) => {
                      child.push(item.label);
                  });
                  arr1.push({first:firtData.label,second: child});
                  return false;
              }
              var sec = this.findFromSecondClass2(item);
              if (sec) {
                  var isObjects = arr1.find(item => item.first === sec.first);
                  if (isObjects) {
                      isObjects.second.push(sec.second);
                      return false;
                  }else {
                      arr1.push({first:sec.first, second: [sec.second]});
                      return false;
                  }
              }
          })
            if(this.diaodu1=="选区调度"){
           if(this.checkList.length==2){
               this.dispatch_auto_tcp=1;
               this.dispatch_auto_udp=1;
           }else{
               if(this.checkList.length==1){
                   if(this.checkList[0]=="tcp智能调度"){
                      this.dispatch_auto_tcp=1; 
                      this.dispatch_auto_udp=0;
                   }else{
                       this.dispatch_auto_tcp=0; 
                      this.dispatch_auto_udp=1;
                   }
               }
           }
       }else{
            this.dispatch_auto_tcp=0; 
            this.dispatch_auto_udp=0;
       }
            var pa={
                "id":this.rowId,
        "game_name":this.changeGoodsData.game_name,//游戏名字
        "is_free":this.is_free,//s是否免费
        "game_status":this.changeGoodsData.game_status,//游戏状态
        "dns_white_list":this.changeGoodsData.while_list,//dns名称
        "dns_black_list":this.changeGoodsData.black_list,// 域名黑名单
        "enable_child":this.changeGoodsData.enable_child_process,// 是否开启子进程，true开启，false关闭
        "process_list":this.changeGoodsData.process_list,
        "game_sort":parseInt(this.changeGoodsData.game_sort),
        "slt_url":this.changeGoodsData.slt_url,
        "logo_url":this.changeGoodsData.logo_url,
        "game_classes":arr1,
        // "speed_mode":this.changeGoodsData.speed_mode=="驱动加速"?0:1,//进程名称
        "speed_mode":this.speed_mode,//进程名称
        "speed_mode_vpn":this.speed_mode_vpn,
        "route_table":this.changeGoodsData.route_table,
        "forbid_list":this.changeGoodsData.forbid_list,
         "dispatch_auto_tcp":parseInt(this.dispatch_auto_tcp),
        "dispatch_auto_udp":parseInt(this.dispatch_auto_udp),
          "region_id":this.diaodu1=="智能调度"?0:this.region_id, // 区域id
        "dispatch_type":this.diaodu1=="智能调度"?0:1, //调度方式
                }
         sysApi.addgameManage(pa)
                .then(res => {
                    if(res.success==true){
                        this.currentPage=1;
                        this.changeGoods=false;
                                   //  重新
                                       if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
                           var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                for(var i in res.data){
                     var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res)
                    }
                })
                 .catch(err=>console.log('请求异常信息:' + err))
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
    },
      saveAddGame(){
          console.log(this.addGameData.value2);
          let arr = [];
          if(this.addGameData.value2!==null){
                 this.addGameData.value2.forEach((item) => {
              var firtData = this.findFromFirstClass(item);
              if (firtData) {
                  var child = [];
                  firtData.children.filter((item) => {
                      child.push(item.label);
                  });
                  arr.push({first:firtData.label,second: child});
                  return false;
              }
              var sec = this.findFromSecondClass(item);
              if (sec) {
                  var isObjects = arr.find(item => item.first === sec.first);
                  if (isObjects) {
                      isObjects.second.push(sec.second);
                      return false;
                  }else {
                      arr.push({first:sec.first, second: [sec.second]});
                      return false;
                  }
              }
          })
          }
       console.log(this.addGameData.checkList[0]);
       if(this.diaodu=="选区调度"){
           if(this.addGameData.checkList.length==2){
               this.addGameData.dispatch_auto_tcp=1;
               this.addGameData.dispatch_auto_udp=1;
           }else{
               if(this.addGameData.checkList.length==1){
                   if(this.addGameData.checkList[0]=="tcp智能调度"){
                      this.addGameData.dispatch_auto_tcp=1; 
                      this.addGameData.dispatch_auto_udp=0;
                   }else{
                       this.addGameData.dispatch_auto_tcp=0; 
                      this.addGameData.dispatch_auto_udp=1;
                   }
               }
           }
       }else{
            this.addGameData.dispatch_auto_tcp=0; 
            this.addGameData.dispatch_auto_udp=0;
       }
        if(this.addGameData.is_free=="免费"){
                this.addGameData.is_free=1
            }else if(this.addGameData.is_free=="收费"){
                this.addGameData.is_free=0
            }
          var pa={
                "id":0,
        "game_name":this.addGameData.game_name,//游戏名字
        "is_free":this.addGameData.is_free,//是否免费
        "game_status":this.addGameData.game_status,//游戏状态
        "dns_white_list":this.addGameData.white_list,//dns名称
        "dns_black_list":this.addGameData.black_list,// 域名黑名单
        "enable_child":this.addGameData.enable_child,// 是否开启子进程，true开启，false关闭
         "child_processes":this.addGameData.child_process_list, // 子进程
         "process_list":this.addGameData.process_list,
        "speed_mode":this.addGameData.speed_mode,//进程名称
        "speed_mode_vpn":this.addGameData.speed_mode_vpn,
        "route_table":this.addGameData.luyou_list,
        "forbid_list":this.addGameData.ban_list,
        "game_sort":parseInt(this.addGameData.game_sort),
        //"file_ids":[...[this.gameLogoId],this.thumbnailId],//这里请上传游戏logo与游戏缩略图的file_id
        "slt_url":this.addGameData.slt_url,
        "logo_url":this.addGameData.logo_url,
        "game_classes":arr,
        "dispatch_auto_tcp":parseInt(this.addGameData.dispatch_auto_tcp),
        "dispatch_auto_udp":parseInt(this.addGameData.dispatch_auto_udp),
        "region_id":this.diaodu=="智能调度"?0:this.addGameData.areaID, // 区域id
        "dispatch_type":this.diaodu=="智能调度"?0:1, //调度方式

                }
         sysApi.addgameManage(pa)
                .then(res => {
                    if(res.success==true){
                        this.addGame=false;
                        this.gameLogoList=[];
                        this.thumbnailList=[];
                    this.addGameData.game_name=""
                    this.addGameData.dispatch_auto_tcp=""
                    this.addGameData.dispatch_auto_udp=""
                    this.diaodu='' 
                    this.addGameData.game_diaodu="" 
                    this.addGameData.areaID=''
                    this.addGameData.game_status="" 
                    this.addGameData.white_list=[]; 
                    this.addGameData.black_list=[];
                    this.addGameData.child_process_list=[]; 
                    this.addGameData.process_list=[];
                    this.addGameData.game_sort="" ;
                    this.addGameData.value2=null;
                                   //  重新
                if(this.form.status=="全部"){
                    var status=""
                }else{
                    var status=this.form.status
                }
                           var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':1 //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                   for(var i in res.data){
                        var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res)
                    }
                })
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
          console.log(arr);
      },
      //从一级分类里面寻找数据
      findFromFirstClass(id) {
        return  this.options.find((item) => item.id == id)
      },
      //从二级分类里面找
      findFromSecondClass(id) {
          var obj = null;
          this.options.forEach((ite) => {
              if (ite.children) {
                  ite.children.filter((item) => {
                      if (item.id === id) {
                          obj = {first: ite.label, second: item.label}
                      }
                  })
              }
          })
          return obj;
      },
        //从一级分类里面寻找数据
      findFromFirstClass2(id) {
        return  this.editOptions.find((item) => item.id == id)
      },
      //从二级分类里面找
      findFromSecondClass2(id) {
          var obj = null;
          this.editOptions.forEach((ite) => {
              if (ite.children) {
                  ite.children.filter((item) => {
                      if (item.id === id) {
                          obj = {first: ite.label, second: item.label}
                      }
                  })
              }
          })
          return obj;
      },
      handleCurrentChange(val){
          this.currentPage = parseInt(`${val}`);
              if(this.form.status=="全部"){
                var status=""
            }else{
               var status=this.form.status
            }
           var pa={
                'game_status':status,//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':this.currentPage //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                        console.log(res);
                            for(var i in res.data){
                                 var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                           
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                           
                        }
                            this.tableData=res.data;
                            this.total=res.total_count;
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
      },
      init(){
            var pa={
                'game_status':"",//游戏状态
                'desc':this.form.orders=="从添加时间从远到近"?false:true,//是否按照添加时间降序，降序，true，升序：false
                'condition':this.form.searchKey,// 关键字搜索：游戏名称
                'page':this.currentPage //第几页
                }
         sysApi.gameManage(pa)
                .then(res => {
                    if(res.success==true){
                        for(var i in res.data){
                            var speedZ=''
                            if(res.data[i].speed_mode_arr.length==2){
                                var speedZ=res.data[i].speed_mode_arr[0]+","+res.data[i].speed_mode_arr[1]
                            }else if(res.data[i].speed_mode_arr.length==1){
                                var speedZ=res.data[i].speed_mode_arr[0]
                            }else{
                                var speedZ="";
                            }
                           res.data[i].speedZ=speedZ;
                            if(res.data[i].dispatch_type==1){
                                if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp,udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==1){
                                    res.data[i].dispatch_type="选区调度(tcp)"
                                }else if(res.data[i].dispatch_auto_udp==1&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度(udp)"
                                }else if(res.data[i].dispatch_auto_udp==0&&res.data[i].dispatch_auto_tcp==0){
                                    res.data[i].dispatch_type="选区调度"
                                }
                            }else{
                                res.data[i].dispatch_type="智能调度"
                            }
                            if(res.data[i].region_name==""){
                                res.data[i].region_name="全球服"
                            }
                            if(res.data[i].is_free==0){
                                res.data[i].is_free="收费"
                            }else if(res.data[i].is_free==1){
                                res.data[i].is_free="免费"
                            }
                        }
                            this.tableData=res.data;
                            this.total=res.total_count;
                            
                    }
                })
        .catch(err=>console.log('请求异常信息:' + err))
      }
    },
    created(){
        this.init();
    }
}
</script>
<style lang="scss" scope>
.listban{
    width: 90%;
    display: block;
    word-wrap: break-word; word-break: normal;
}
.el-form--label-left .el-form-item__label{
    width: 100px;
}
.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    float: left;
}
.el-upload__tip {
    font-size: 12px;
    color: #606266;
    /* margin-top: 7px; */
    float: left;
    margin-left: 10px;
}
.change_dialog .el-form-item__content{
    margin-left: 20%!important;
}
.change_dialog .el-form-item__label{
    display: block!important;
    text-align: right
}
.change_dialog  .el-form-item__label{
    width: 16%!important;
}
.el-form-item {
    margin-bottom: 10px;
  }
.gameCategory {
    height: 83px;
    line-height: 118px;
    .vue-treeselect__placeholder {
        line-height: 40px;
    }
}
.gameCategory .el-form-item__label{
     height: 83px;
    line-height: 118px;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

            .itom_con{
                overflow:hidden;
            }
            .con_name{
                float:left
            }
            .cancel_btn{
                float:right;
                cursor: pointer;
            }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .change_dialog .box-card{
      width: auto!important;
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .area_item{
      margin-bottom:10px!important;
  }
</style>



