import { Card, Form, Input, Button,message } from "antd";
import logo from '../../assets/logo.png'
import './index.scss'

import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async(values) => {
        console.log(values);
        //触发异步action fetchLogin
        await dispatch(fetchLogin(values))
        //跳转首页
        navigate('/')
        //提示成功
        message.success('登录成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/*登录表单*/}
                <Form
                    /* onBlur为失去焦点校验 */
                    validateTrigger='onBlur'
                    // 获取表单数据
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='mobile'
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            // pattern后可以增加正则表达式
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入11位正确的手机号',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入手机号"></Input>
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            }
                        ]}>
                        <Input size="large" placeholder="请输入验证码"></Input>
                    </Form.Item>
                    <Form.Item>
                        {/* block为跟父级同宽 */}
                        <Button type="primary" htmlType="submit" size="large" block>登录</Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>

    )
}

export default Login