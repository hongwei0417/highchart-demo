import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
require('highcharts/modules/exporting')(Highcharts)


class App extends Component {

  state = {
    options: null
  }

  componentDidMount = async () => {
    const res = await axios.get('https://lunar-geography-271613.appspot.com/getData') // GCP後端取得資料
    this.setState({options: res.data.options})
  }

  trans_month = (i) => {
    const { categories } = this.state.options.xAxis
    return categories[i]
  }

  setMonth = (key, e) => {
    this.setState({ selectMonth: key })
  }

  setText = (e) => {
    this.setState({ temp: parseFloat(e.target.value) })
  }

  setData = () => {
    const { temp, selectMonth, options } = this.state
    if(!(isNaN(temp)) && selectMonth) {
      let newOptions = options
      newOptions.series[0].data[selectMonth] = temp
      this.setState({ options: newOptions })
    } else {
      alert("請確定輸入正確!")
    }
  }
  

  render() {
    const { options, selectMonth } = this.state
    return (
      <div className="App">
        <div className="App-header d-flex justify-content-center">
          <InputGroup className="mb-3 w-25">
            <FormControl
              placeholder="輸入溫度"
              onChange={this.setText}
            />
            <InputGroup.Append>
              <DropdownButton
                as={InputGroup}
                title={selectMonth ? this.trans_month(selectMonth) : "請選擇月份"}
                variant="outline-light"
                defalut="1"
              >
                { options ? 
                  options.xAxis.categories.map((value, key) => {
                    return (
                      <Dropdown.Item 
                        key={key}
                        eventKey={key}
                        onSelect={this.setMonth}
                      >
                        {value}
                      </Dropdown.Item>
                    )
                  })
                : null}
              </DropdownButton>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="outline-warning" onClick={this.setData}>修改</Button>
            </InputGroup.Append>
          </InputGroup>

          { options ? null : <div>取得資料中...</div>}
            
          <HighchartsReact
            ref="chartRef"
            highcharts={Highcharts}
            options={options}
            allowChartUpdate={true}
            updateArgs={[true, true, true]}
          />
        </div>
      </div>
    );
  }
}

export default App;
