import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { createArticleAPI, getArticleID,updateArticleAPI } from '../../apis/acticle'

import { useChannel } from '../../hooks/useChannel'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'



const { Option } = Select

const Publish = () => {
  //获取频道列表
  // const [channelList, setChannelList] = useState([])
  // useEffect(() => {
  //   const getChannelList = async () => {
  //     const res = await getChannelsAPI()
  //     setChannelList(res.data.channels)
  //   }
  //   getChannelList()
  // }, [])
  const { channelList } = useChannel()


  // 提交表单
  const onFinish = (fromVlues) => {
    //校验封面类型与图片数量是否匹配
    if (imageType !== imageList.length) {
      return message.warning('封面类型与图片数量不匹配')
    } else {
      message.success('发布成功')
    }
    //解构提交的表单数据
    const { title, content, channel_id } = fromVlues
    const reqData = {
      title: title,
      content: content,
      cover: {
        type: imageType,
        images: imageList.map((item) => {
          //如果item有response属性，则取response.data.url，否则取item.url 判断是更新还是新增
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })


      },
      channel_id: channel_id
    }
    //调用接口
    if (articleId) {
      //更新接口
      updateArticleAPI( {...reqData, id: articleId })
    } else {
      createArticleAPI(reqData)
    }
  }
  //存储上传图片列表
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    setImageList(value.fileList)
  }
  //切换封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  //回填数据
  //获取路由参数
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  //获取实例
  const [form] = Form.useForm()
  console.log(articleId);

  useEffect(() => {
    // 通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleID(articleId)
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,
      })
      setImageType(res.data.cover.type)
      setImageList(res.data.cover.images.map(url => {
        return {
          url
        }
      }))
    }
    //只有有id的时候才调用
    if (articleId) {
      getArticleDetail()
    }
    // 调用方法回填
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{`${articleId ? '编辑文章' : '发布文章'}`}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: imageType }}
          onFinish={onFinish}
          form={form}

        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              name="image"
              action={'http://geek.itheima.net/v1_0/upload'}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}

          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            ></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish