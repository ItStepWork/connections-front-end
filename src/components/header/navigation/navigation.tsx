'use client';
import { Dropdown } from '@nextui-org/react';
import { FC } from 'react';
import styles from './navigation.module.scss';

export const Navigation: FC = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Dropdown>
          <Dropdown.Button flat color='secondary'>Pages</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="1">Albums</Dropdown.Item>
            <Dropdown.Item key="2">Messaging</Dropdown.Item>
            <Dropdown.Item key="3">Profile</Dropdown.Item>
            <Dropdown.Item key="4">Posts</Dropdown.Item>
            <Dropdown.Item key="5">Groups</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  )
}