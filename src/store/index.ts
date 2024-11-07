import { createPinia } from 'pinia';
import useEditor from './editor';
import useProject from './project';
import useUser from './user';
import useNotice from './notification';
import { PiniaUndo } from 'pinia-undo';
import LocalStoragePlugin from './localstorage';

const store = createPinia();

store.use(PiniaUndo);
store.use(LocalStoragePlugin);

export default store;
export { useEditor, useProject, useUser, useNotice };
