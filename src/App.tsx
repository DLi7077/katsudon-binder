import { Provider } from "react-redux";
import Binder from "./component/Binder";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Binder />
    </Provider>
  );
}

export default App;
