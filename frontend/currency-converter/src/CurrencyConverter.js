import logo from './logo.svg';
import './App.css';
import { InputNumber, Select, DatePicker, Button } from 'antd';

function CurrencyConverter() {
  return (
    <div className="App" style={{ background: "rgb(246, 246, 246)", width: "40vw", borderRadius: "25px", boxShadow: "5px 5px 5px 5px rgb(222, 222, 222)", display: "flex", flexDirection:"row", justifyContent: "space-between", padding:"3vh 3vw"}}>

      {/* <DatePicker style={{ width: '200px', height: '40px' }} /> */}


      <div style={{ display: "flex",flexDirection:"column"  }}>
        <InputNumber min={0} defaultValue={3} size={'large'} style={{ marginBottom: "20px", width: "15vw",height:"5vh" }} />
        <Select
          showSearch
          style={{  width: "15vw",height:"5vh" }}
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
      </div>
      <div style={{ padding: "3vw" }}>
        <Button >emre</Button>
      </div>


      <div style={{ display: "flex",flexDirection:"column" }}>
        <InputNumber min={0} defaultValue={3} size={'large'} style={{ marginBottom: "20px", width: "15vw",height:"5vh" }} />
        <Select
          showSearch
          style={{  width: "15vw",height:"5vh" }}
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
      </div>


    </div>
  );
}

export default CurrencyConverter;
