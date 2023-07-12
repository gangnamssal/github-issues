const ADD_ISSUES = 'homeStore/ADD_ISSUES' as const;

const addIssus = <T>(issue: T[]) => {
  return {
    type: 'ADD_ISSUES',
    payload: issue,
  };
};

type HomeStoreState = {
  issues: any[];
};
type HomeStoreAction = ReturnType<typeof addIssus>;

const initialState: HomeStoreState = {
  issues: [],
};

export default function homeStore(state: HomeStoreState = initialState, action: HomeStoreAction) {
  switch (action.type) {
    case ADD_ISSUES:
      return { issues: [...state.issues, action.payload] };
    default:
      return state;
  }
}
