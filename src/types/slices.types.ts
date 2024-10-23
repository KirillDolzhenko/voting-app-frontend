export interface IId {
  id: number;
}

export interface Option extends IId {
  text: string;
  id: number;
  votes: number;
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
  id: number;
}

export interface GetPollParams extends DeletePollParams {}

export interface VotePollParams {
  pollId: number;
  optionId: number;
}

// SLICE LIST

export interface IStateListSlice {
  polls: Poll[];
  checked?: number;
}
