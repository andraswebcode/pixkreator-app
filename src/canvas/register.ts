import { classRegistry } from 'fabric';
import { PROCircle } from './objects/circle';
import { PROEllipse } from './objects/ellipse';
import { PROGroup } from './objects/group';
import { PROImage } from './objects/image';
import { PROPath } from './objects/path';
import { PRORect } from './objects/rect';

classRegistry.setClass(PROCircle);
classRegistry.setClass(PROEllipse);
classRegistry.setClass(PROGroup);
classRegistry.setClass(PROImage);
classRegistry.setClass(PROPath);
classRegistry.setClass(PRORect);
