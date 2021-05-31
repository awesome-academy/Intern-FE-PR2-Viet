import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import history from "../../../until/history";

import "./style.scss";
const Login = ()=>{

    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log("onFinish -> values", values);
    };
    return (
      <>
        <section className="register">
          <div className="container">
            <Row justify="center">
              <Col md={10} sm={12} xs={24} lg={7}>
                <Form
                  form={form}
                  name="register"
                  className="form-register"
                  onFinish={(values) => onFinish(values)}
                  scrollToFirstError
                >
                  <div className="register__title">
                    <h2>Login</h2>
                    <p>Please login below account detail</p>
                  </div>
                  <div className="login__label" >Email</div>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng Email !",
                      },
                      {
                        required: true,
                        message: "Email không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <div className="login__label">Password</div>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                      min: 8,
                      message: "Mật khẩu phải hơn 8 kí tự",
                      },
                      {
                      required: true,
                        message: "Mật khẩu không được để trống !",
                      }
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Pass word" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="warning" htmlType="submit">
                      Sign in
                    </Button>
                      <div className="forgot--password">
                        <span>Forgot your password ?</span>
                      </div>
                  </Form.Item>
                </Form>
              </Col>
              <Col lg={7} md={10} xs={24} sm={16}>
                <div className="register__right">
                  <p className="register__right--title">
                  Don't have an account?
                  </p>
                <Button onClick={()=>history.push("/account/register")} type="ghost">Create account</Button>
                <div className="term-privacy">
                  <p>
                    *<span>Terms & Conditions.</span>
                  </p>
                  <p>
                  Your privacy and security are important to us. For more information on how we use your data read our 
                  <span>
                   privacy policy
                  </span>
                  </p>
                </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </>
    );
  };
export default Login;
