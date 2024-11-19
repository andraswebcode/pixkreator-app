const defaults = {
	global: {
		// density: 'compact'
	},
	VBtn: {
		// density: 'default'
	},
	VTextField: {
		class: 'mb-5',
		hideDetails: true
	},
	VSlider: {
		thumbSize: 18,
		thumbLabel: true,
		hideDetails: true,
		step: 1
	},
	VSelect: {
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true
		// variant: 'solo'
	},
	VAutocomplete: {
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true
		// variant: 'solo'
	},
	VCheckbox: {
		hideDetails: true
	},
	VNavigationDrawer: {
		tag: 'aside'
	},
	VRating: {},
	VAppBar: {
		density: 'comfortable',
		VBtn: {
			size: 'small',
			variant: 'flat'
		},
		VDivider: {
			class: 'mx-2',
			inset: true,
			vertical: true
		}
	},
	VFooter: {
		VBtn: {
			variant: 'flat',
			size: 'small'
		}
	},
	VPagination: {},
	VTabs: {},
	VExpansionPanels: {
		flat: true,
		variant: 'accordion',
		multiple: true
	},
	VExpansionPanel: {
		VTextField: {
			flat: true,
			variant: 'underlined',
			density: 'compact',
			dirty: true
		},
		VTextarea: {
			flat: true,
			variant: 'underlined',
			density: 'compact',
			dirty: true
		},
		VCheckbox: {
			density: 'compact',
			hideDetails: true
		},
		VSelect: {
			variant: 'underlined',
			density: 'compact'
		},
		VAutocomplete: {
			variant: 'underlined'
		},
		VBtnToggle: {
			mandatory: 'force',
			density: 'comfortable',
			divided: true,
			border: 'sm',
			rounded: false,
			VBtn: {
				// size: 'small'
			}
		}
	},
	VMenu: {
		VTextField: {
			flat: true,
			variant: 'underlined',
			density: 'compact',
			dirty: true
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
	},
	CloseBtn: {
		icon: 'mdi-close',
		variant: 'flat',
		size: 'small'
	},
	SearchInput: {
		variant: 'solo',
		hideDetails: true,
		singleLine: true,
		flat: true,
		appendInnerIcon: 'mdi-magnify'
	}
};

export default defaults;
