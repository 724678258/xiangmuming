import { Card, Form, Input, Button } from "antd";
import logo from '../../assets/logo.png'

import './index.scss'

const Login = () => {

    const onFinish = (values) => {
        console.log(values);

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
                        name='moble'
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