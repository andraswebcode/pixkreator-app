import {
	mdiCheckboxBlankOutline,
	mdiCheckboxOutline,
	mdiCheckCircleOutline,
	mdiChevronDown,
	mdiChevronLeft,
	mdiChevronRight,
	mdiChevronUp,
	mdiCircleOutline,
	mdiClose,
	mdiMagnify,
	mdiMenuDown,
	mdiStar,
	mdiStarOutline
} from '@mdi/js';

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
		menuIcon: mdiMenuDown,
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true
		// variant: 'solo'
	},
	VAutocomplete: {
		menuIcon: mdiMenuDown,
		itemTitle: 'label',
		itemValue: 'value',
		flat: true,
		hideDetails: true
		// variant: 'solo'
	},
	VCheckbox: {
		trueIcon: mdiCheckCircleOutline,
		falseIcon: mdiCircleOutline,
		hideDetails: true
	},
	VNavigationDrawer: {
		tag: 'aside'
	},
	VRating: {
		emptyIcon: mdiStarOutline,
		fullIcon: mdiStar
	},
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
	VPagination: {
		prevIcon: mdiChevronLeft,
		nextIcon: mdiChevronRight
	},
	VTabs: {
		prevIcon: mdiChevronLeft,
		nextIcon: mdiChevronRight
	},
	VExpansionPanels: {
		collapseIcon: mdiChevronUp,
		expandIcon: mdiChevronDown,
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
			hideDetails: true,
			trueIcon: mdiCheckboxOutline,
			falseIcon: mdiCheckboxBlankOutline
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
		icon: mdiClose,
		variant: 'flat',
		size: 'small'
	},
	SearchInput: {
		variant: 'solo',
		hideDetails: true,
		singleLine: true,
		flat: true,
		appendInnerIcon: mdiMagnify
	}
};

export default defaults;
