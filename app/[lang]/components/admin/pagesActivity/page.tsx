'use client'

import styles from './styles.module.scss';
import { VictoryLabel, VictoryChart, VictoryLine, VictoryZoomContainer, VictoryLegend, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import { AdminService } from '../../../../../services/admin.service';
import { Chart } from '../../../../../enums/all.enum';

export default function PagesActivity(props: any) {

  const [chart, setChart] = useState<Chart>(Chart.Daily);
  const [contacts, setContacts] = useState<any[]>([]);
  const [messaging, setMessaging] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  const load = async (loadChart: Chart) => {
    setChart(loadChart);
    let result = await AdminService.getPagesActivity(loadChart);
    let result1 = result.contacts.map((point: any) => { return { x: new Date(point.x), y: point.y } });
    setContacts(result1);
    let result2 = result.messaging.map((point: any) => { return { x: new Date(point.x), y: point.y } });
    setMessaging(result2);
    let result3 = result.gallery.map((point: any) => { return { x: new Date(point.x), y: point.y } });
    setGallery(result3);
    let result4 = result.notifications.map((point: any) => { return { x: new Date(point.x), y: point.y } });
    setNotifications(result4);
    let result5 = result.groups.map((point: any) => { return { x: new Date(point.x), y: point.y } });
    setGroups(result5);
  }

  useEffect(() => {
    load(Chart.Daily);
  }, [])

  return (
    <div className={styles.container}>
      <h2 className='relative text-sm md:text-lg lg:text-2xl mx-3 mt-3'>
        Pages activity
      </h2>
      <div className="absolute top-0 right-0">
        <div className='flex p-3 text-sm lg:text-lg'>
          <div className="flex mr-4" onClick={()=>{ load(Chart.Daily); }}>
            <input id="daily-radio-pages" type="radio" className='cursor-pointer' value={Chart.Daily} checked={chart === Chart.Daily} onChange={()=>{}} name="radio-pages" />
            <label htmlFor="daily-radio-pages" className='cursor-pointer'>Daily</label>
          </div>
          <div className="flex cursor-pointer" onClick={()=>{ load(Chart.Hourly); }} >
            <input id="hourly-radio-pages" type="radio" className='cursor-pointer' value={Chart.Hourly} checked={chart === Chart.Hourly} onChange={()=>{}} name="radio-pages" />
            <label htmlFor="hourly-radio-pages" className='cursor-pointer'>Hourly</label>
          </div>
        </div>
      </div>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" />
        }>
        <VictoryLegend x={10} y={10}
          orientation="horizontal"
          gutter={5}
          data={[
            { name: "Contacts", symbol: { fill: "red" } },
            { name: "Messaging", symbol: { fill: "orange" } },
            { name: "Gallery", symbol: { fill: "violet" } },
            { name: "Notifications", symbol: { fill: "lime" } },
            { name: "Groups", symbol: { fill: "dodgerBlue" } },
          ]}
          labelComponent={<VictoryLabel style={{ fontSize: 12, fill: "gray" }} />}
        />
        <VictoryLine
          style={{ data: { stroke: "red" } }}
          data={contacts}
        />
        <VictoryLine
          style={{ data: { stroke: "orange" } }}
          data={messaging}
        />
        <VictoryLine
          style={{ data: { stroke: "violet" } }}
          data={gallery}
        />
        <VictoryLine
          style={{ data: { stroke: "lime" } }}
          data={notifications}
        />
        <VictoryLine
          style={{ data: { stroke: "dodgerBlue" } }}
          data={groups}
        />
        <VictoryAxis
          style={{ tickLabels: { fill: "gray" } }}
          tickFormat={t => { 
            let date = new Date(t); 
            if(chart === Chart.Hourly) return `${date.getHours()}:00`;
            else return `${date.getMonth()}/${date.getDate()}`;
          }}
        />
      </VictoryChart>
    </div>
  )
}
