/* eslint-disable no-console */
const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

const run = (command) => {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (_e) {
    return null;
  }
};

const runDirect = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (_e) {
    return false;
  }
};

console.log(
  `${colors.cyan}${colors.bright}--- 🚀 ASSISTANT DE RELEASE SUPER GÉNIAL ---${colors.reset}\n`
);

const currentBranch = run('git rev-parse --abbrev-ref HEAD');
if (currentBranch !== 'main' && currentBranch !== 'master') {
  console.log(
    `${colors.red}❌ Erreur : Tu dois être sur la branche main pour créer une release.${colors.reset}`
  );
  process.exit(1);
}

const status = run('git status --porcelain');
if (status) {
  console.log(
    `${colors.yellow}⚠️  Ton repo n'est pas propre. Commit tes changements avant de lancer une release.${colors.reset}`
  );
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const appJson = JSON.parse(fs.readFileSync('./app.json', 'utf8'));
const currentVersion = packageJson.version;

console.log(
  `Version actuelle : ${colors.yellow}${currentVersion}${colors.reset}`
);

rl.question(
  `\n${colors.green}Type de mise à jour ? (patch/minor/major) [patch] : ${colors.reset}`,
  (type) => {
    const bumpType = type || 'patch';
    if (!['patch', 'minor', 'major'].includes(bumpType)) {
      console.log(`${colors.red}❌ Type invalide.${colors.reset}`);
      process.exit(1);
    }

    const parts = currentVersion.split('.').map(Number);
    if (bumpType === 'major') parts[0]++;
    if (bumpType === 'minor') parts[1]++;
    if (bumpType === 'patch') parts[2]++;
    if (bumpType !== 'patch') parts[2] = 0;
    if (bumpType === 'major') parts[1] = 0;
    const newVersion = parts.join('.');

    console.log(
      `Nouvelle version : ${colors.bright}${newVersion}${colors.reset}`
    );

    rl.question(
      `\n${colors.yellow}Confirmer la release v${newVersion} ? (y/n) : ${colors.reset}`,
      (confirm) => {
        if (confirm.toLowerCase() !== 'y') {
          console.log('Release annulée.');
          process.exit(0);
        }

        console.log(`\n📝 Mise à jour de package.json et app.json...`);
        packageJson.version = newVersion;
        appJson.expo.version = newVersion;
        fs.writeFileSync(
          './package.json',
          JSON.stringify(packageJson, null, 2) + '\n'
        );
        fs.writeFileSync('./app.json', JSON.stringify(appJson, null, 2) + '\n');

        console.log(`📝 Mise à jour des versions dans les templates UI...`);
        const uiTemplates = [
          './src/screens/Reglages.tsx',
          './src/components/molecules/SectionFooter.tsx',
        ];
        uiTemplates.forEach((path) => {
          if (fs.existsSync(path)) {
            let content = fs.readFileSync(path, 'utf8');
            content = content.replace(
              /v[0-9.]+\s*-\s*2026\s*Ferme\s*du\s*Buisson/g,
              `v${newVersion} - 2026 Ferme du Buisson`
            );
            fs.writeFileSync(path, content);
          }
        });

        console.log(`📦 Git commit & tag...`);
        runDirect(`git commit -am "chore(release): v${newVersion}"`);
        runDirect(`git tag -a v${newVersion} -m "Release v${newVersion}"`);

        console.log(`🚀 Push vers GitHub...`);
        runDirect('git push origin main');
        runDirect('git push origin --tags');

        console.log(`\n🏗️  Lancement du build EAS (Android Preview)...`);
        runDirect('eas build --platform android --profile preview');

        console.log(
          `\n${colors.green}${colors.bright}✅ Release v${newVersion} terminée avec succès !${colors.reset}`
        );
        rl.close();
      }
    );
  }
);
