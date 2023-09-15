'use client'

export default function LiMenu(props: any) {

  return (
    <li onClick={() => { props.setComponent(props.component) }}>
      <div className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        {props.icon &&
          <props.icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        }
        <span className="flex-1 ml-3 whitespace-nowrap">{props.name}</span>
      </div>
    </li>
  )
}
