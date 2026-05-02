# WidgetKit API Reference

## Canonical API for this task

```js
createWidget({
  type: "weather",
  title: "Weather",
  units: "fahrenheit" | "celsius",
  refreshMinutes: number
})
```

## Minimal working example

```js
export const widget = createWidget({
  type: "weather",
  title: "Local Forecast",
  units: "celsius",
  refreshMinutes: 15
});
```

## Do not use undocumented APIs
- `createWeatherCard`
- Any `create*Card` variant not documented above
