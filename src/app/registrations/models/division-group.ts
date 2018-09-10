import { Category } from './category';
import { Division } from './division';
import { Level } from './level';
import { Gender } from './gender';
import { Group } from './group';
export class DivisionGroup {
    id: number;
    group: Group;
    gender: Gender;
    level: Level;
    division: Division;
    category: Category;
}
