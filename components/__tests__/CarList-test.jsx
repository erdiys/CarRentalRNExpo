import * as React from "react";
import renderer from "react-test-renderer";

import CarList from "../CarList";
import { avatar } from "../../assets/images/index";

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <CarList
        image={avatar}
        carName="Jan Cook"
        baggage={4}
        passengers={4}
        price={5000000}
        onPress={() => alert("terpencet")}
        key={1}
        style={{ width: "100%" }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
