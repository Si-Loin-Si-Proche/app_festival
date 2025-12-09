const { execSync } = require('child_process');
const readline = require('readline');

// --- CONFIGURATION ---
const REPO_SLUG = 'Si-Loin-Si-Proche/app_festival';

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

const run = (command, ignoreError = false) => {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    if (!ignoreError) return null;
    return null;
  }
};

const runDirect = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (e) {
    return false;
  }
};

// Fonction compatible Windows, Mac et Linux pour ouvrir une URL
const openUrl = (url) => {
  const start =
    process.platform == 'darwin'
      ? 'open'
      : process.platform == 'win32'
        ? 'start'
        : 'xdg-open';
  try {
    execSync(`${start} "${url}"`);
  } catch (e) {
    console.log('Lien à ouvrir : ' + url);
  }
};

const getRepoUrl = () => {
  if (REPO_SLUG) return `https://github.com/${REPO_SLUG}`;
  try {
    let url = run('git config --get remote.origin.url');
    if (!url) return null;
    // Conversion SSH vers HTTPS pour que le lien marche dans le navigateur
    return url
      .replace('git@github.com:', 'https://github.com/')
      .replace('.git', '');
  } catch (e) {
    return null;
  }
};

console.log(
  `${colors.cyan}${colors.bright}--- 🚀 ASSISTANT GIT TOP SUPER GENIAL ---${colors.reset}\n`
);

const currentBranch = run('git rev-parse --abbrev-ref HEAD');
console.log(
  `Branche actuelle : ${colors.yellow}${currentBranch}${colors.reset}`
);

const startProcess = () => {
  if (currentBranch === 'main' || currentBranch === 'master') {
    console.log(`${colors.red}⚠️  Tu es sur main !${colors.reset}`);

    rl.question(
      `\n${colors.green}✨ Nom de la nouvelle fonctionnalité ? (ex: header-fix) : ${colors.reset}`,
      (branchName) => {
        if (!branchName) {
          console.log('❌ Nom vide.');
          process.exit(1);
        }

        const cleanName = branchName.toLowerCase().replace(/\s+/g, '-');
        const fullName = `feat/${cleanName}`;

        console.log(
          `\n🌿 Création : ${colors.bright}${fullName}${colors.reset}`
        );
        runDirect(`git checkout -b ${fullName}`);
        commitAndPush(fullName);
      }
    );
  } else {
    commitAndPush(currentBranch);
  }
};

const commitAndPush = (branchName) => {
  rl.question(
    `\n📝 ${colors.bright}Message de commit : ${colors.reset}`,
    (message) => {
      if (!message) {
        console.log('❌ Message vide.');
        process.exit(1);
      }

      console.log(`\n📦 Git Add & Commit...`);
      runDirect('git add .');
      const commitSuccess = runDirect(`git commit -m "${message}"`);

      if (!commitSuccess) {
        console.log(`${colors.red}❌ ECHEC DU COMMIT !${colors.reset}`);
        console.log(
          `${colors.yellow}Husky a bloqué le commit car il y a des erreurs (Lint ou Type).${colors.reset}`
        );
        console.log(`Corrige les erreurs affichées au-dessus et réessaie.`);
        process.exit(1);
      }
      console.log(`🚀 Push vers GitHub...`);
      const pushSuccess = runDirect(`git push -u origin ${branchName}`);

      if (pushSuccess) {
        openPrPage(branchName, message);
      } else {
        console.log(
          `${colors.red}❌ Échec du push. Vérifie ta connexion ou fais un git pull.${colors.reset}`
        );
        process.exit(1);
      }
    }
  );
};

const openPrPage = (branchName, title) => {
  console.log(
    `\n${colors.blue}🌐 Ouverture du navigateur pour valider la PR...${colors.reset}`
  );

  const repoUrl = getRepoUrl();

  if (repoUrl) {
    const prUrl = `${repoUrl}/compare/main...${branchName}?expand=1&title=${encodeURIComponent(title)}&body=${encodeURIComponent('PR créée automatiquement via le script étudiant.')}`;

    openUrl(prUrl);
    console.log(
      `👉 Si la fenêtre ne s'ouvre pas, clique ici : \n${colors.blue}${prUrl}${colors.reset}`
    );
  } else {
    console.log(
      `${colors.red}❌ Impossible de trouver l'URL du repo. Ouvre GitHub manuellement.${colors.reset}`
    );
  }

  // --- RETOUR AUTOMATIQUE SUR MAIN ---
  console.log(
    `\n🔙 ${colors.cyan}Retour automatique sur la branche main...${colors.reset}`
  );
  runDirect('git checkout main');
  runDirect('git pull origin main'); // Petit pull pour être sûr d'être à jour

  console.log(
    `${colors.green}👋 Tu es de nouveau sur main. Prêt pour la prochaine tâche !${colors.reset}`
  );
  rl.close();
};

startProcess();
