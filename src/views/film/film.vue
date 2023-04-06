<template>
  <div>
  <div style="margin-bottom:15px;width:40%;margin-left: 30%;margin-top: 5px;margin-right: 30%;">
    <el-input 
              v-model="search"
              size="medium"
              placeholder="输入影片名搜索,回车查询"
              @keyup.enter.native="load"
              clearable
            >
          </el-input>
        </div>
    <div class="no-cinema" v-if="this.listlength">
      <p>抱歉，没有找到相关结果，请尝试用其他名称筛选。</p>
    </div>        
  <div class="film-item" v-for="(item,index) in items" :key="item.id" v-on:mouseover="mon(index)" v-on:mouseleave="mlf(index)">
    <div >
        <img class="poster" :src="item.imageSrc" @click="shop(item)">
      <div class="film-item-hover" v-if="index==mainIndex"  @click="shop(item)">
        <!-- 海报 -->
          <img class="poster-hover" :src="item.imageSrc" @click="shop(item)">
          <!-- 鼠标划过时显示的信息 -->
          <div class="film-hover-info">
            <div class="title-hover">
              <span class="name-tags">{{item.filmName}}</span>
            </div>
            <div class="title-hover">
              <span class="name-tags">类型: </span>{{item.type}}
            </div>
            <div class="title-hover">
              <span class="name-tags">导演: </span>{{item.role}}
            </div>
            <div class="title-hover">
              <span class="name-tags">上映时间: </span>{{item.releaseYear}}
            </div>
          </div>
      </div>
    </div>
<!--     显示电影下面的电影名字 -->
    <div class="title-style" @click="shop(item)" style="cursor: pointer;">
                {{item.filmName}}
    </div>
  </div>
  <div style="margin: 10px 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 250]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
</div>
</template>

<script>
import request from "../../utils/re";
import store from "@/store";
export default {
  name: "film-item",
  data() {
    return {
      currentPage: 1,
      listlength:false,
      pageSize: 10,
      total: 0,
      search: "",
      items:[],
      mainIndex:-1
    }
  },
  created(){
    this.load();
  },
  methods: {
    mon(index){
       this.mainIndex = index;
    },
    mlf(index){
       this.mainIndex =-1
    },
    shop(film){
      store.id=film.id
      this.$router.push(
        {path:"/sellticket"})
    },
    load() {
      request
        .post("/film/selectALLPageFilm", {
          pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
        })
        .then((res) => {
          this.items = res.data.content;
          this.total = res.data.totalSize;
          this.items.forEach((item)=>{item.isHover=false});
          if(this.items.length==0){
            this.listlength=true
          }else{
            this.listlength=false
          }        
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.load();
    },
  }
}
</script>

<style scoped>
.no-cinema{
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 16px;
  color: #333;
}
.film-item{
  margin-top: 30px;
  margin-left: 30px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}

.poster{
  width: 160px;
  height: 220px;
}

.title-style{
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 10px;
}

.score{
  color: #ffb400;
  font-size: 24px;
  font-style: italic;
}

a{
  text-decoration: none;
  color: #333;
}

.film-item-hover{
  position: absolute;
  width: 218px;
  height: 300px;
  z-index: 10;
  top: -40px;
  left: -29px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 16px #fff, 0 0 6px rgba(0, 0, 0, 0.2);
}

.poster-hover{
  width: 218px;
  height: 300px;
}

.film-hover-info{
  padding: 16px;
  height: 150px;
  box-sizing: border-box;
  position: absolute;
  z-index: 11;
  top: 150px;
  background: #fff;
  width: 218px;
  color: #999;
}

.title-hover:first-child{
  font-size: 20px;
  line-height: 20px;
  margin-top: 6px;
}

.title-hover{
  font-size: 16px;
  line-height: 16px;
  margin-top: 12px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name-tags{
  cursor: pointer;
  color: #333;
}

</style>

