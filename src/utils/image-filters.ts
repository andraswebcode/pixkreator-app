const imageFilters = [
	{
		name: 'Grayscale',
		label: 'Grayscale',
		controls: [
			{
				type: 'select',
				name: 'mode',
				label: 'Mode',
				default: 'average',
				options: [
					{
						value: 'average',
						label: 'Average'
					},
					{
						value: 'lightness',
						label: 'Lightness'
					},
					{
						value: 'luminosity',
						label: 'Luminosity'
					}
				]
			}
		]
	},
	{
		name: 'Invert',
		label: 'Invert',
		controls: []
	},
	{
		name: 'Sepia',
		label: 'Sepia',
		controls: []
	},
	{
		name: 'BlackWhite',
		label: 'Black & White',
		controls: []
	},
	{
		name: 'Brownie',
		label: 'Brownie',
		controls: []
	},
	{
		name: 'Vintage',
		label: 'Vintage',
		controls: []
	},
	{
		name: 'Kodachrome',
		label: 'Kodachrome',
		controls: []
	},
	{
		name: 'Technicolor',
		label: 'Technicolor',
		controls: []
	},
	{
		name: 'Polaroid',
		label: 'Polaroid',
		controls: []
	},
	{
		name: 'RemoveColor',
		label: 'Remove Color',
		controls: [
			{
				type: 'color',
				name: 'color',
				label: 'Color',
				disableAlpha: true,
				default: '#FFFFFF'
			},
			{
				type: 'range',
				name: 'distance',
				label: 'Distance',
				default: 0.5,
				min: 0,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Brightness',
		label: 'Brightness',
		controls: [
			{
				type: 'range',
				name: 'brightness',
				label: 'Brightness',
				default: 0.4,
				min: -1,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Gamma',
		label: 'Gamma',
		controls: [
			{
				type: 'range',
				name: 'red',
				label: 'Red',
				default: 2,
				min: 0.2,
				max: 4.2,
				step: 0.01
			},
			{
				type: 'range',
				name: 'green',
				label: 'Green',
				default: 2,
				min: 0.2,
				max: 4.2,
				step: 0.01
			},
			{
				type: 'range',
				name: 'blue',
				label: 'Blue',
				default: 2,
				min: 0.2,
				max: 4.2,
				step: 0.01
			}
		]
	},
	{
		name: 'Contrast',
		label: 'Contrast',
		controls: [
			{
				type: 'range',
				name: 'contrast',
				label: 'Contrast',
				default: 0.5,
				min: -1,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Saturation',
		label: 'Saturation',
		controls: [
			{
				type: 'range',
				name: 'saturation',
				label: 'Saturation',
				default: 0.5,
				min: -1,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Vibrance',
		label: 'Vibrance',
		controls: [
			{
				type: 'range',
				name: 'vibrance',
				label: 'Vibrance',
				default: 0.5,
				min: -1,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'HueRotation',
		label: 'Hue Rotation',
		controls: [
			{
				type: 'range',
				name: 'rotation',
				label: 'Rotation',
				default: 1.5,
				min: -2,
				max: 2,
				step: 0.01
			}
		]
	},
	{
		name: 'Noise',
		label: 'Noise',
		controls: [
			{
				type: 'range',
				name: 'noise',
				label: 'Noise',
				default: 40,
				min: 0,
				max: 1000,
				step: 1
			}
		]
	},
	{
		name: 'Pixelate',
		label: 'Pixelate',
		controls: [
			{
				type: 'range',
				name: 'blocksize',
				label: 'Block Size',
				default: 5,
				min: 2,
				max: 20,
				step: 1
			}
		]
	},
	{
		name: 'Blur',
		label: 'Blur',
		controls: [
			{
				type: 'range',
				name: 'blur',
				label: 'Blur',
				default: 0.2,
				min: 0,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Sharpen',
		label: 'Sharpen',
		controls: []
	},
	{
		name: 'Emboss',
		label: 'Emboss',
		controls: [
			{
				type: 'checkbox',
				name: 'opaque',
				label: 'Opaque',
				default: true
			}
		]
	},
	{
		name: 'BlendColor',
		label: 'Blend Color',
		controls: [
			{
				type: 'select',
				name: 'mode',
				label: 'Mode',
				default: 'add',
				options: [
					{
						value: 'add',
						label: 'Add'
					},
					{
						value: 'diff',
						label: 'Diff'
					},
					{
						value: 'subtract',
						label: 'Subtract'
					},
					{
						value: 'multiply',
						label: 'Multiply'
					},
					{
						value: 'screen',
						label: 'Screen'
					},
					{
						value: 'lighten',
						label: 'Lighten'
					},
					{
						value: 'darken',
						label: 'Darken'
					},
					{
						value: 'overlay',
						label: 'Overlay'
					},
					{
						value: 'exclusion',
						label: 'Exclusion'
					},
					{
						value: 'tint',
						label: 'Tint'
					}
				]
			},
			{
				type: 'color',
				name: 'color',
				label: 'Color',
				disableAlpha: true,
				default: '#008800'
			},
			{
				type: 'range',
				name: 'alpha',
				label: 'Alpha',
				default: 1,
				min: 0,
				max: 1,
				step: 0.01
			}
		]
	},
	{
		name: 'Duotone',
		label: 'Duotone',
		controls: [
			{
				type: 'color',
				name: 'color1',
				label: 'Color Dark',
				disableAlpha: true,
				default: '#000044'
			},
			{
				type: 'color',
				name: 'color2',
				label: 'Color Light',
				disableAlpha: true,
				default: '#FF8A8A'
			}
		]
	}
];

export default imageFilters;
