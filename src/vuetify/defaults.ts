import {
	mdiChevronDown,
	mdiChevronLeft,
	mdiChevronRight,
	mdiChevronUp,
	mdiClose,
	mdiMagnify,
	mdiMenuDown
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
		hideDetails: true,
		variant: 'solo'
	},
	VNavigationDrawer: {
		tag: 'aside'
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
		VSelect: {
			variant: 'underlined',
			density: 'compact'
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
		size: 'small'
	},
	SearchInput: {
		variant: 'solo',
		hideDetails: true,
		singleLine: true,
		flat: true,
		appendInnerIcon: mdiMagnify
	},
	DetailsCarousel: {
		height: 'auto',
		continuous: false,
		prevIcon: mdiChevronLeft,
		nextIcon: mdiChevronRight,
		hideDelimiters: true,
		hideDelimiterBackground: true,
		VCarouselItem: {
			class: 'mx-10'
		},
		VBtn: {
			density: 'comfortable',
			size: 'small'
		}
	}
};

export default defaults;
