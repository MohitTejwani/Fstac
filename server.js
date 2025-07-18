import express from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./config/database.js";
import { steamInsert } from "./controllers/index.js";
import User from "./models/userModel.js";
const app = express();
const PORT = 3001;

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    // Sync model with database (create table if not exists)
    User.sync();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

async function main() {
  try {
    // Set up database
    await setupDatabase();
    console.log("Generating 100,000 records...");

    // Perform bulk insert and measure performance
    console.log("Performing bulk insert...");
    const insertionTime = await steamInsert();
    // Check if performance goal was met
    if (insertionTime < 20) {
      console.log(
        "✅ Performance goal achieved! Insertion time is under 20ms.",
        insertionTime
      );
    } else {
      console.log(
        "❌ Performance goal not met. Insertion time exceeded 20ms.",
        insertionTime
      );
    }

    // Close database connection
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}
main();

app.use(cors("*"));
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
