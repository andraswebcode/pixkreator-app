const defaults = {
	global: {
		// density: 'compact'
	},
	VBtn: {
		// density: 'default'
		variant: 'tonal'
	},
	VTextField: {
		class: 'mb-3',
		hideDetails: true,
		variant: 'outlined',
		density: 'comfortable'
	},
	VTextarea: {
		variant: 'outlined',
		density: 'comfortable'
	},
	VSlider: {
		thumbSize: 18,
		thumbLabel: true,
		hideDetails: true,
		step: 1,
		density: 'comfortable'
	},
	VSelect: {
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true,
		variant: 'outlined',
		density: 'comfortable'
	},
	VAutocomplete: {
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true,
		variant: 'outlined',
		density: 'comfortable'
	},
	VCheckbox: {
		hideDetails: true,
		density: 'comfortable'
	},
	LeftSideBarDrawer: {
		tag: 'aside',
		width: 356,
		VTabs: {
			density: 'compact',
			grow: true
		},
		VTab: {
			size: 'x-small',
			minWidth: 0
		},
		TabItem: {
			class: 'py-5'
		}
	},
	RightSideBarDrawer: {
		tag: 'aside',
		location: 'end',
		VTabs: {
			density: 'compact',
			grow: true
		},
		VTab: {
			size: 'x-small',
			minWidth: 0
		},
		TabItem: {
			class: 'px-4 py-5',
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
				rounded: false
			},
			VBtn: {
				size: 'small'
			}
		}
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
	VMenu: {
		VTextField: {
			/*
			flat: true,
			variant: 'underlined',
			density: 'compact',
			dirty: true
		*/
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
		class: 'toolbar-item rounded-0',
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
