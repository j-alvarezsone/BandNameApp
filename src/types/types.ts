export interface Bands {
  id: string;
  name: string;
  votes: number;
}

export interface BandsProps {
  data: Bands[];
  vote: Function;
}
