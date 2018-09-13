# Radar chart


## CSS vars

- --quantum-chart-width : Width
- --quantum-chart-height : Height
- --quantum-font-color : Title font color


## Attributes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| theme | `string` | 'light' | Possible values are: 'light', 'dark' |
| unit | `string` | '' | Unit used |
| chartTitle | `string` | '' | Main title |
| showLegend | `boolean` | true | Shows a legend |
| responsive | `boolean` | false | Fit the parent space |
| width | `string` | '' | Fixed width |
| height | `string` | '' | Fixed height |
| options | `string` | '{}' | Serialized JSON representation of display options |
| data | `string` | '{}' | Serialized JSON representation of data to display |

## Data format


```json
{
  "data":[
    { "data A":[{"a":0},{"b":3},{"c":0},{"d":1},{"e":4}] },
    { "data B":[{"a":1},{"b":1},{"c":4},{"d":2},{"e":3}] }
  ]
}
```
- **data**: data to be displayed

## Option format

```json
{
  "gridLineColor": "#ffee77"
}
```

- **gridLineColor**: Grid line color and axis labels color. Default: #8e8e8e