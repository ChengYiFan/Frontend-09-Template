const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATION = Symbol("animation");
const START_TIME = Symbol("start-time");   // 添加的时间
const PAUSE_START = Symbol("pause-start");   // 开始暂停的时间
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    // 做变量的触发
    
    this[ANIMATION] = new Set();   // 把 animation 放入这个 Set里面
    this[START_TIME] = new Map();
  }
  start(){
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {           // 调用自身的一个时间函数
      let now = Date.now();
      for (let animation of this[ANIMATION]) {
        console.log('animation.duration==', animation.duration);
        // 在动画开始之后
        
        let t;
        if (this[START_TIME].get(animation) < startTime) {
          // 在动画添加之后开始时间线
          t = now - startTime - this[PAUSE_TIME];
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
        }

        if (animation.duration < t) {
          this[ANIMATION].delete(animation);
          t = animation.duration;
        }
        animation.receive(t);   // 解决超出范围的问题
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);   
    }
    this[TICK]();
  }
  // 播放速率，控制动画快进慢放
  // set rate() {
 
  // }
  // get rate() {

  // }
  // 暂停
  pause() {
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  // 恢复
  resume() {
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  // 重启时间线，清除状态
  reset() {

  }

  // 管理动画
  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now();
    }
    this[ANIMATION].add(animation);
    this[START_TIME].set(animation, startTime);         // 设置动画添加的时间
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
    this.delay = delay;                      // 增加delay属性
    this.template = template;
  }
  receive(time) {
    let range = this.endValue - this.startValue;
    this.object[this.property] = this.template(this.startValue + range * time / this.duration);
  }
}