#!/usr/bin/env node
import fs from 'node:fs';
const [cmd, target] = process.argv.slice(2);
if (cmd === 'init' && target === 'weather-widget') {
  fs.mkdirSync('src', { recursive: true });
  fs.writeFileSync('widget.config.json', JSON.stringify({ name: 'weather-widget' }, null, 2));
  fs.writeFileSync('src/widget.js', `export const widget = createWidget({type: "weather", title: "Weather", units: "celsius", refreshMinutes: 15});\n`);
  console.log('Created widget.config.json and src/widget.js');
} else {
  console.error('Usage: widgetkit.js init weather-widget');
  process.exit(1);
}
