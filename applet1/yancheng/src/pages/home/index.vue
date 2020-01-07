<template>
  <div class="tagBall" @touchstart="touchStart" @touchend="touchEnd">
    <div
      class="tag"
      target="_blank"
      href="http://keleyi.com"
      v-for="(item,index) in tagEleList"
      :style="{color: item.colorVal, opacity: opacityVal, filter:filterVal, fontSize: fontSizeVal, zIndex: zIndexVal, left: item.leftVal, top:item.topVal}"
      :key="index"
    >{{item.name}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import navBar from "@/components/navbar";
export default {
  components: {
    navBar
  },
  data() {
    return {
      tagEleList: [
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        },
        {
          name: "我喜欢你",
          colorVal: "",
          fontSizeVal: "0",
          opacityVal: "0",
          filterVal: "0",
          zIndexVal: "0",
          topVal: "0",
          leftVal: "0"
        }
      ],
      tag: "",
      tagEle: "",
      paper: "",
      RADIUS: 300,
      fallLength: 500,
      tags: [],
      angleX: Math.PI / 500,
      angleY: Math.PI / 500,
      CX: "",
      CY: "",
      EY: 50,
      EX: 90,
      a: "",
      b: "",
      k: ""
    };
  },
  mounted() {
    var _this = this;
    wx
      .createSelectorQuery()
      .selectAll(".tag")
      .boundingClientRect(function(rect) {
        _this.tagEle = rect;
      })
      .exec();
    wx
      .createSelectorQuery()
      .selectAll(".tagBall")
      .boundingClientRect(function(rect) {
        _this.paper = rect[0];
        _this.CX = _this.paper.width / 2;
        _this.CY = _this.paper.height / 2;
      })
      .exec();
    setTimeout(() => {
      this.innit();
      this.animate();
    }, 500);
  },
  methods: {
    innit() {
      var _this = this;
      _this.tag = function(ele, x, y, z) {
        this.ele = ele;
        this.x = x;
        this.y = y;
        this.z = z;
        this.move = function(sn) {
          var scale = _this.fallLength / (_this.fallLength - this.z);
          var alpha = (this.z + _this.RADIUS) / (2 * _this.RADIUS);
          _this.tagEleList[sn].fontSizeVal = 15 * scale + "px";
          _this.tagEleList[sn].opacityVal = alpha + 0.5;
          _this.tagEleList[sn].filterVal =
            "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
          _this.tagEleList[sn].zIndexVal = parseInt(scale * 100);
          _this.tagEleList[sn].leftVal =
            this.x + _this.CX - this.ele.width / 2 + "px";
          _this.tagEleList[sn].topVal =
            this.y + _this.CY - this.ele.height / 2 + "px";
        };
      };

      for (var i = 0; i < _this.tagEle.length; i++) {
        _this.k = (2 * (i + 1) - 1) / this.tagEle.length - 1;
        _this.a = Math.acos(_this.k);
        _this.b = _this.a * Math.sqrt(_this.tagEle.length * Math.PI);
        var x = _this.RADIUS * Math.sin(_this.a) * Math.cos(_this.b);
        var y = _this.RADIUS * Math.sin(_this.a) * Math.sin(_this.b);
        var z = _this.RADIUS * Math.cos(_this.a);
        var t = new _this.tag(_this.tagEle[i], x, y, z);
        _this.tagEleList[i].colorVal =
          "rgb(" +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          ")";
        _this.tags.push(t);
        t.move(i);
      }
    },
    animate() {
      var _this = this;
      setInterval(function() {
        _this.rotateX();
        _this.rotateY();
        var list = _this.tagEleList;
        _this.tags.forEach(function(value, n) {
          var scale = _this.fallLength / (_this.fallLength - value.z);
          var alpha = (value.z + _this.RADIUS) / (2 * _this.RADIUS);
          list[n].fontSizeVal = 15 * scale + "px";
          list[n].opacityVal = alpha + 0.5;
          list[n].filterVal = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
          list[n].zIndexVal = parseInt(scale * 100);
          list[n].leftVal = value.x + _this.CX - value.ele.width / 2 + "px";
          list[n].topVal = value.y + _this.CY - value.ele.height / 2 + "px";
        });
        _this.tagEleList = list;
      }, 30);
    },
    rotateX() {
      var _this = this;
      var cos = Math.cos(_this.angleX);
      var sin = Math.sin(_this.angleX);
      _this.tags.forEach(function(XVal) {
        var y1 = XVal.y * cos - XVal.z * sin;
        var z1 = XVal.z * cos + XVal.y * sin;
        XVal.y = y1;
        XVal.z = z1;
      });
    },
    rotateY() {
      var _this = this;
      var cos = Math.cos(_this.angleY);
      var sin = Math.sin(_this.angleY);
      _this.tags.forEach(function(YVal) {
        var x1 = YVal.x * cos - YVal.z * sin;
        var z1 = YVal.z * cos + YVal.x * sin;
        YVal.x = x1;
        YVal.z = z1;
      });
    },
    touchStart(event) {
      var _this = this;
      var x = event.clientX - _this.EX - _this.CX;
      var y = event.clientY - _this.EY - _this.CY;
      _this.angleY = x * 0.0001;
      _this.angleX = y * 0.0001;
    },
    touchEnd(event) {
      var _this = this;
      var x = event.clientX - _this.EX - _this.CX;
      var y = event.clientY - _this.EY - _this.CY;
      _this.angleY = x * 0.0001;
      _this.angleX = y * 0.0001;
    }
  }
};
</script>

<style lang="less" scoped>
.tagBall {
  width: 400px;
  height: 400px;
  margin: 50px auto;
  position: relative;
}

.tag {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  color: #000;
  text-decoration: none;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
}

.tag:hover {
  border: 1px solid #666;
}
</style>
