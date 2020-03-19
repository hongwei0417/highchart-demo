import React, { Component } from 'react';
import './App.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
require('highcharts/modules/exporting')(Highcharts)


class App extends Component {
  state = {
    options: {
      title: {
        text: 'Chart.update'
      },

      subtitle: {
        text: 'Plain'
      },

      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      series: [{
          type: 'column',
          colorByPoint: true,
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
          showInLegend: false
      }],

      exporting: {
        buttons: {
          contextButton: {
            align: 'left'
          }
        }
      }
    }
  }

  setData = () => {
    console.log(this.refs.chartRef)
    let newOptions = this.state.options
    newOptions.series[0].data[7] = 50.0
    this.setState({options: newOptions})
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button onClick={this.setData}>123</Button>
          <HighchartsReact
            ref="chartRef"
            highcharts={Highcharts}
            options={this.state.options}
            allowChartUpdate={true}
            updateArgs={[true, true, true]}
          />
        </header>
      </div>
    );
  }
}

export default App;
