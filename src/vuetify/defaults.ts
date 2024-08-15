import { mdiChevronLeft, mdiChevronRight, mdiMenuDown } from '@mdi/js';

const defaults = {
	global: {
		// density: 'compact'
	},
	VBtn: {
		// density: 'default'
	},
	VSlider: {
		thumbSize: 18,
		hideDetails: true
	},
	VSelect: {
		menuIcon: mdiMenuDown
	},
	VNavigationDrawer: {
		tag: 'aside'
	},
	VAppBar: {
		VBtn: {
			size: 'small'
		}
	},
	VFooter: {
		VBtn: {
			variant: 'flat',
			size: 'small'
		}
	},
	VPagination: {
		prevIcon: mdiChevronLeft,
		nextIcon: mdiChevronRight
	},
	VTabs: {
		prevIcon: mdiChevronLeft,
		nextIcon: mdiChevronRight
	},
	// Custom components.
	ToolBarList: {
		style: {
			display: 'block',
			height: 'auto'
		}
	},
	ToolBarItem: {
		class: 'toolbar-item',
		block: true
	},
	SideBarToggler: {
		class: 'sidebar-toggler',
		position: 'absolute',
		rounded: false,
		flat: true,
		density: 'compact'
	}
};

export default defaults;
