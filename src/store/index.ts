import { createPinia } from 'pinia';
import useEditor from './editor';
import useProject from './project';
import useUser from './user';
import useNotice from './notification';

export default createPinia();
export { useEditor, useProject, useUser, useNotice };
