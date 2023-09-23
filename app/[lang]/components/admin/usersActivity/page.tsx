'use client'

import styles from './styles.module.scss';
import { VictoryLabel, VictoryChart, VictoryBar, VictoryZoomContainer, VictoryLegend, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import { AdminService } from '../../../../../services/admin.service';
import { Chart } from '../../../../../enums/all.enum';

export default function UsersActivity(props: any) {

  const [chart, setChart] = useState<Chart>(Chart.Daily);
  const [activity, setActivity] = useState<any[]>([]);

  const load = async (loadChart: Chart) => {
    setChart(loadChart);
    let result = await AdminService.getUsersActivity(loadChart);
    let result1 = result.map((point: any) => { return { x: new Date(point.x), y: point.y, label: "" } });
    setActivity(result1);
  }

  useEffect(() => {
    load(Chart.Daily);
  }, [])

  return (
    <div className={styles.container}>
      <h2 className='relative text-sm md:text-lg lg:text-2xl mx-3 mt-3'>
        Users activity
      </h2>
      <div className="absolute top-0 right-0">
        <div className='flex p-3 text-sm lg:text-lg'>
          <div className="flex mr-4" onClick={()=>{ load(Chart.Daily); }}>
            <input id="daily-radio-users" type="radio" className='cursor-pointer' value={Chart.Daily} checked={chart === Chart.Daily} onChange={()=>{}} name="radio-users" />
            <label htmlFor="daily-radio-users" className='cursor-pointer'>Daily</label>
          </div>
          <div className="flex cursor-pointer" onClick={()=>{ load(Chart.Hourly); }}>
            <input id="hourly-radio-users" type="radio" className='cursor-pointer' value={Chart.Hourly} checked={chart === Chart.Hourly} onChange={()=>{}} name="radio-users" />
            <label htmlFor="hourly-radio-users" className='cursor-pointer'>Hourly</label>
          </div>
        </div>
      </div>
      <VictoryChart
        domainPadding={{ x: 30, y: 20 }}
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" />
        }>
        <VictoryBar
          width={300} height={200}
          data={activity}
          style={{ data: { strokeWidth: 1 } }}
          labelComponent={
            <VictoryLabel
              style={{ fill: "gray", fontSize: 10 }}
              dy={0}
            />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [{
                    mutation: (props) => {
                      return {
                        style: Object.assign({}, props.style, { stroke: "gray" })
                      };
                    }
                  },
                  {
                    target: "labels",
                    mutation: (props) => {
                      return { text: `${new Date(props.datum.x).getMonth() + 1}/${new Date(props.datum.x).getDate()} ${new Date(props.datum.x).getHours()}:00` }
                    }
                  }];
                },
                onMouseOut: () => {
                  return [{
                    mutation: () => {
                      return null;
                    }
                  },
                  {
                    target: "labels",
                    mutation: () => {
                      return null;
                    }
                  }];
                }
              }
            }
          ]}
        />
        <VictoryAxis
          style={{ tickLabels: { fill: "gray" } }}
          tickFormat={t => { 
            let date = new Date(t); 
            if(chart === Chart.Hourly) return `${date.getHours()}:00`;
            else return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <VictoryAxis dependentAxis
          style={{ tickLabels: { fill: "gray" } }}
        />
      </VictoryChart>
    </div>
  )
}
