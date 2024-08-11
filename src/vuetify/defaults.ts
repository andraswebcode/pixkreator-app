const defaults = {
	global: {
		// density: 'compact'
	},
	VBtn: {
		// density: 'default'
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
