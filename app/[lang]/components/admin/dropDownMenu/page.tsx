'use client'

import { useState } from 'react';
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi';
import { IoBarChartSharp } from 'react-icons/io5';
import { AdminComponentName } from '../../../../../enums/all.enum';
import LiMenu from '../liMenu/page';

export default function DropDownMenu(props: any) {

  const {
    local,
    setComponent
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li>
      <button onClick={() => { setIsOpen(!isOpen) }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
        <IoBarChartSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{local.admin.sidebar.title}</span>
        {isOpen? <BiSolidChevronUp className="w-5 h-5 ml-3"/>:<BiSolidChevronDown className="w-5 h-5 ml-3"/>}
      </button>
      {isOpen &&
        <ul className="py-2 space-y-2">
          <LiMenu name={local.admin.sidebar.all} component={AdminComponentName.AllCharts} setComponent={setComponent}/>
          <LiMenu name={local.admin.sidebar.genders} component={AdminComponentName.Genders} setComponent={setComponent}/>
          <LiMenu name={local.admin.sidebar.zodiacs} component={AdminComponentName.Zodiacs} setComponent={setComponent}/>
          <LiMenu name={local.admin.sidebar.pageActivity} component={AdminComponentName.PagesActivity} setComponent={setComponent}/>
          <LiMenu name={local.admin.sidebar.usersActivity} component={AdminComponentName.UsersActivity} setComponent={setComponent}/>
        </ul>}
    </li>
  )
}
