export class Stat {
  id: string;
  name: string;
  total: number;
  subTotal: number;
  childStat?: Stat[];
}
