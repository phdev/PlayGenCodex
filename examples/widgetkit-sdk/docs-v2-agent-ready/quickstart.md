# Quickstart: Build a Weather Widget

## Step 1: Run canonical init command

```bash
node examples/widgetkit-sdk/cli/widgetkit.js init weather-widget
```

Expected output:

```text
Created widget.config.json and src/widget.js
```

## Step 2: Confirm required files exist
- `widget.config.json`
- `src/widget.js`

## Step 3: Validate
Run:

```bash
npm run agentready:test
```
