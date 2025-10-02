import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// اعتبارسنجی کدملی ایران
const validateIranianNationalCode = (code) => {
  if (!/^\d{10}$/.test(code)) return false;
  const check = +code[9];
  const sum = code
    .split("")
    .slice(0, 9)
    .reduce((acc, digit, i) => acc + +digit * (10 - i), 0);
  const remainder = sum % 11;
  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
};

// اعتبارسنجی موبایل ایرانی
const validateIranianPhone = (phone) => /^09\d{9}$/.test(phone);

const Login = () => {
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState(null);

  const onFinish = (values) => {
    console.log("Form Data:", { ...values, birthDate: birthDate?.format() });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500, margin: "0 auto" }}
    >
      {/* کدملی */}
      <Form.Item
        label="کدملی"
        name="nationalCode"
        rules={[
          { required: true, message: "کدملی الزامی است" },
          {
            validator: (_, value) =>
              !value || validateIranianNationalCode(value)
                ? Promise.resolve()
                : Promise.reject("کدملی معتبر نیست"),
          },
        ]}
      >
        <Input placeholder="مثال: 0012345678" maxLength={10} />
      </Form.Item>

      {/* شماره موبایل */}
      <Form.Item
        label="شماره موبایل"
        name="phone"
        rules={[
          { required: true, message: "شماره موبایل الزامی است" },
          {
            validator: (_, value) =>
              !value || validateIranianPhone(value)
                ? Promise.resolve()
                : Promise.reject("شماره موبایل معتبر نیست (مثال: 09123456789)"),
          },
        ]}
      >
        <Input placeholder="09123456789" maxLength={11} />
      </Form.Item>

      {/* تاریخ تولد با react-multi-date-picker */}
      <Form.Item label="تاریخ تولد" required>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={birthDate}
          onChange={setBirthDate}
          style={{ width: "100%", height: "40px" }}
          placeholder="تاریخ تولد را انتخاب کنید"
        />
        {!birthDate && (
          <div style={{ color: "red", marginTop: 4, fontSize: 12 }}>
            تاریخ تولد الزامی است
          </div>
        )}
      </Form.Item>

      {/* دکمه ثبت */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          ثبت اطلاعات
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
