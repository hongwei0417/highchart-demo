import React, { Component } from 'react';
import './App.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Button, InputGroup, FormControl, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
require('highcharts/modules/exporting')(Highcharts)


class App extends Component {
  state = {
    options: {
      title: {
        text: '台中市月平均氣溫'
      },

      subtitle: {
        text: '此資訊由交通部氣象局提供'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: "月份"
        }
      },

      series: [{
          type: 'column',
          colorByPoint: true,
          data: [16.6, 17.3, 19.6, 23.1, 26.0, 27.6, 28.6, 28.3, 27.4, 25.2, 21.9, 18.1],
          showInLegend: false
      }],


      yAxis: {
        title: {
          text: "溫度°C"
        }
      },

      exporting: {
        buttons: {
          contextButton: {
            align: 'left'
          }
        }
      }
    }
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
      alert("輸入錯誤!")
    }
  }
  

  render() {
    const { options, selectMonth } = this.state
    return (
      <div className="App">
        <div className="App-header d-flex justify-content-center">
          <InputGroup className="mb-3 w-50">
            <FormControl
              placeholder="溫度"
              onChange={this.setText}
            />
            <InputGroup.Append>
              <DropdownButton
                as={InputGroup}
                title={selectMonth ? this.trans_month(selectMonth) : "請選擇月份"}
                variant="outline-light"
                defalut="1"
              >
                {
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
                }
              </DropdownButton>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="outline-warning" onClick={this.setData}>修改</Button>
            </InputGroup.Append>
          </InputGroup>
          <HighchartsReact
            ref="chartRef"
            highcharts={Highcharts}
            options={this.state.options}
            allowChartUpdate={true}
            updateArgs={[true, true, true]}
          />
        </div>
      </div>
    );
  }
}

export default App;
