'use client'

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from "axios";
import Window from "../../messaging/window/page";
import UserStatus from "../userStatus/page";
import UserRole from "../userRole/page";
import { AdminService } from "../../../../../services/admin.service";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Map(props: any) {

  const {
    allUsers,
    getUsers,
    local
  } = props;

  const [number, setNumber] = useState<number>(1);
  const [time, setTime] = useState<string>("day");
  const [users, setUsers] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [zoomMap, setZoomMap] = useState<number>(1);

  const filter = (array: any[]) => {
    return array.filter((user: any) => user.ipAddress != null);
  }

  const getGeoInfo = async (ip: string) => {
    let result = await axios
      .get("https://ipapi.co/" + ip + "/json/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {

        return null;
      });
    return result;
  };

  const load = async () => {
    let array: any[] = [];
    filter(allUsers).forEach(async user => {
      let result = await getGeoInfo(user.ipAddress);
      if (result !== null) {
        result.user = user;
        array.push(result);
        setUsers(array);
      }
    });
  }

  useEffect(() => {
    load();
  }, []);

  const updateUserBlockingTime = async (userId: string, time: string, number: number) => {
    console.log(userId)
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    await AdminService.updateUserBlockingTime(userId, date.toUTCString());
    getUsers();
  }

  return (
    <div className={styles.container}>
      <ComposableMap>
        <ZoomableGroup center={[0, 0]} zoom={1}
          onMoveEnd={({ coordinates, zoom }) => {
            setZoomMap(zoom);
          }}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#DDD"
                  stroke="#FFF"
                />
              ))
            }
          </Geographies>
          {users.map((user: any) => (
            <Marker key={user.user.id} coordinates={[user.longitude, user.latitude]}>
              <circle className={styles.circle} r={2 / zoomMap} onClick={() => { setUser(user); setIsOpen(true); }} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {user &&
        <Window name="Selected user" isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="flex flex-col m-6 gap-2">
            <span>{user.user.firstName} {user.user.lastName}</span>
            <span>{user.city}</span>
            <span>{user.region}</span>
            <div className="max-w-fit flex gap-3">
              Status:
              <UserStatus user={user.user} getUsers={getUsers} local={local} />
            </div>
            <div className="max-w-fit flex gap-3">
              Role:
              <UserRole user={user.user} getUsers={getUsers} local={local} />
            </div>
            <div className='flex flex-wrap text-sm'>
              <div className=" w-2/5 whitespace-normal truncate">{local.admin.title}</div>
              <select className={styles.select} value={number} onChange={(e: any) => { setNumber(e.target.value); }}>
                {array.map(number => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </select>
              <select className={styles.select} value={time} onChange={(e: any) => { setTime(e.target.value); }}>
                <option value={"hour"}>{local.admin.ban.hour}</option>
                <option value={"day"}>{local.admin.ban.day}</option>
                <option value={"month"}>{local.admin.ban.month}</option>
                <option value={"year"}>{local.admin.ban.year}</option>
              </select>

            </div>
            <div className="flex justify-center">
              {new Date(user.user.blockingTime) < new Date() ?
                <button className={styles.button_red_BG} onClick={() => { updateUserBlockingTime(user.user.id, time, number) }}>{local.admin.table.action.block}</button>
                :
                <button className={styles.button_blue_BG} onClick={() => { updateUserBlockingTime(user.user.id, time, 0) }}>{local.admin.table.action.unblock}</button>}
            </div>
          </div>
        </Window>
      }
    </div>
  )
}
