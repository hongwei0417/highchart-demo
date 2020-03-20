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
    active: false, //允許送出
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

  setTemp = (e) => {
    const { selectMonth } = this.state
    let newTemp = parseFloat(e.target.value)
    let active = this.checkInput(newTemp, selectMonth)

    this.setState({
      active,
      temp: newTemp
    })
  }

  setText = (type, e) => {
    this.setState({ [type]: e.target.value })
  }

  saveText = (type) => {
    const { options } = this.state
    let newOptions = options
    newOptions[type].text = this.state[type]
    this.setState({ options: newOptions })
  } 

  setMonth = (key, e) => {
    const { temp } = this.state
    let active = this.checkInput(temp, key)
    this.setState({
      active,
      selectMonth: key
    })
  }

  saveData = () => {
    const { temp, selectMonth, options } = this.state
    let newOptions = options
    newOptions.series[0].data[selectMonth] = temp
    this.setState({ options: newOptions })
  }

  checkInput = (temp, month) => {
    let active = false
    if(!(isNaN(temp)) && temp != 0 && month) {
      active = true
    }

    return active
  }
  

  render() {
    const { active, options, selectMonth } = this.state
    return (
      <div className="App">
        <div className="App-header d-flex justify-content-center">
            <InputGroup className="mb-3 w-50">
              <InputGroup.Prepend>
                <InputGroup.Text>Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="輸入標題"
                onChange={(e) => this.setText('title', e)}
              />
              <InputGroup.Append>
              <Button
                variant="outline-info"
                onClick={() => this.saveText('title')}
              >更新
              </Button>
              </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3 w-50">
            <InputGroup.Prepend>
              <InputGroup.Text>SubTitle</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="輸入子標題"
              onChange={(e) => this.setText('subtitle', e)}
            />
            <InputGroup.Append>
            <Button
              variant="outline-info"
              onClick={() => this.saveText('subtitle')}
            >更新
            </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3 w-50">
            <FormControl
              placeholder="輸入溫度"
              onChange={this.setTemp}
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
              <Button
                variant="outline-warning"
                onClick={this.saveData}
                disabled={!active}
              >更新
              </Button>
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
