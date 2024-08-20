import { createPinia } from 'pinia';
import useEditor from './editor';
import useProject from './project';
import useUser from './user';
import useNotice from './notification';
import { PiniaUndo } from 'pinia-undo';

const store = createPinia();

store.use(PiniaUndo);

export default store;
export { useEditor, useProject, useUser, useNotice };
