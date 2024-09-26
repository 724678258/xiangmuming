//柱状图组件
import * as echarts from 'echarts';

import { useEffect, useRef } from 'react';

// 1.把工能代码都放到这个组件中
// 2.把可变的部分抽象成props参数

const BarCharts = ({title,xData}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        //1.获取渲染图表的DOM元素
        const chartDom = chartRef.current;
        //2.初始化echarts实例
        const myChart = echarts.init(chartDom);
        //3.指定图表的配置项和数据
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data:xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 40, 70],
                    type: 'bar'
                }
            ]
        };
        //4.使用刚指定的配置项和数据显示图表
        option && myChart.setOption(option);
    }, [title])
    return (
        <div>
            <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
        </div>
    );

}

export default BarCharts;
