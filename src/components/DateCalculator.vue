<template>
  <div id="app">
    <div class="container">
      <h1 class="title">日期计算器</h1>
      <div class="timezone-selector">
        <label for="timezone">选择时区：</label>
        <select class="timezone-width" id="timezone" v-model="timezone" @change="updateCurrentDate">
          <option v-for="zone in timezones" :key="zone.value" :value="zone.value">
            {{ zone.label }}
          </option>
        </select>
      </div>

      <p class="current-time">当前时间 ({{ timezone }}): {{ currentDate }}</p>

      <div class="date-picker">
        <label for="selectedDate">选择日期：</label>
        <input class="date-width" type="date" id="selectedDate" v-model="selectedDate" @change="updateFormattedDate">
      </div>

      <button class="calculate-button" @click="calculateDays">计算天数</button>
      <p v-if="daysLeft !== null" class="result">距离当前时间还有 <strong>{{ daysLeft }}</strong> 天</p>
      
      <!-- 版权信息 -->
      <div class="copyright">
        <p>© 2024 矿工Tob.版权所有.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timezone: 'Asia/Shanghai',
      currentDate: '',
      selectedDate: '',
      daysLeft: null,
      timezones: [
        { value: 'Pacific/Apia', label: '阿皮亚 (UTC+13:00)' },
        { value: 'Pacific/Auckland', label: '奥克兰 (UTC+13:00)' },
        { value: 'Pacific/Fiji', label: '斐济 (UTC+12:00)' },
        { value: 'Pacific/Chatham', label: '乞沙堡 (UTC+13:45)' },
        { value: 'Asia/Tokyo', label: '东京 (UTC+09:00)' },
        { value: 'Asia/Seoul', label: '首尔 (UTC+09:00)' },
        { value: 'Asia/Hong_Kong', label: '香港 (UTC+08:00)' },
        { value: 'Asia/Shanghai', label: '上海 (UTC+08:00)' },
        { value: 'Asia/Taipei', label: '台北 (UTC+08:00)' },
        { value: 'Asia/Bangkok', label: '曼谷 (UTC+07:00)' },
        { value: 'Asia/Vientiane', label: '万象 (UTC+07:00)' },
        { value: 'Asia/Phnom_Penh', label: '金边 (UTC+07:00)' },
        { value: 'Asia/Ho_Chi_Minh', label: '胡志明市 (UTC+07:00)' },
        { value: 'Asia/Jakarta', label: '雅加达 (UTC+07:00)' },
        { value: 'Asia/Dubai', label: '迪拜 (UTC+04:00)' },
        { value: 'Asia/Muscat', label: '马斯喀特 (UTC+04:00)' },
        { value: 'Europe/Moscow', label: '莫斯科 (UTC+03:00)' },
        { value: 'Europe/Istanbul', label: '伊斯坦布尔 (UTC+03:00)' },
        { value: 'Africa/Nairobi', label: '内罗毕 (UTC+03:00)' },
        { value: 'Africa/Cairo', label: '开罗 (UTC+02:00)' },
        { value: 'Europe/Paris', label: '巴黎 (UTC+01:00)' },
        { value: 'Europe/Berlin', label: '柏林 (UTC+01:00)' },
        { value: 'Europe/Amsterdam', label: '阿姆斯特丹 (UTC+01:00)' },
        { value: 'Europe/London', label: '伦敦 (UTC±00:00)' },
        { value: 'Etc/GMT', label: '格林威治 (UTC±00:00)' },
        { value: 'America/Montréal', label: '蒙特利尔 (UTC-05:00)' },
        { value: 'America/New_York', label: '纽约 (UTC-05:00)' },
        { value: 'America/Toronto', label: '多伦多 (UTC-05:00)' },
        { value: 'America/Chicago', label: '芝加哥 (UTC-06:00)' },
        { value: 'America/Denver', label: '丹佛 (UTC-07:00)' },
        { value: 'America/Los_Angeles', label: '洛杉矶 (UTC-08:00)' },
        { value: 'America/Anchorage', label: '安克雷奇 (UTC-09:00)' },
        { value: 'Pacific/Honolulu', label: '檀香山 (UTC-10:00)' },
        { value: 'Pacific/Midway', label: '中途岛 (UTC-11:00)' },
      ],
    };
  },
  methods: {
    updateCurrentDate() {
      const now = new Date();
      const options = {
        timeZone: this.timezone,
        hour12: false,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      // 获取当前时区的时间
      this.currentDate = new Intl.DateTimeFormat('zh-CN', options).format(now);
    },
    updateFormattedDate() {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.formattedDate = `${year}年${month}月${day}日`;
    },
    calculateDays() {
      const now = new Date();
      const selected = new Date(this.selectedDate);

      if (isNaN(selected)) {
        alert('请选择一个有效的日期');
        return;
      }

      // 获取当前时区的当前日期
      const currentDate = new Date(now.toLocaleString("en-US", { timeZone: this.timezone }));

      // 将时间重置为午夜，确保不计算时间部分
      currentDate.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);

      // 计算天数差值
      const timeDiff = selected - currentDate;
      this.daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 向下取整
    }
  },
  created() {
    this.updateCurrentDate();
    setInterval(this.updateCurrentDate, 1000); // 每秒更新当前时间
  }
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif; 
  text-align: center; 
  background-color: #e0f7fa; /* 淡青色背景 */
  min-height: 100vh; /* 占满屏幕高度 */
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

.container {
  background: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
  border-radius: 10px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 30px; 
  width: 400px; /* 固定宽度 */
}

.title {
  font-size: 2.5em; 
  color: #00796b; /* 深色标题 */
  margin-bottom: 20px; 
}

.timezone-selector, .date-picker {
  margin: 15px 0; 
}

.timezone-width {
  width: 250px; /* 时区选择框的宽度 */
}

.date-width {
  width: 230px; /* 日期选择框的宽度 */
}

select, input[type="date"] {
  padding: 10px; 
  font-size: 1em; 
  border: 2px solid #00796b; /* 较深色边框 */
  border-radius: 5px; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); /* 较小阴影 */
  transition: border-color 0.3s, box-shadow 0.3s; /* 过渡效果 */
}

select:focus, input[type="date"]:focus {
  border-color: #004d40; /* 聚焦时边框颜色 */
  box-shadow: 0 0 5px rgba(0, 77, 64, 0.5); /* 聚焦阴影效果 */
}

button.calculate-button {
  background-color: #00796b; /* 按钮颜色 */
  color: white; 
  border: none; 
  padding: 10px 15px; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 1.1em; 
  margin-top: 10px; 
  transition: background-color 0.3s, transform 0.3s; /* 过渡效果 */
}

button.calculate-button:hover {
  background-color: #004d40; /* 鼠标悬停颜色 */
  transform: scale(1.05); /* 按钮缩放效果 */
}

.result {
  font-size: 1.2em; 
  margin-top: 10px; 
  color: #d32f2f; /* 红色 */
}

.copyright {
  margin-top: 20px; /* 感觉更舒展 */
  font-size: 0.9em; /* 版权信息字体大小 */
  color: #555; /* 深灰色 */
}
</style>
