export const jsonFormat = `The JSON code should be in the format written below. The text between '//' should be used as comments to know what to do.

{
  "name": "Name of calculator",
  "description": "Welcome to MecSimCalc self hosting",
  "author": {
    "username": "You",
    "image": "https://source.unsplash.com/random?profile"
  },
  "category": {
    "id": 1,
    "name": "Tutorial",
    "description": "Apps for learning or teaching MecSimCalc"
  },
  "tags": [
    {
      "id": 1,
      "name": "Tutorial"
    }
  ],
  "input_sections": {
//The section order can be more for example 'section-1' depending on how many groups of sections there are//
    "order": ["section-0"],
    "section-0": {
      "id": "section-0",
      "title": "User Inputs",
//The input order can be more for example 'section-1' depending on how manyy groups of inputs there are//
      "inputs_order": [
        "input_0",
        "input_1",
        "input_2",
        "input_3"
      ]
    }
  },
  "input_inputs": {
    "input_0": {
      "id": "input_0",
//For the components, if is a text or file input, change the 'Number' in 'NumberInput' to Text or File respectively. Some other components include: SingleSelect, MultipleSelect, Checkbox, Slider, RangeSlider, ColorPicker, DateTimePicker. Also change the name and label accordingly.//
      "component": "NumberInput",
      "props": {
        "name": "number_input",
        "label": " Number Input",
        "units": "cm^2",
        "defaultValue": the number used in the calculation,
        "required": true,
        "disabled": false,
        "step": 0.001,
        "min": -10000,
        "max": 10000
      }
    }
  }
  "input_layout": {
    "section-0": [
      {
        "w": 10,
        "h": 1,
        "x": 0,
        "y": 0,
        "i": "input_0",
        "moved": false,
        "static": false
      }
    ]  
  }
},
//Below is a format of the python code and HTML code to make the calculator functional and output what we want.//
//do not change this section of the code({% for key, value in outputs %}). do not change ouputs to outputs. Leave it the way it is// 
"code": "def main(inputs):\r\n    return inputs",
  "output_html": "<h2>Outputs</h2><p><br></p><p>&lt;table&gt;</p><p><strong style=\"color: black;\">{% for key, value in outputs %}</strong></p><p><span style=\"color: black;\">&lt;tr&gt;</span></p><p><span style=\"color: black;\">&lt;td&gt;</span><strong><u>{{ key }}</u></strong><span style=\"color: black;\">&lt;/td&gt;</span></p><p><span style=\"color: black;\">&lt;td&gt;</span>{{ value }}<span style=\"color: black;\">&lt;/td&gt;</span></p><p><span style=\"color: black;\">&lt;/tr&gt;</span></p><p><strong style=\"color: black;\">{% endfor %}</strong></p><p>&lt;/table&gt;</p>",
  "docs_html": "<h3>Code</h3><pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">def</span>&nbsp;<span class=\"hljs-title function_\">main</span>(<span class=\"hljs-params\">inputs</span>):\r\n&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"hljs-keyword\">return</span>&nbsp;inputs\r\n</pre><p><br></p><h3>Outputs</h3><pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">table</span>&gt;</span>\r\n{% <span class=\"hljs-name\"><span class=\"hljs-name\">for</span></span> key, value <span class=\"hljs-keyword\">in</span> outputs %}\r\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">tr</span>&gt;</span>\r\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">td</span>&gt;</span>{{ key }}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">td</span>&gt;</span>\r\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">td</span>&gt;</span>{{ value }}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">td</span>&gt;</span>\r\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">tr</span>&gt;</span>\r\n{% <span class=\"hljs-name\"><span class=\"hljs-name\">endfor</span></span> %}\r\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">table</span>&gt;</span>\r\n</pre>"
`;
