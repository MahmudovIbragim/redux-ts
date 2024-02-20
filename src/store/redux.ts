


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialDataL: any = []; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const todoRedux = (state = initialDataL, action: any) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return state.filter((item: { id: any; }) => item.id !== action.payload.id);
    case "update":
      return action.payload;
    case "completed": 
      return action.payload;
    default:
      return state;
  }
};

export default todoRedux;
