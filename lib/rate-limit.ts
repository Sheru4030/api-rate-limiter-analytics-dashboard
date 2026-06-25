import fs from "fs";
import path from "path";

type UserRecord = {
  timestamps: number[];
};

type StoredData = {
  users: Record<string, UserRecord>;
  activeUsers: string[];
  totalRequests: number;
  blockedRequests: number;
};

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

const LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function getDefaultData(): StoredData {
  return {
    users: {},
    activeUsers: [],
    totalRequests: 0,
    blockedRequests: 0,
  };
}

function readData(): StoredData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return getDefaultData();
    }

    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return getDefaultData();
  }
}

function saveData(data: StoredData) {
  const directory = path.dirname(DATA_FILE);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function checkRateLimit(userId: string) {
  const now = Date.now();
  const data = readData();

  data.totalRequests += 1;

  if (!data.activeUsers.includes(userId)) {
    data.activeUsers.push(userId);
  }

  const record = data.users[userId] ?? { timestamps: [] };

  // Retain only requests from the last 60 seconds
  record.timestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (record.timestamps.length >= LIMIT) {
    data.blockedRequests += 1;
    data.users[userId] = record;
    saveData(data);

    return { allowed: false };
  }

  record.timestamps.push(now);
  data.users[userId] = record;
  saveData(data);

  return { allowed: true };
}

export function getAnalytics() {
  const data = readData();

  return {
    totalRequests: data.totalRequests,
    blockedRequests: data.blockedRequests,
    activeUsers: data.activeUsers.length,
  };
}