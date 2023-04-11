<template>
    <div id="app1">
		<el-drawer  style="width: 100%"  title="请完成支付" :visible.sync="visible" direction='rtl' :before-close="cancelForm" size="30%">
        <div class="demo-drawer__content">
		<img id="id" src="../../icons/img/pay.png" height="400" width="400" style="visibility:visible" >
          <div class="demo-drawer__footer" style="margin-left: 80px">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="subsuccess()">确 定</el-button>
          </div>
        </div>
  
      </el-drawer>
			<div class="box">
				<div id="room">
					<div class="row" style="margin-left:25%;">
						<div style="margin-left: 20px;">
							<div class="sit bg-sit"></div>
							<div>可选座位</div>
						</div>
						<div style="margin-left: 20px;">
							<div class="sit bg-sited"></div>
							<div>已售座位</div>
						</div>
						<div style="margin-left: 20px;">
							<div class="sit bg-temp"></div>
							<div>已选座位</div>
						</div>
					</div>
					<div class="row" style="width: 100%;text-align: center;">
						<span>
							银幕中央
						</span>
						<hr style="width: 90%;">
					</div>
					<div v-for="(item,i) in list" class="row" style="margin-left: 15%;">
						<div class="sit bg-nosit" style="margin-right:50px">{{i+1}}</div>
						<div @click="selectSeat(item1,i,j)" :class="['sit',{'bg-temp':item1==3},{'bg-sited':item1==2},{'bg-sit':item1==1},{'bg-nosit':item1==0}]"
						 v-for="(item1,j) in item">
						</div>
					</div>
				</div>
				<div class="win-right">
					<div class="row">
						<div>
							<img class="film-img" :src="filmSession.image_src" alt="">
						</div>
						<div>
							<div class="row film-title">{{filmSession.film_name}}</div>
							<div class="row">类型：{{filmSession.type}}</div>
							<div class="row">时长：{{filmSession.time}}</div>
						</div>
					</div>
					<div class="row">
						<span>影院：</span>
						<span>{{filmSession.cinema}}</span>
					</div>
					<div class="row">
						<span>影厅：</span>
						<span>{{filmSession.cinema_type}}</span>
					</div>
					<div class="row">
						<span>电影开场时间：</span>
						<span>{{filmSession.begin_time}}</span>
					</div>
					<div class="row">
						<span>当前时间：</span>
						<span>{{fstartTime|time}}</span>
					</div>
					<div class="row">
						<span>票价：</span>
						<span>￥{{filmSession.price}}/张</span>
					</div>
					<div class="row">
						<span>票量：</span>
						<span>余票：{{filmSession.seat_number}}张，已售：{{100-filmSession.seat_number}}张</span>
					</div>
					<div class="row">
						<div>座位：</div>
						<div v-for="sit in msg">
							<div>
								<div class="select-sit">{{sit|f3}}</div>
							</div>
						</div>
					</div>
					<div class="row">
						<span>总价：</span>
						<span style="font-size: 25px;color: red;font-weight: 900;">￥{{filmSession.price*msg.length|price}}</span>
					</div>
					<div class="row">
						<el-button type="button" class="btn" :disabled="msgCount==0" @click="sub">确认选座</el-button>
					</div>
				</div>
			</div>
		</div>
