import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagePaths = [
  join(root, 'packages/tokens/package.json'),
  join(root, 'packages/react/package.json'),
];

const LEVELS = new Set(['patch', 'minor', 'major']);

function parseArgs(argv) {
  let level = 'patch';
  let dryRun = false;
  let fromCommits = null;
  let printLevel = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (arg === '--print-level') {
      printLevel = true;
      continue;
    }
    if (arg.startsWith('--level=')) {
      level = arg.slice('--level='.length);
      continue;
    }
    if (arg === '--level') {
      level = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith('--from-commits=')) {
      fromCommits = arg.slice('--from-commits='.length);
      continue;
    }
    if (arg === '--from-commits') {
      fromCommits = argv[i + 1] ?? '';
      i += 1;
    }
  }

  return { level, dryRun, fromCommits, printLevel };
}

function detectLevelFromCommits(message, currentMajor) {
  const text = message || '';
  const hasBreaking =
    /^[a-z]+(\([^)]*\))?!:/m.test(text) || /BREAKING CHANGE:/i.test(text);

  if (hasBreaking) {
    return currentMajor === 0 ? 'minor' : 'major';
  }
  if (/^feat(\([^)]*\))?:/m.test(text)) {
    return 'minor';
  }
  return 'patch';
}

function bumpVersion(version, level) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/.exec(version);
  if (!match) {
    throw new Error(`Unsupported version format: ${version}`);
  }

  let major = Number(match[1]);
  let minor = Number(match[2]);
  let patch = Number(match[3]);

  if (level === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (level === 'minor') {
    minor += 1;
    patch = 0;
  } else if (level === 'patch') {
    patch += 1;
  } else {
    throw new Error(`Unsupported level: ${level}`);
  }

  return `${major}.${minor}.${patch}`;
}

function compareSemver(a, b) {
  const [aM, aN, aP] = a.split('.').map(Number);
  const [bM, bN, bP] = b.split('.').map(Number);
  if (aM !== bM) return aM - bM;
  if (aN !== bN) return aN - bN;
  return aP - bP;
}

function peerRangeFor(version) {
  const [major, minor] = version.split('.').map(Number);
  if (major === 0) {
    return `^0.${minor}.0`;
  }
  return `^${major}.0.0`;
}

const { level: levelArg, dryRun, fromCommits, printLevel } = parseArgs(
  process.argv.slice(2),
);

const packages = packagePaths.map((path) => ({
  path,
  json: JSON.parse(readFileSync(path, 'utf8')),
}));

const versions = packages.map((pkg) => pkg.json.version);
const mismatched = versions.some((version) => version !== versions[0]);
if (mismatched) {
  console.warn(
    `Warning: publishable versions differ (${versions.join(', ')}). Using the highest.`,
  );
}

const baseVersion = versions.reduce((max, version) =>
  compareSemver(version, max) > 0 ? version : max,
);

const currentMajor = Number(baseVersion.split('.')[0]);
const level =
  fromCommits !== null
    ? detectLevelFromCommits(fromCommits, currentMajor)
    : levelArg;

if (!LEVELS.has(level)) {
  throw new Error(`--level must be one of: ${[...LEVELS].join(', ')}`);
}

if (printLevel) {
  process.stdout.write(`${level}\n`);
  process.exit(0);
}

const nextVersion = bumpVersion(baseVersion, level);
const nextPeer = peerRangeFor(nextVersion);

for (const pkg of packages) {
  pkg.json.version = nextVersion;
  if (pkg.json.name === '@z-ux/ui' && pkg.json.peerDependencies?.['@z-ux/tokens']) {
    pkg.json.peerDependencies['@z-ux/tokens'] = nextPeer;
  }
  if (!dryRun) {
    writeFileSync(pkg.path, `${JSON.stringify(pkg.json, null, 2)}\n`);
  }
}

console.log(
  `${dryRun ? '[dry-run] ' : ''}Bumped @z-ux/tokens and @z-ux/ui ${baseVersion} → ${nextVersion} (${level}); ui peer @z-ux/tokens ${nextPeer}`,
);
