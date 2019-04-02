<template>
  <div id="app">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>

export default {
  name: 'APP'
}
</script>

<style lang="scss">
blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
  margin: 0;
  padding: 0;
}
.main-header{
  background: #242f42!important;
}
.main-header .navbar .navbar-custom-menu{
  color: #fff!important;
}
.main-sidebar .vue-scrollbar .sidebar{
  background: #242f42!important;
}
.main-sidebar.expandSide{
  background: #242f42!important;
}
.el-menu{
  background: #242f42!important;
}
.main-sidebar .vue-scrollbar .sidebar .el-menu-style .el-submenu .el-menu-item span{
  color: #fff;
}
.el-menu-item{
  color: #fff!important;
}
.el-form-item{
  margin-bottom: 0px!important;
}
.main-sidebar .vue-scrollbar .sidebar .el-menu-style .el-submenu .el-menu-item.is-active span{
  color:#409EFF!important;
}

.el-submenu__title *{
  color: #fff!important;
}
.el-menu-item.is-active {
    color: #409EFF!important;
}
html, body, #app {
    height: 100%;
    padding: 0;
    margin: 0;
}
.main-header .logo .logo-lg b{
  color: #fff!important;
}
.el-dropdown{
   color: #fff!important;
}
.main-header .navbar{
    background: #242f42!important;
}
*,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.main-sidebar .vue-scrollbar{
  background: #242f42!important;
}
ul{
  width: auto!important;
}
a, a:focus, a:hover {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
.el-dropdown:hover span{
   color: #242f42!important;
}

</style>
