import { VNavigationDrawer } from 'vuetify/components';
import { VBtn } from 'vuetify/components/VBtn';
import { VBtnToggle } from 'vuetify/components/VBtnToggle';
import { VSheet } from 'vuetify/components/VSheet';
import { VTextField } from 'vuetify/components/VTextField';

const aliases = {
	ToolBarList: VBtnToggle,
	ToolBarItem: VBtn,
	SideBarToggler: VBtn,
	CloseBtn: VBtn,
	SearchInput: VTextField,
	TabItem: VSheet,
	LeftSideBarDrawer: VNavigationDrawer,
	RightSideBarDrawer: VNavigationDrawer
};

export default aliases;
