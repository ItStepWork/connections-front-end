'use client'
import { Provider } from 'zustand'
import useStore from '../stores/userDataStore'

export default function UserStateProvider({ children }) {
	return <Provider createStore={useStore}> {children} </Provider>
}
