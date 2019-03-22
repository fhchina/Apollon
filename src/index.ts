import { DiagramType } from './domain/plugins/DiagramType';
import ElementKind from './domain/plugins/ElementKind';
import RelationshipKind from './domain/plugins/RelationshipKind';
import Styles from './components/Theme/Styles';

export interface UMLModel {
  version: string;
  type: DiagramType;
  size: { width: number; height: number };
  interactive: Selection;
  assessments: { [id: string]: Assessment };
  elements: { [id: string]: UMLElement };
  relationships: { [id: string]: UMLRelationship };
}

export interface Assessment {
  score: number;
  feedback?: string;
}

export { DiagramType };
export { ElementKind as ElementType };
export { RelationshipKind as RelationshipType };
export { Styles };
export {
  UMLClassifier,
  UMLClassAssociation,
} from './domain/plugins/ClassDiagram';

interface UMLBase {
  id: string;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface UMLElement extends UMLBase {
  owner: string | null;
  type: ElementKind;
}

export enum Direction {
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Left = 'Left',
}

export interface UMLRelationship extends UMLBase {
  type: RelationshipKind;
  path: { x: number; y: number }[];
  source: {
    element: string;
    direction: Direction;
  };
  target: {
    element: string;
    direction: Direction;
  };
}

export interface Selection {
  elements: string[];
  relationships: string[];
}

export enum ApollonMode {
  Modelling = 'Modelling',
  Exporting = 'Exporting',
  Assessment = 'Assessment',
}

export type ApollonOptions = {
  type?: DiagramType;
  mode?: ApollonMode;
  readonly?: boolean;
  model?: UMLModel;
  theme?: Partial<Styles>;
};

export interface ExportOptions {
  filter: string[];
}

export interface SVG {
  svg: string;
  size: {
    width: number;
    height: number;
  };
}

export * from './ApollonEditor';
