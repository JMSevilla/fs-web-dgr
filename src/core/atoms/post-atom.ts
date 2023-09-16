import { atom } from 'jotai'
import { PostInfer } from '../schema/post-schema'

export const PostAtom = atom<PostInfer | undefined>(undefined)