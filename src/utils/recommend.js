import {
  programs,
  budgetOptions,
  osOptions,
  portabilityOptions,
  softwareOptions,
  ramOptions,
  storageOptions,
  batteryOptions,
  screenOptions,
} from '../data/questions';
import { formatPrice, formatStorage } from './format';

const GPU_RANK = { none: 0, preferred: 1, required: 2 };
const higherGpu = (a, b) => (GPU_RANK[a] >= GPU_RANK[b] ? a : b);

/**
 * Turns the student's answers into the minimum specs a laptop should have.
 * Anything left blank is ignored, so skipping a question never breaks matching.
 */
export function buildRequirements(answers) {
  const program = programs.find((p) => p.value === answers.program);
  const chosenSoftware = softwareOptions.filter((s) => answers.software.includes(s.value));

  let ram = program ? program.ram : 8;
  let storage = program ? program.storage : 256;
  let gpuFromProgram = program ? program.gpu : 'none';
  let gpuFromSoftware = 'none';

  chosenSoftware.forEach((s) => {
    ram = Math.max(ram, s.ram);
    gpuFromSoftware = higherGpu(gpuFromSoftware, s.gpu);
  });

  if (answers.ram) ram = Math.max(ram, Number(answers.ram));
  if (answers.storage) storage = Math.max(storage, Number(answers.storage));

  let gpu = higherGpu(gpuFromProgram, gpuFromSoftware);
  if (answers.gpu === 'yes') gpu = 'required';
  if (answers.gpu === 'no') gpu = gpuFromSoftware === 'required' ? 'required' : 'none';

  return {
    program,
    ram,
    storage,
    gpu,
    portability: answers.portability,
    battery: answers.battery,
    screen: answers.screen,
  };
}

/**
 * Scores one laptop from 0 to 100. Each check has a weight; checks that do not
 * apply (because the student skipped that question) are left out of the total.
 */
export function scoreLaptop(laptop, req, budget) {
  const checks = [];

  const add = (weight, earned, status, text) => checks.push({ weight, earned, status, text });

  // RAM
  if (laptop.ram >= req.ram) {
    add(20, 20, 'good', `${laptop.ram} GB RAM meets the ${req.ram} GB you need`);
  } else if (laptop.ram >= req.ram / 2) {
    add(20, 8, 'ok', `${laptop.ram} GB RAM is below the ${req.ram} GB recommended for you`);
  } else {
    add(20, 0, 'poor', `Only ${laptop.ram} GB RAM, well below the ${req.ram} GB you need`);
  }

  // Storage
  if (laptop.storage >= req.storage) {
    add(10, 10, 'good', `${formatStorage(laptop.storage)} storage is enough`);
  } else {
    add(10, 3, 'ok', `${formatStorage(laptop.storage)} storage is less than the ${formatStorage(req.storage)} recommended`);
  }

  // Graphics (only counted when graphics matter)
  if (req.gpu === 'required') {
    if (laptop.gpuStrong) {
      add(20, 20, 'good', 'Powerful graphics for CAD, 3D, or gaming');
    } else {
      add(20, 0, 'poor', 'No dedicated graphics, which your software may need');
    }
  } else if (req.gpu === 'preferred') {
    if (laptop.gpuStrong) {
      add(20, 20, 'good', 'Strong graphics for design and video work');
    } else {
      add(20, 8, 'ok', 'Basic graphics: fine for light design, slower for heavy work');
    }
  }

  // Portability
  if (req.portability === 'light') {
    if (laptop.weight <= 1.5) add(15, 15, 'good', `${laptop.weight} kg, easy to carry daily`);
    else if (laptop.weight <= 1.8) add(15, 7, 'ok', `${laptop.weight} kg, a little heavier than ideal`);
    else add(15, 0, 'poor', `${laptop.weight} kg, heavier than you wanted`);
  } else if (req.portability === 'balanced') {
    if (laptop.weight <= 1.9) add(15, 15, 'good', `${laptop.weight} kg, comfortable to carry`);
    else if (laptop.weight <= 2.2) add(15, 7, 'ok', `${laptop.weight} kg, on the heavy side`);
    else add(15, 0, 'poor', `${laptop.weight} kg, quite heavy to carry`);
  }

  // Battery
  if (req.battery === 'long') {
    if (laptop.battery >= 10) add(10, 10, 'good', `Up to ${laptop.battery} hours of battery`);
    else if (laptop.battery >= 8) add(10, 5, 'ok', `About ${laptop.battery} hours of battery, decent but not all-day`);
    else add(10, 0, 'poor', `Only about ${laptop.battery} hours of battery`);
  }

  // Screen size
  if (req.screen === 'compact') {
    if (laptop.screen <= 14.5) add(5, 5, 'good', `${laptop.screen}" screen, compact`);
    else add(5, 0, 'poor', `${laptop.screen}" screen, larger than you wanted`);
  } else if (req.screen === 'standard') {
    if (laptop.screen >= 15) add(5, 5, 'good', `${laptop.screen}" screen, roomy`);
    else add(5, 0, 'poor', `${laptop.screen}" screen, smaller than you wanted`);
  }

  // Budget
  if (budget) {
    if (laptop.price <= budget.max) {
      // Laptops inside the chosen range score a little higher than cheaper ones,
      // so a student with a high budget sees the better-equipped options first.
      add(10, laptop.price >= budget.min ? 10 : 7, 'good', `${formatPrice(laptop.price)} fits your budget`);
    } else {
      add(10, 0, 'poor', `${formatPrice(laptop.price)} is above your budget`);
    }
  }

  // Program tag
  if (req.program) {
    if (laptop.programs.includes(req.program.value)) {
      add(10, 10, 'good', `Suits ${req.program.label} students`);
    } else {
      add(10, 3, 'ok', `Not specifically picked for ${req.program.label}`);
    }
  }

  const possible = checks.reduce((sum, c) => sum + c.weight, 0);
  const earned = checks.reduce((sum, c) => sum + c.earned, 0);
  const score = possible === 0 ? 0 : Math.round((earned / possible) * 100);

  return {
    score,
    label: matchLabel(score),
    reasons: checks.filter((c) => c.status === 'good').map((c) => c.text),
    notes: checks.filter((c) => c.status !== 'good').map((c) => c.text),
  };
}

