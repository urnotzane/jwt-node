import * as React from 'react';
import { Button, Card, Form, Input, message } from 'antd';

import './index.scss';
import { Rule } from 'antd/lib/form';
import { loginApi, pageNumApi } from '../api/request';
import { LoginParams } from '../../types/request';

const { Item: FItem } = Form;
const { Password } = Input;
const rule:Rule = {
  required: true,
  min: 6,
  message: '请填写6位以上字符',
}
export const Login = () => {
  const [form] = Form.useForm();
  const handleLogin = async() => {
    const values = await form.validateFields() as LoginParams;
    try {
      if (values) {
        const res = await loginApi(values);
        if (res.status !== 200) {
          throw new Error(res.status.toString());
        } else {
          message.success('登录成功');
        }
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败');
    }
  }
  return (
    <Card title="登录" className="card">
      <Form form={form} layout="vertical" requiredMark={false} validateTrigger={false}>
        <FItem label="账户" name="username" rules={[rule]}>
          <Input type="name" />
        </FItem>
        <FItem label="密码" name="password" rules={[rule]}>
          <Password />
        </FItem>
      </Form>
      <div className="actions">
        <Button type="primary" onClick={handleLogin}>登录</Button>
      </div>
    </Card>
  )
}