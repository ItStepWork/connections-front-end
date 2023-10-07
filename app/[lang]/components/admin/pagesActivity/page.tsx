'use client'

import { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';
import { Chart } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function PagesActivity(props: any) {

  const [chart, setChart] = useState<Chart>(Chart.Daily);
  const [contacts, setContacts] = useState<any[]>([]);
  const [messaging, setMessaging] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [isContacts, setIsContacts] = useState<boolean>(true);
  const [isMessaging, setIsMessaging] = useState<boolean>(true);
  const [isGallery, setIsGallery] = useState<boolean>(true);
  const [isNotifications, setIsNotifications] = useState<boolean>(true);
  const [isGroups, setIsGroups] = useState<boolean>(true);

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
      <h2 className='relative text-center text-sm md:text-lg lg:text-2xl mx-3 mt-3'>
        {props.local.admin.sidebar.pageActivity}
      </h2>
      <div className="absolute z-50 bottom-0 right-0">
        <div className='flex px-3 text-sm lg:text-lg'>
          <div className="flex mr-4" onClick={() => { load(Chart.Daily); }}>
            <input id="daily-radio-pages" type="radio" className='cursor-pointer' value={Chart.Daily} checked={chart === Chart.Daily} onChange={() => { }} name="radio-pages" />
            <label htmlFor="daily-radio-pages" className='cursor-pointer'>{props.local.admin.activity.daily}</label>
          </div>
          <div className="flex cursor-pointer" onClick={() => { load(Chart.Hourly); }} >
            <input id="hourly-radio-pages" type="radio" className='cursor-pointer' value={Chart.Hourly} checked={chart === Chart.Hourly} onChange={() => { }} name="radio-pages" />
            <label htmlFor="hourly-radio-pages" className='cursor-pointer'>{props.local.admin.activity.hourly}</label>
          </div>
        </div>
      </div>
      <div className='absolute z-50 w-full flex justify-around pt-3 flex-wrap text-sm md:text-lg'>
        <label className='p-1 text-red-500 cursor-pointer'>
          <input type='checkbox' checked={isContacts} onChange={(e)=>{setIsContacts(e.target.checked)}} />
          <span className='p-1'>{props.local.admin.activity.contacts}</span>
        </label>
        <label className='p-1 text-orange-500 cursor-pointer'>
          <input type='checkbox' checked={isMessaging} onChange={(e)=>{setIsMessaging(e.target.checked)}}  />
          <span className='p-1'>{props.local.admin.activity.messaging}</span>
        </label>
        <label className='p-1 text-violet-500 cursor-pointer'>
          <input type='checkbox' checked={isGallery}  onChange={(e)=>{setIsGallery(e.target.checked)}} />
          <span className='p-1'>{props.local.admin.activity.gallery}</span>
        </label>
        <label className='p-1 text-lime-500 cursor-pointer'>
          <input type='checkbox' checked={isNotifications}  onChange={(e)=>{setIsNotifications(e.target.checked)}} />
          <span className='p-1'>{props.local.admin.activity.notifications}</span>
        </label>
        <label className='p-1 text-blue-400 cursor-pointer'>
          <input type='checkbox' checked={isGroups}  onChange={(e)=>{setIsGroups(e.target.checked)}} />
          <span className='p-1'>{props.local.admin.activity.groups}</span>
        </label>
      </div>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" />
        }>
        {isContacts &&
          <VictoryLine
            style={{ data: { stroke: "red" } }}
            data={contacts}
          />
        }
        {isMessaging &&
          <VictoryLine
            style={{ data: { stroke: "orange" } }}
            data={messaging}
          />
        }
        {isGallery &&
          <VictoryLine
            style={{ data: { stroke: "violet" } }}
            data={gallery}
          />
        }
        {isNotifications &&
          <VictoryLine
            style={{ data: { stroke: "lime" } }}
            data={notifications}
          />
        }
        {isGroups &&
          <VictoryLine
            style={{ data: { stroke: "dodgerBlue" } }}
            data={groups}
          />
        }
        <VictoryAxis
          style={{ tickLabels: { fill: "gray" } }}
          tickFormat={t => {
            let date = new Date(t);
            if (chart === Chart.Hourly) return `${date.getHours()}:00`;
            else return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
      </VictoryChart>
    </div>
  )
}
