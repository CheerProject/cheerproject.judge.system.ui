export class Stat {
  id: number;
  name: string;
  total: number;
  subTotal: number;
  childStat?: Stat[];
}
