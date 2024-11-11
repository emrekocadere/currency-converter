import logo from './logo.svg';
import './App.css';
import { InputNumber,Select,DatePicker } from 'antd';

function CurrencyConverter() {
  return (
    <div className="App" style={{background:"rgb(246, 246, 246)",width:"60vw"}}>
    <DatePicker style={{ width: '200px', height: '40px' }} />
    <InputNumber min={0} defaultValue={3} />
    <Select
    showSearch
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
    <InputNumber min={0} defaultValue={3} />
    <Select
    showSearch
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
  );
}

export default CurrencyConverter;
