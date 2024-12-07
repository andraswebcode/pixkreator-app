import QRCodeStyling, {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel
} from 'qr-code-styling';
import { ref, watch } from 'vue';
import { WEBSITE_URL } from '../utils/constants';
import { debounce } from '../utils/functions';

const useQRCode = () => {
	const qrCode = new QRCodeStyling();
	const preview = ref('');
	const text = ref('');
	const size = ref(300);
	const margin = ref(0);
	const ecl = ref<ErrorCorrectionLevel>('Q');
	const bg = ref('');
	const imgSrc = ref('');
	const imgSize = ref(0.4);
	const imgMargin = ref(0);
	const dotsColor = ref('#000');
	const dotsType = ref<DotType>('square');
	const cornerSquareType = ref<CornerSquareType | ''>('');
	const cornerSquareColor = ref('');
	const cornerDotType = ref<CornerDotType | ''>('');
	const cornerDotColor = ref('');

	watch(
		() => [
			text.value,
			size.value,
			margin.value,
			ecl.value,
			bg.value,
			imgSrc.value,
			imgSize.value,
			imgMargin.value,
			dotsColor.value,
			dotsType.value,
			cornerSquareType.value,
			cornerSquareColor.value,
			cornerDotType.value,
			cornerDotColor.value
		],
		debounce(
			([
				newText,
				newSize,
				newMargin,
				newECL,
				newBg,
				newImgSrc,
				newImgSize,
				newImgMargin,
				newDotsColor,
				newDotsType,
				newCornerSquareType,
				newCornerSquareColor,
				newCornerDotType,
				newCornerDotColor
			]) => {
				qrCode.update({
					data: newText || WEBSITE_URL,
					width: newSize,
					height: newSize,
					margin: newMargin,
					image: newImgSrc,
					qrOptions: {
						errorCorrectionLevel: newECL
					},
					backgroundOptions: {
						color: newBg
					},
					imageOptions: {
						imageSize: newImgSize,
						margin: newImgMargin
					},
					dotsOptions: {
						type: newDotsType,
						color: newDotsColor
					},
					cornersSquareOptions: newCornerSquareType
						? {
								type: newCornerSquareType,
								color: newCornerSquareColor
						  }
						: undefined,
					cornersDotOptions: newCornerDotType
						? {
								type: newCornerDotType,
								color: newCornerDotColor
						  }
						: undefined
				});

				qrCode.getRawData('png').then((blob) => {
					preview.value = URL.createObjectURL(blob);
				});
			},
			800
		),
		{
			immediate: true
		}
	);

	return {
		text,
		size,
		margin,
		ecl,
		bg,
		imgSrc,
		imgSize,
		imgMargin,
		dotsColor,
		dotsType,
		cornerSquareType,
		cornerSquareColor,
		cornerDotType,
		cornerDotColor,
		preview
	};
};

export default useQRCode;
