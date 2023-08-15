import { atomWithStorage } from 'jotai/utils'
import { UserDVO } from '../models/user.model'

export const darkModeAtom = atomWithStorage('darkMode', false)
export const calcHistoryAtom = atomWithStorage('calcHistoryAtom', [])
export const userDataAtom = atomWithStorage(
    'userDataAtom',
    {} as Partial<UserDVO>
)