export function matchLabel(score) {
  if (score >= 85) return 'Excellent match';
  if (score >= 70) return 'Great match';
  if (score >= 55) return 'Good match';
  return 'Possible match';
}

/**
 * Main entry point used by the Find My Laptop page.
 * Returns the best laptops, plus a flag when nothing fit the budget and
 * we had to show the cheapest options instead.
 */
export function getRecommendations(answers, laptops, limit = 6) {
  const budget = budgetOptions.find((b) => b.value === answers.budget);
  const req = buildRequirements(answers);

  const pool = laptops.filter((l) => !answers.os || l.os === answers.os);
  let candidates = budget ? pool.filter((l) => l.price <= budget.max) : pool;

  let relaxed = false;
  if (candidates.length === 0) {
    relaxed = true;
    candidates = [...pool].sort((a, b) => a.price - b.price).slice(0, 3);
  }

  const scored = candidates
    .map((laptop) => ({ laptop, ...scoreLaptop(laptop, req, budget) }))
    .sort((a, b) => b.score - a.score || a.laptop.price - b.laptop.price);

  return { results: scored.slice(0, limit), relaxed, requirements: req };
}

/** Short, readable list of what the student answered, shown above the results. */
export function summarizeAnswers(answers) {
  const labelFor = (options, value) => options.find((o) => o.value === value)?.label;

  const items = [];
  const program = labelFor(programs, answers.program);
  const budget = labelFor(budgetOptions, answers.budget);
  const os = answers.os ? labelFor(osOptions, answers.os) : '';
  const portability = answers.portability ? labelFor(portabilityOptions, answers.portability) : '';

  if (program) items.push(program);
  if (budget) items.push(budget);
  if (os) items.push(os);
  if (portability) items.push(portability);
  answers.software.forEach((value) => {
    const label = labelFor(softwareOptions, value);
    if (label) items.push(label);
  });
  if (answers.ram) items.push(`${labelFor(ramOptions, answers.ram)} RAM`);
  if (answers.storage) items.push(`${labelFor(storageOptions, answers.storage)} storage`);
  if (answers.gpu === 'yes') items.push('Dedicated graphics card');
  if (answers.gpu === 'no') items.push('No graphics card needed');
  if (answers.battery) items.push(labelFor(batteryOptions, answers.battery));
  if (answers.screen) items.push(labelFor(screenOptions, answers.screen));

  return items;
}
