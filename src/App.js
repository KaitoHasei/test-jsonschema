import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { createAjv } from "@jsonforms/core";
import ajvError from "ajv-errors";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import schema from "./schema.json";
import UiSchema from "./UISchema.json";

import { viNameRegex, emailRegex } from "./regex";

import "./App.css";

function App() {
  const [dataUi, setDataUi] = useState({});

  const ajv = createAjv();
  ajvError(ajv);

  ajv.addFormat("viname", viNameRegex);
  ajv.addFormat("email", emailRegex);

  return (
    <div className="App">
      <div className="jsonform__wrapper">
        <JsonForms
          schema={schema}
          uischema={UiSchema}
          renderers={materialRenderers}
          cells={materialCells}
          ajv={ajv}
          data={dataUi}
          onChange={({ data, errors }) => {
            console.log({ data, errors });
            setDataUi(data);
          }}
        />
      </div>
    </div>
  );
}

export default App;
