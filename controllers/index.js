import sequelize from "../config/database.js";
import User from "../models/userModel.js";
import { generateUsers } from "../services/data-generator.js";
import PerformanceTracker from "../ulits/performance.js";
const batch = 100000;

const generateUserDetails = async (batch) => {
  const dataGenStart = PerformanceTracker.startMeasurement();
  const userRecords = generateUsers(batch);
  const dataGenDuration = PerformanceTracker.endMeasurement(dataGenStart);
  PerformanceTracker.logPerformance("Data generation", dataGenDuration);
  return userRecords;
};

export async function steamInsert() {
  const userRecords = await generateUserDetails(batch);
  await sequelize.query('SET maintenance_work_mem = "1GB"');
  await sequelize.query("SET synchronous_commit = OFF");
  await sequelize.query('SET work_mem = "64MB"');

  const start = PerformanceTracker.startMeasurement();

  const result = await sequelize.transaction(async (trans) => {
    return await User.bulkCreate(userRecords, {
      transaction: trans,
      validate: false,
      hooks: false,
      returning: false,
    });
  });

  const duration = PerformanceTracker.endMeasurement(start);

  return duration;
}
