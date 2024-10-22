export interface IId {
  id: number;
}

export interface Option extends IId {
  text: string;
  id: number;
}

export interface PollSet {
  title: string;
  options: string[];
}

export interface Poll extends IId {
  title: string;
  options: Option[];
}

export interface IStatePollSlice {
  poll?: Poll;
  checkedOption?: number;
}

// API POLL

export interface DeletePollParams {
    id: number
} 

export interface VotePollParams {
    pollId: number,
    optionId: number
}