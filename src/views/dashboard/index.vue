<template>
  <div style="background-color: rgb(240, 240, 240)">
    <div style="padding: 30px 50px">
      <span style="font-weight: bold; color: rgb(216, 156, 120)"
        >当前时间:{{ nowDate }}</span
      >
      <el-divider direction="vertical"></el-divider>
      <span style="font-weight: bold; color: dodgerblue; font-size: " primary
        >欢迎你,{{ name }}</span
      >
      <el-divider direction="vertical"></el-divider>
      <span style="font-weight: bold; color: rgb(234, 78, 75); font-size: 200%"
        >今日电影推荐如下</span
      >
    </div>
    <div style="padding: 10px 200px">
      <el-carousel
        :interval="2000"
        type="card"
        height="350px"
        indicator-position="outside"
      >
        <el-carousel-item
          style="width: 280px; display: flex"
          v-for="item in tableData"
          :key="item.id"
          :label="item.film_name"
        >
          <img
            style="width: 280px"
            :src="item.image_src"
            @click="shop(item)"





            alt="轮播图"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import request from "../../utils/re";
import store from "@/store";
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      nowDate: "",
      tableData: [
      ],
    };
  },
  created() {
    console.log(store)
  },
  methods: {
    shop(film){
      sessionStorage.id=film.id
      this.$router.push(
        {path:"/sellticket"})
    },
    load() {
      request
        .post("film/selectShowFilm")
        .then((res) => {
          this.tableData = res.data;
        });
    },
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let time = new Date();
      let year = time.getFullYear();
      const month = (time.getMonth() + 1).toString().padStart(2, "0");
      const date = time.getDate().toString().padStart(2, "0");
      const hours = time.getHours().toString().padStart(2, "0");
      const minute = time.getMinutes().toString().padStart(2, "0");
      const second = time.getSeconds().toString().padStart(2, "0");
      this.nowDate =year+"年"+month+"月"+date+"日"+ hours + "时" + minute + "分" + second + "秒";
    },
  },
  mounted() {
    this.currentTime();
    this.load();
  },

  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate);
    }
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
