import {atom} from 'recoil'
import { IUser } from '../components/types/general-types'

const emptyUser : IUser = {
    _id: {
        $oid: ''
    },
    userName: '',
    googleId: '',
    entryDate: {
        $date: ''
    },
    __v: 0
}

export const userState = atom<IUser>({
    key: 'userState',
    default: emptyUser
})