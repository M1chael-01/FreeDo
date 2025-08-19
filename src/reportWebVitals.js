// Function to measure and report web performance metrics
const reportWebVitals = onPerfEntry => {
  // Check if a callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure Cumulative Layout Shift (CLS) and pass result to callback
      getCLS(onPerfEntry);
      // Measure First Input Delay (FID) and pass result to callback
      getFID(onPerfEntry);
      // Measure First Contentful Paint (FCP) and pass result to callback
      getFCP(onPerfEntry);
      // Measure Largest Contentful Paint (LCP) and pass result to callback
      getLCP(onPerfEntry);
      // Measure Time to First Byte (TTFB) and pass result to callback
      getTTFB(onPerfEntry);
    });
  }
};

// Export the function so it can be used elsewhere in the app
export default reportWebVitals;
