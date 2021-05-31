import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import history from "../../../until/history";

import "./style.scss";
const Register = () => {
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
                  <h2>Create Account</h2>
                  <p>Please register below account detail</p>
                </div>
                <Form.Item
                  name="first"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name="last"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
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
                    CREATE ACCOUNT
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col lg={7} md={10} xs={24} sm={16}>
              <div className="register__right">
                <p className="register__right--title">
                  Already an account holder ?
                </p>
              <Button onClick={()=>history.push("/account/login")} type="ghost">Log in</Button>
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

export default Register;
