'use client'

import styles from './styles.module.scss';
import { VictoryBar, VictoryLabel } from 'victory';

export default function ChartZodiacs(props: any) {

  const filter = (array: any) => {
    let data = [
      { x: 0, y: 0, name: "capricorn", label: "♑︎" },
      { x: 1, y: 0, name: "aquarius", label: "♒︎" },
      { x: 2, y: 0, name: "pisces", label: "♓︎" },
      { x: 3, y: 0, name: "aries", label: "♈︎" },
      { x: 4, y: 0, name: "taurus", label: "♉︎" },
      { x: 5, y: 0, name: "gemini", label: "♊︎" },
      { x: 6, y: 0, name: "cancer", label: "♋︎" },
      { x: 7, y: 0, name: "leo", label: "♌︎" },
      { x: 8, y: 0, name: "virgo", label: "♍︎" },
      { x: 9, y: 0, name: "libra", label: "♎︎" },
      { x: 10, y: 0, name: "scorpio", label: "♏︎" },
      { x: 11, y: 0, name: "sagittarius", label: "♐︎" },
    ];
    let result = array.filter((user: any) => user.birthDay !== "0001-01-01T00:00:00");
    let result2 = groupBy(result, (user: any) => getZodiac((user.birthDay)));
    let result3 = Array.from(result2, ([key, value]) => ({
      [key]: value,
    }));
    result3.map((user: any)=> { let arr = Object.entries(user);  let users = arr[0][1] as [] ; let index = Number.parseInt(arr[0][0]);  data[index - 1].y = users.length ; });
    return data;
  }

  const groupBy = (list: [], keyGetter: Function) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  const getZodiac = (birthDay: string) => {
    let date = new Date(birthDay);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
      return 1;
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
      return 2;
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 3;
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return 4;
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return 5;
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      return 6;
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 7;
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
      return 8;
    } else if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
      return 9;
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
      return 10;
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
      return 11;
    } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
      return 12;
    }
  }
  
  return (
    <div className={styles.container}>
      <VictoryBar
        width={300} height={200}
        data={filter(props.users)}
        style={{ data: { strokeWidth: 1 } }}
        labelComponent={
          <VictoryLabel
            style={{ fill: "gray", fontSize: 10 }}
            events={{onClick: (evt) => console.log(evt)}}
          />
        }
        events={[
          {
            target: "data",
            eventHandlers: {
              // onClick: () => {
              //   return [{
              //     target: "labels",
              //     mutation: (props) => {
              //       console.log(props);
              //       return props.text === props.datum.y.toString() ? null : { text: props.datum.y.toString() }
              //     }
              //   }];
              // },
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
                    return { text: props.datum.y.toString() }
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
    </div>
  )
}
