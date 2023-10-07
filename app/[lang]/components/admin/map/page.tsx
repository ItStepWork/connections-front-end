'use client'

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from "axios";
import Window from "../../messaging/window/page";

export default function Map(props: any) {

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
    filter(props.users).forEach(async user => {
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
          <div className="flex flex-col m-6">
            <span>{user.user.firstName} {user.user.lastName}</span>
            <span>{user.city}</span>
            <span>{user.region}</span>
          </div>
        </Window>
      }
    </div>
  )
}
