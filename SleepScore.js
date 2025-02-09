
function parseTime(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

function getRecommendedSleep(age, activityLevel) {
    let minSleep, maxSleep;

    if (age <= 1) {
        minSleep = 720; maxSleep = 1020; // 12-17 hours
    } else if (age <= 2) {
        minSleep = 660; maxSleep = 840; // 11-14 hours
    } else if (age <= 5) {
        minSleep = 600; maxSleep = 780; // 10-13 hours
    } else if (age <= 13) {
        minSleep = 540; maxSleep = 660; // 9-11 hours
    } else if (age <= 17) {
        minSleep = 480; maxSleep = 600; // 8-10 hours
    } else if (age <= 64) {
        minSleep = 420; maxSleep = 540; // 7-9 hours
    } else {
        minSleep = 360; maxSleep = 480; // 6-8 hours
    }

    // Adjust sleep need based on activity level
    if (activityLevel === "high") {
        minSleep += 60;
        maxSleep += 60;
    } else if (activityLevel === "athlete") {
        minSleep += 120;
        maxSleep += 120;
    }

    return { minSleep, maxSleep };
}

function getREMPercentage(age) {
    if (age <= 1) return 50;   // Newborns have 50% REM
    if (age <= 2) return 40;
    if (age <= 5) return 30;
    if (age <= 13) return 25;
    if (age <= 17) return 23;
    if (age <= 64) return 20;  // Adults have ~20% REM
    return 18; // Seniors ~18% REM
}

function calculateSleepMetrics(age, sleepStart, sleepEnd, numAwakenings, awakeningDuration, activityLevel) {
    let startMinutes = parseTime(sleepStart);
    let endMinutes = parseTime(sleepEnd);

    if (endMinutes < startMinutes) endMinutes += 1440;

    let timeInBed = endMinutes - startMinutes;
    let minutesAwake = numAwakenings * awakeningDuration;
    let minutesAsleep = timeInBed - minutesAwake;

    let remPercentage = getREMPercentage(age) / 100;
    let remSleep = remPercentage * minutesAsleep;
    let deepSleep = 0.20 * minutesAsleep;
    let lightSleep = minutesAsleep - (remSleep + deepSleep);

    let { minSleep, maxSleep } = getRecommendedSleep(age, activityLevel);

    return { timeInBed, minutesAwake, minutesAsleep, remSleep, deepSleep, lightSleep, minSleep, maxSleep };
}

function calculateSleepScore(age, sleepMetrics, desiredSleep) {
    let { minutesAsleep, timeInBed, deepSleep, remSleep, minSleep, maxSleep } = sleepMetrics;

    // Sleep Efficiency Score (out of 40)
    let sleepEfficiency = (minutesAsleep / timeInBed) * 40;

    // REM & Deep Sleep Score (out of 20)
    let depthScore = ((deepSleep + remSleep) / minutesAsleep) * 20;

    // Duration Score (out of 20) - Based on age-appropriate range
    let durationScore = 0;
    if (minutesAsleep >= minSleep && minutesAsleep <= maxSleep) {
        durationScore = 20;
    } else if (minutesAsleep > maxSleep) {
        durationScore = Math.max(10, 20 - ((minutesAsleep - maxSleep) / 30));
    } else {
        durationScore = Math.max(10, (minutesAsleep / minSleep) * 20);
    }

    // Sleep Difference Score (out of 10) - Compares actual vs desired sleep
    let sleepDifference = desiredSleep - minutesAsleep; // Only penalizes if sleep is less than desired
    let sleepDifferenceScore = sleepDifference <= 0 
        ? 10  // Full points if desired sleep is met or exceeded
        : Math.max(0, 10 - (sleepDifference / 30));

    // Compute total sleep score (out of 100)
    let sleepScore = sleepEfficiency + depthScore + durationScore + sleepDifferenceScore;
    return Math.round(Math.max(0, Math.min(sleepScore, 100))); // Ensure score is between 0-100
}

// Example Usage
let age = 30;
let sleepStart = "23:00";
let sleepEnd = "07:30";
let numAwakenings = 2;
let awakeningDuration = 5;
let desiredSleep = 480;  // User desires 8 hours of sleep (480 min)
let activityLevel = "high"; // Options: "normal", "high", "athlete"

// Compute sleep metrics
let sleepMetrics = calculateSleepMetrics(age, sleepStart, sleepEnd, numAwakenings, awakeningDuration, activityLevel);

// Compute sleep score
let sleepScore = calculateSleepScore(age, sleepMetrics, desiredSleep);

console.log("Sleep Metrics:", sleepMetrics);
console.log("Sleep Score:", sleepScore);
