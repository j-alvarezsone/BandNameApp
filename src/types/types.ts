export interface Bands {
  id: string;
  name: string;
  votes: number;
}

export interface BandsProps {
  data: Bands[];
  vote: Function;
  deleteBand: Function;
  changeBandName: Function;
}

export interface AddBandProps {
  createBand: Function;
}

export interface SocketContextProps {
  children: React.ReactNode;
}
