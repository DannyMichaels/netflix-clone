import { Movie } from './movie';

export interface Profile {
  id: number;
  name: string;
  imgUrl: string;
  isKid: boolean;
  language: string;
  list: Movie[];
}

export interface ProfilesState {
  profiles: Profile[];
  currentProfile: null | Profile;
  maxProfileLength: number;
  profilesAreLoading: boolean;
}
