'use client'

import styles from './styles.module.scss';
import { VictoryLabel, VictoryChart, VictoryBar, VictoryZoomContainer, VictoryLegend, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import { AdminService } from '../../../../../services/admin.service';

export default function DailyActivityChart(props: any) {

  const [activity, setActivity] = useState<any[]>([]);

  const load = async () => {
    let result = await AdminService.getDailyActivityChart();
    let result1 = result.map((point: any) => { return { x: new Date(point.x), y: point.y, label: point.y } });
    setActivity(result1);
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <div className={styles.container}>
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
                      return { text: `${new Date(props.datum.x).getMonth()}/${new Date(props.datum.x).getDate()} ${new Date(props.datum.x).getHours()}:00` }
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
          tickFormat={t => { let date = new Date(t); return `${date.getHours()}:00` }}
        />
      </VictoryChart>
    </div>
  )
}
