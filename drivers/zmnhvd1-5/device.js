'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class Device extends ZwaveDevice {
  async onNodeInit() {
    this.printNode();
    this.registerCapability('dim', 'SWITCH_MULTILEVEL');
    this.registerCapability('measure_voltage','SENSOR_MULTILEVEL',{
      reportParser: report => { 
        this.setCapabilityValue('measure_input_fraction',Math.round(report['Sensor Value (Parsed)'])/100.0 );
        return report['Sensor Value (Parsed)'] / 10.0;
      }
    });
  }
}

module.exports = Device;