import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({ name: "Car Rental RN Expo" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) //  <- here i am!
  .connect(); // let's connect!

export default reactotron; // also: export me so I can be referenced by Redux store
