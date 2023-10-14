'use client'

import { VictoryLabel, VictoryPie } from 'victory';
import { Gender } from '../../../../../enums/all.enum';
import styles from './styles.module.scss';

export default function Genders(props: any) {

  const {
    users,
    local
  } = props;

  return (

    <div className={styles.container}>
      <h2 className='relative text-center text-sm md:text-lg lg:text-2xl mx-3 mt-3'>
        {local.admin.sidebar.genders}
      </h2>
      <VictoryPie
        width={300} height={200}
        data={[
          { x: 1, y: local.filter((u: any) => u.gender === Gender.NotSelected).length, label: local.settings.gender.none },
          { x: 2, y: local.filter((u: any) => u.gender === Gender.Female).length, label: local.settings.gender.female },
          { x: 3, y: local.filter((u: any) => u.gender === Gender.Male).length, label: local.settings.gender.male }
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
