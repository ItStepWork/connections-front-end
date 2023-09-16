'use client'
import styles from './styles.module.scss';
import { useState } from 'react';
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi';
import { IoBarChartSharp } from 'react-icons/io5';
import LiMenu from '../liMenu/page';
import { AdminComponentName } from '../../../../../enums/all.enum';

export default function DropDownMenu(props: any) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li>
      <button onClick={() => { setIsOpen(!isOpen) }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
        <IoBarChartSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
        <span className="flex-1 ml-3 text-left whitespace-nowrap">Charts</span>
        {isOpen? <BiSolidChevronUp className="w-5 h-5 ml-3"/>:<BiSolidChevronDown className="w-5 h-5 ml-3"/>}
      </button>
      {isOpen &&
        <ul className="py-2 space-y-2">
          <LiMenu name="Genders" component={AdminComponentName.ChartGenders} setComponent={props.setComponent}/>
          <LiMenu name="Zodiacs" component={AdminComponentName.ChartZodiacs} setComponent={props.setComponent}/>
          <LiMenu name="Invoice" component={AdminComponentName.Users} setComponent={props.setComponent}/>
        </ul>}
    </li>
  )
}
