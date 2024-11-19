import { classRegistry } from 'fabric';
import { PROActiveSelection } from './objects/active-selection';
import { PROCircle } from './objects/circle';
import { PROEllipse } from './objects/ellipse';
import { PROGroup } from './objects/group';
import { PROImage } from './objects/image';
import { PROPath } from './objects/path';
import { PRORect } from './objects/rect';
import { PROIText } from './objects/itext';
import { PRODuotone } from './filters/duotone';
import { PROGamma } from './filters/gamma';
import { PROEmboss } from './filters/emboss';
import { PROSharpen } from './filters/sharpen';
import { PROBlackWhite } from './filters/blackwhite';
import { PROPolyline } from './objects/polyline';
import { PROPolygon } from './objects/polygon';
import { PROQRCode } from './objects/qrcode';
import { PROChart } from './objects/chart';

// Shapes

classRegistry.setClass(PROActiveSelection);
classRegistry.setClass(PROCircle);
classRegistry.setClass(PROEllipse);
classRegistry.setClass(PROGroup);
classRegistry.setClass(PROImage);
classRegistry.setClass(PROPath);
classRegistry.setClass(PROPolyline);
classRegistry.setClass(PROPolygon);
classRegistry.setClass(PRORect);
classRegistry.setClass(PROIText);
classRegistry.setClass(PROQRCode);
classRegistry.setClass(PROChart);

// Filters

classRegistry.setClass(PRODuotone);
classRegistry.setClass(PROBlackWhite);
classRegistry.setClass(PROGamma);
classRegistry.setClass(PROEmboss);
classRegistry.setClass(PROSharpen);
