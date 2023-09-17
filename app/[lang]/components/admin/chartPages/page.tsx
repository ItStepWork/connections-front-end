'use client'

import styles from './styles.module.scss';
import { VictoryLabel, VictoryChart, VictoryLine, VictoryZoomContainer, VictoryLegend, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import { AdminService } from '../../../../../services/admin.service';

export default function ChartPages(props: any) {

  const [contacts, setContacts] = useState<any[]>([]);
  const [messaging, setMessaging] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  const load = async () => {
    let result = await AdminService.getChartActivity();
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
    load();
  }, [])

  return (
    <div className={styles.container}>
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
          labelComponent={<VictoryLabel style={{fontSize: 12, fill: "gray" }} />}
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
          tickFormat={t => {let date = new Date(t); return `${date.getHours()}:00`}}
        />
      </VictoryChart>
    </div>
  )
}