</template>
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/layer/2.3/layer.js"></script>
<script>
import request from "../../utils/re";
export default {
    data() {
      return {
					visible: false,
                    id:null,
					fstartTime: new Date(),
					// 场次信息
					filmSession: {
					},
					// 座位状态数组
					list: [
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
					],
					seat:[],
					// 已选座位数
					msgCount: 0,
					// 选座信息
					msg: []
				}
    },
    created(){
        this.getParams() 
        this.load()
    },
    destroyed(){
        sessionStorage.fsid=false
    },
    methods: {
        load(){
        request
          .post("filmscene/getFilmInfoByFSID", {
            film_scene_id:this.id
          })
          .then((res) => {
            this.filmSession = res.data;
			this.seat=res.data.seat;
			if(this.seat!=null){
				this.seat.forEach((td)=>{
				this.list[parseInt(td.x)][parseInt(td.y)] = 2
			})
			}
			
          });
        },
		cancelForm() {
        this.visible = false;
      },
        getParams(){
                this.id  = sessionStorage.fsid;
        },
        // 选座时触发
        selectSeat(data, x, y) {
        if (data == 1 && this.msgCount <= 3) {
            this.$set(this.msg, this.msgCount++, [x, y]);
            this.list[x][y] = 3;
        } else if (data == 3) {
        // 用于记录要删除的座位下标
        var temp = null;
        for (var i = 0; i < this.msg.length; i++) {
            if (this.msg[i][0] == x && this.msg[i][1] == y) {
                    temp = i;
                    break;
            }
        }
        this.msgCount--;
        this.$delete(this.msg, temp);
        this.list[x][y] = 1;
        } else {
            if (this.msgCount == 4) {
                this.$message({
                    type: "error",
                    message:"最多只能订4张票！",
                });
            }
        }
        },
		sub(){
			this.visible=true
		},
        // 确认选座时触发
        subsuccess() {
		request
          .post("filmscene/setOrder", {
            film_scene_id:this.id,
			user_id:this.$store.getters.id,
			amount:this.msgCount*this.filmSession.price,
			orderdate:this.fstartTime,
			seat_number:this.filmSession.seat_number-this.msgCount,
			msg:this.msg
          })
          .then((res) => {
			if(res.code==0){
				this.$message({
                      type: "success",
                      message: "支付成功，即将跳转首页",
                    });				
				this.$router.push({path:"/"})
			}
          });
        }
	},
    // 过滤器
    filters: {
        // 选座信息过滤器
        f3(data) {
            return (data[0] + 1) + "排 | " + (data[1] + 1) + "座";
        },
        // 日期过滤器
        time(data) {
            var date = new Date(data);
			var year=data.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours() > 9 ? date.getHours() : ("0" + date.getHours());
            var minutes = date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes());
            return year+"年"+month + "月" + day + "日  " + hours + ":" + minutes;
        },
        // 价格过滤器,数字保留两位小数
        price(data) {
            var price = parseFloat(data);
            return price.toFixed(2);
        }
    }	

}

</script>
<style>
			#app1 div {
				/* border: 1px solid black; */
				float: left;
			}

			#room {
				/* width: 300px; */
				width: 68%;
				border: 1px solid black;
				padding: 20px 20px 20px 20px;
			}

			.sit {
				height: 35px;
				width: 35px;
				min-height: 10px;
				min-width: 10px;
				margin: 4px 4px 4px 4px;
				background-size: cover;
				/* border: 1px solid black; */
			}
			
			/* 座位 */
			.bg-sit {
				background-image: url('../../icons/img/free.png');
			}
			
			.bg-sit:hover {
				cursor: pointer;
			}
			
			/* 已售座位 */
			.bg-sited {
				/* background-color: red; */
				background-image: url('../../icons/img/yixuan.png');
			}
			
			/* 空位置 */
			.bg-nosit {
				/* border: 1px solid white; */
			}
			
			/* 已选座位 */
			.bg-temp {
				cursor: pointer;
				background-image: url('../../icons/img/kexuan.png');
			}
			
			/* 已选座位号 */
			.select-sit {
				border: 2px orange solid;
				border-radius: 10px;
				margin-left: 10px;
				padding: 4px 10px 4px 10px;
				background-color: rgba(255, 0, 0, 0.2);
			}

			.row {
				/* 清除格式并换行 */
				clear: both;
			}
			
			/* 确认选座按钮 */
			.btn {
				border-radius: 10px;
				width: 200px;
				height: 50px;
				/* padding: 4px 10px 4px 10px; */
				background-color: rgba(225, 208, 27, 0.2);
				font-size: 25px;
				color: white;
				font-family: '微软雅黑';
			}
			
			/* 右侧信息栏 */
			.win-right {
				padding-left: 2%;
				padding-top: 2%;
				width: 27%;
				background-color: rgba(112, 112, 112, 0.2);
				border: 1px white solid;
				height: 100%;
			}
			
			/* 整体容器 */
			.box {
				width: 100%;
				margin-left: 0%;
				height: 64%;
			}
			
			/* 电影封面 */
			.film-img {
				width: 80%;
			}
			
			/* 电影名 */
			.film-title {
				font-family: "微软雅黑";
				font-weight: 900;
				font-size: 25px;
			}

			#app {
				height: 100%;
			}

</style>
