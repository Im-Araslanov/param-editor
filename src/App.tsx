// App.tsx
import React from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Color {}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Record<number, string>;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    const initialValues = props.params.reduce((acc, param) => {
      const foundValue = props.model.paramValues.find(pv => pv.paramId === param.id);
      acc[param.id] = foundValue ? foundValue.value : '';
      return acc;
    }, {} as Record<number, string>);

    this.state = {
      paramValues: initialValues
    };
  }

  handleValueChange = (paramId: number, value: string) => {
    this.setState(prev => ({
      paramValues: {
        ...prev.paramValues,
        [paramId]: value
      }
    }));
  };

  public getModel(): Model {
    const paramValues = Object.entries(this.state.paramValues).map(([paramId, value]) => ({
      paramId: Number(paramId),
      value
    }));

    return {
      ...this.props.model,
      paramValues
    };
  }

  render() {
    return (
      <div className="param-editor">
        {this.props.params.map(param => (
          <div key={param.id} className="param-row">
            <label htmlFor={`param-${param.id}`} className="param-label">
              {param.name}
            </label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={this.state.paramValues[param.id]}
              onChange={(e) => this.handleValueChange(param.id, e.target.value)}
              className="param-input"
              placeholder={`Enter ${param.name.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    );
  }
}

const App = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: 'string' },
    { id: 2, name: "Длина", type: 'string' },
    { id: 3, name: "Цвет", type: 'string' }
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" }
    ],
    colors: []
  };

  const editorRef = React.useRef<ParamEditor>(null);

  const handleClick = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      console.log('Current model:', model);
      alert(JSON.stringify(model, null, 2));
    }
  };

  return (
    <div className="app">
      <h1>Редактор параметров</h1>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={handleClick} className="check-button">
        Проверить модель
      </button>
    </div>
  );
};

export default App;