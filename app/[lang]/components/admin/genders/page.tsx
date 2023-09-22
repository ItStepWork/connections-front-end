'use client'

import styles from './styles.module.scss';
import { VictoryPie, VictoryLabel } from 'victory';
import { Gender } from '../../../../../enums/all.enum';
export default function Genders(props: any) {

  return (
    <div className={styles.container}>
      <h2 className='text-center text-2xl mt-3'>
        Genders
      </h2>
      <VictoryPie
        width={300} height={200}
        data={[
          { x: 1, y: props.users.filter((u: any) => u.gender === Gender.NotSelected).length, label: Gender.NotSelected },
          { x: 2, y: props.users.filter((u: any) => u.gender === Gender.Female).length, label: Gender.Female },
          { x: 3, y: props.users.filter((u: any) => u.gender === Gender.Male).length, label: Gender.Male }
        ]}
        labelComponent={
          <VictoryLabel
            style={{ fill: "gray", fontSize: 8 }}
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
