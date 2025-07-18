class PerformanceTracker {
  static startMeasurement() {
    return process.hrtime();
  }

  static endMeasurement(start) {
    const diff = process.hrtime(start);
    // Convert to milliseconds
    return (diff[0] * 1e9 + diff[1]) / 1e6 / 100;
  }

  static logPerformance(operation, duration) {
    console.log(`${operation} took ${duration.toFixed(2)} ms`);
  }
}
export default PerformanceTracker;
