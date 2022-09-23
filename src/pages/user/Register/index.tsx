import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword} = values;
    if (userPassword !== checkPassword) {
      const registerFailureMessage = "两次输入的密码不一致";
      message.error(registerFailureMessage);
      return;
    }
    try {
      // 注册
      const id = await register({...values, type});

      if (id > 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const {query} = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        throw new Error(`register error id = ${id}`)
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      message.error(defaultRegisterFailureMessage);
    }
  };

  // @ts-ignore
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <LoginForm
            submitter={
              {
                searchConfig: {
                  submitText: '注册',
                }
              }
            }
            logo={<img alt="logo" src={SYSTEM_LOGO}/>}
            title="User-Center"
            subTitle={'用户中心'}
            initialValues={{
              autoRegister: true,
            }}

            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="account" tab={'账户密码注册'}/>
            </Tabs>

            {type === 'account' && (
              <>
                <ProFormText
                  name="userAccount"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请输入用户名'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="userPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请输入密码 '}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                    {
                      min: 6,
                      type: 'string',
                      message: '密码长度不能小于6 ',
                    }
                  ]}
                />
                <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请再次输入密码 '}
                  rules={[
                    {
                      required: true,
                      message: '确认密码是必填项！',
                    },
                    {
                      min: 6,
                      type: 'string',
                      message: '密码长度不能小于6 ',
                    }
                  ]}
                />
              </>
            )}

          </LoginForm>
        </div>
        <Footer/>
      </div>
  );
};

export default Register;
