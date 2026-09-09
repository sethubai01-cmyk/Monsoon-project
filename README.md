# Monsoon AI — React + JavaScript UI

Based on the supplied SIH26080 idea document:
Regime Aware AI Post Processing of Monsoon Rainfall Forecasts.

## Stack
- React
- JavaScript
- Vite
- Lucide React icons
- CSS
- No backend required for the UI demo

## Run
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Terminal:
   npm install
4. Start:
   npm run dev
5. Open the localhost URL shown by Vite.

## Production AI integration
The current browser calculation is intentionally a transparent prototype. Replace the `classify()` and correction calculation in `src/main.jsx` with an API call to your trained HMM/clustering + CNN/U-Net/LightGBM + quantile mapping pipeline.
