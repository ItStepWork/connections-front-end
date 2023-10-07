'use client'

import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MessageStatus } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import GroupStatus from '../groupStatus/page';
import UserStatus from '../userStatus/page';
import styles from './styles.module.scss';
import PostStatus from '../postStatus/page';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Complaints(props: any) {

  const [search, setSearch] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [time, setTime] = useState<string>("day");
  const [complaints, setComplaints] = useState<any[]>([]);

  const filter = () => {
    if (complaints.length > 0) {
      let text = search.toLowerCase();
      return complaints.filter((u: any) => u.user?.firstName?.toLowerCase().includes(text) || u.user?.lastName?.toLowerCase().includes(text) || u.user?.email?.toLowerCase().includes(text) || u.user?.phone?.toLowerCase().includes(text) || (u.user?.firstName?.toLowerCase() + " " + u.user?.lastName?.toLowerCase()).includes(text) || (u.user?.lastName?.toLowerCase() + " " + u.user?.firstName?.toLowerCase()).includes(text));
    }
    else return [];
  }

  const updateUserBlockingTime = async (userId: string, time: string, number: number) => {
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    await AdminService.updateUserBlockingTime(userId, date.toUTCString());
    load();
  }

  const updateGroupBlockingTime = async (groupId: string, time: string, number: number) => {
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    await AdminService.updateGroupBlockingTime(groupId, date.toUTCString());
    load();
  }

  const updateComplaintStatus = async (id: string) => {
    await AdminService.updateComplaintStatus(id)
    load();
  }

  const load = async () => {
    let result = await AdminService.getComplaints();
    setComplaints(result);
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <div className={styles.container}>
      <div className='flex m-6'>
        {props.local.admin.title}
        <select className={styles.select} value={number} onChange={(e: any) => { setNumber(e.target.value); }}>
          {array.map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        <select className={styles.select} value={time} onChange={(e: any) => { setTime(e.target.value); }}>
          <option value={"hour"}>{props.local.admin.ban.hour}</option>
          <option value={"day"}>{props.local.admin.ban.day}</option>
          <option value={"month"}>{props.local.admin.ban.month}</option>
          <option value={"year"}>{props.local.admin.ban.year}</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.iconSearch}>
          <FiSearch size={20} />
        </span>
        <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchNameOrEmail} value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div className='m-6 flex flex-col border-t border-x border-light_border dark:border-dark_border'>
        {filter().map(complaint => (
          <div className='grid grid-cols-4 gap-4 p-3 border-b border-light_border dark:border-dark_border'>
            <div>{props.local.admin.complaints.status}</div>
            <div className='col-span-3 flex gap-6 items-center justify-between'>
              {complaint.status}
              {complaint.status === MessageStatus.Unread && <button className={styles.button_blue_BG} onClick={() => { updateComplaintStatus(complaint.id) }} >{props.local.admin.table.action.read}</button>}
            </div>
            <div>{props.local.admin.complaints.sender}</div>
            <div className='col-span-3 flex gap-6 items-center justify-between'>
              <div className='word-break: break-all'>
                <div>{complaint.sender.firstName} {complaint.sender.lastName}</div>
                <div>{complaint.sender.email}</div>
              </div>
              <div className='flex gap-3'>
                <div>
                  {new Date(complaint.sender.blockingTime) < new Date() ?
                    <button className={styles.button_red_BG} onClick={() => { updateUserBlockingTime(complaint.sender.id, time, number) }}>{props.local.admin.table.action.block}</button>
                    :
                    <button className={styles.button_blue_BG} onClick={() => { updateUserBlockingTime(complaint.sender.id, time, 0) }}>{props.local.admin.table.action.unblock}</button>}
                </div>
                <div><UserStatus user={complaint.sender} getUsers={load} local={props.local} /></div>
              </div>
            </div>
            <div>{props.local.admin.complaints.user}</div>
            <div className='col-span-3 flex gap-6 items-center justify-between'>
              <div className='word-break: break-all'>
                <div>{complaint.user.firstName} {complaint.user.lastName}</div>
                <div>{complaint.user.email}</div>
              </div>
              <div className='flex gap-3'>
                <div>
                  {new Date(complaint.user.blockingTime) < new Date() ?
                    <button className={styles.button_red_BG} onClick={() => { updateUserBlockingTime(complaint.user.id, time, number) }}>{props.local.admin.table.action.block}</button>
                    :
                    <button className={styles.button_blue_BG} onClick={() => { updateUserBlockingTime(complaint.user.id, time, 0) }}>{props.local.admin.table.action.unblock}</button>}
                </div>
                <div><UserStatus user={complaint.user} getUsers={load} local={props.local} /></div>
              </div>
            </div>
            {complaint.photoUrl && <div>{props.local.admin.complaints.photo}</div>}
            {complaint.photoUrl && <img className='col-span-3' src={complaint.photoUrl}></img>}
            {complaint.group && <div>{props.local.admin.complaints.group}</div>}
            {complaint.group &&
              <div className='col-span-3 flex gap-6 items-center justify-between'>
                <div className='word-break: break-all'>
                  <div>{complaint.group.name}</div>
                  <div>{complaint.group.email}</div>
                </div>
                <div>
                  {new Date(complaint.group.blockingTime) < new Date() ?
                    <button className={styles.button_red_BG} onClick={() => { updateGroupBlockingTime(complaint.group.id, time, number) }}>{props.local.admin.table.action.block}</button>
                    :
                    <button className={styles.button_blue_BG} onClick={() => { updateGroupBlockingTime(complaint.group.id, time, 0) }}>{props.local.admin.table.action.unblock}</button>}
                </div>
                <div><GroupStatus group={complaint.group} getGroups={load} local={props.local} /></div>
              </div>}
            {complaint.post && <div>Post:</div>}
            {complaint.post &&
              <div className='col-span-3 flex gap-6 items-center justify-between'>
                <div className='word-break: break-all'>
                  <div>{complaint.post.text}</div>
                  {complaint.post.imgUrl &&<img src={complaint.post.imgUrl}></img>}
                </div>
                <div><PostStatus post={complaint.post} load={load} local={props.local} /></div>
              </div>}
            <div>{props.local.admin.complaints.text}</div>
            <div className='col-span-3'>{complaint.text}</div>
            {complaint.link && <div>{props.local.admin.complaints.image}</div>}
            {complaint.link && <img className='col-span-3' src={complaint.link}></img>}

          </div>
        ))}
      </div>
    </div>
  )
}
