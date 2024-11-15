import React, { useState } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form } from 'antd';
import { GetNewsFromDb } from './apiService';

const onFinish = (values) => {
  console.log(values)
};




function CurrencyConverter() {


  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);

  return (
    <div className="App" style={{ background: "rgb(246, 246, 246)", width: "40vw", borderRadius: "25px", boxShadow: "0px 0px 15px 7px rgb(222, 222, 222)", justifyContent: "space-between", padding: "3vh 3vw" }}>

      {/* <DatePicker style={{ width: '200px', height: '40px' }} /> */}

      <Form style={{ display: "flex", flexDirection: "row" }} onFinish={onFinish}>

        <div style={{ display: "flex", flexDirection: "column" }}>

          <Form.Item    
          name="inputAmount" >
            <InputNumber min={0} defaultValue={3} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} />
          </Form.Item>
          <Form.Item   name="inputCurrency"> 
            <Select
              showSearch
              style={{ width: "15vw", height: "5vh" }}
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: 'Jack',
                },
                {
                  value: '2',
                  label: 'Lucy',
                },
                {
                  value: '3',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
        </div>  

        <div style={{ padding: "3vw" }}>
          <Form.Item>
            <Button htmlType='submit' >emre</Button>
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Item name="outputAmount" >
            <InputNumber min={0} defaultValue={3} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} />
          </Form.Item>
          <Form.Item name="outputCurrency" >
            <Select
              showSearch
              style={{ width: "15vw", height: "5vh" }}
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: 'Jack',
                },
                {
                  value: '2',
                  label: 'Lucy',
                },
                {
                  value: '3',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
        </div>
      </Form>





    </div>
  );
}

export default CurrencyConverter;
