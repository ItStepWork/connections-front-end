'use client'

import React from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from "axios";

export default function Map(props: any) {

  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

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
        console.log(error);
        return null;
      });
    return result;
  };

  const load = async () => {
    let array: Array<any> = [];
    filter(props.users).forEach(async user => {
      let result = await getGeoInfo(user.ipAddress);
      result.user = user;
      array.push(result);
    });
    setUsers(array);
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <div className={styles.container}>
        <ComposableMap>
          <ZoomableGroup key="0" center={[0, 0]} zoom={1}>
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
              <circle className="hover:stroke-black hover:cursor-pointer" stroke="#F53" r={2} fill="#F53" onMouseEnter={() => { setUser(user) }} onMouseLeave={() => { setUser(null) }} />
            </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

      {user &&
        <div className="z-50 fixed right-0 bottom-0">
          <div className="flex flex-col m-6">
            <span>{user.user.firstName}</span>
            <span>{user.user.lastName}</span>
            <span>{user.city}</span>
            <span>{user.region}</span>
          </div>
        </div>
      }
    </div>
  )
}
