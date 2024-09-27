import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'

// 时间组件汉化包
import locale from 'antd/es/date-picker/locale/zh_CN'

// import { Link } from 'react-router-dom'
import { Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useChannel } from '../../hooks/useChannel'
import { useState } from 'react'
import { useEffect } from 'react'
import { getArticleListAPI, deleteArticleListAPI } from '../../apis/acticle'
import img404 from '../../assets/error.png'
import { useNavigate } from 'react-router-dom'



const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      //data 后端返回的status字段 根据他渲染不同的内容
      render: data => data === 1 ? <Tag color="orange">待审核</Tag> : <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>editActicle(data)} />
            <Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onConfirm(data)}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: ['http://geek.itheima.net/resources/images/15.jpg'],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]



  const { channelList } = useChannel()

  //获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  //筛选条件参数准备
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10
  })

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [reqData])


  //获取筛选条件表单内容
  const onFinish = (e) => {
    //把获取到的表单数据放到参数中（不可变的方式）
    setReqData(
      {
        ...reqData,
        status: e.status,
        channel_id: e.channel_id,
        begin_pubdate: e.date[0].format('YYYY-MM-DD'),
        end_pubdate: e.date[1].format('YYYY-MM-DD'),
      }
    )
    //重新获取文章列表
    //reqData发生了变化，useEffect会重新执行
  }

  //点击分页重新获取列表
  const onPageChange = (page) => {
    console.log(page);
    //修改参数依赖项，引发数据的重新渲染
    setReqData({
      ...reqData,
      page
    })
  }


  //删除列表 （删除完之后再更新所以用async await）
  const onConfirm = async (data) => {
    await deleteArticleListAPI(data.id)
    setReqData({
      ...reqData,
    })

  }

  //修改文章
  const navigate=useNavigate()
  const editActicle = (data) => {
    console.log(data.id);
    navigate(`/publish?id=${data.id}`)
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ status: null }}
          onFinish={onFinish}

        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到${count}条结果：`}>
        <Table rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange
          }
          } />
      </Card>
    </div>
  )
}

export default Article