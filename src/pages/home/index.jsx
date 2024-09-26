import * as echarts from 'echarts';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    //1.获取渲染图表的DOM元素
    const chartDom = document.getElementById('main');
    //2.初始化echarts实例
    const myChart = echarts.init(chartDom);
    //3.指定图表的配置项和数据
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    //4.使用刚指定的配置项和数据显示图表
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div id="main" style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
}

export default Home;