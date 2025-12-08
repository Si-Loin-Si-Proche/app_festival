const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- COULEURS POUR FAIRE PRO ---
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
};

const run = (command, ignoreError = false) => {
    try {
        return execSync(command, { stdio: 'pipe' }).toString().trim();
    } catch (e) {
        if (!ignoreError) {
            console.error(`${colors.red}❌ Erreur lors de : ${command}${colors.reset}`);
            console.error(e.stderr.toString());
            process.exit(1);
        }
        return null;
    }
};

const runDirect = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (e) {
        // On ne quitte pas forcément ici pour laisser la suite se faire (ex: checkout main)
    }
};

console.log(`${colors.cyan}${colors.bright}--- 🚀 ASSISTANT GIT (MODE GITHUB FLOW) ---${colors.reset}\n`);

// 1. VÉRIFICATION DE LA BRANCHE ACTUELLE
const currentBranch = run('git rev-parse --abbrev-ref HEAD');
console.log(`Branche actuelle : ${colors.yellow}${currentBranch}${colors.reset}`);

const startProcess = () => {
    // CAS 1 : L'étudiant est sur MAIN
    if (currentBranch === 'main' || currentBranch === 'master') {
        console.log(`${colors.red}⚠️  ATTENTION : Tu es sur la branche principale !${colors.reset}`);
        console.log(`Tu ne dois pas modifier ${currentBranch} directement.`);

        rl.question(`\n${colors.green}✨ Quel est le nom de ta nouvelle fonctionnalité ? (ex: page-accueil) : ${colors.reset}`, (branchName) => {
            if (!branchName) { console.log('❌ Nom vide.'); process.exit(1); }

            const cleanName = branchName.toLowerCase().replace(/\s+/g, '-');
            const fullName = `feat/${cleanName}`;

            console.log(`\n🌿 Création de la branche : ${colors.bright}${fullName}${colors.reset}`);
            runDirect(`git checkout -b ${fullName}`);

            // On lance le commit sur la nouvelle branche
            commitAndPush(fullName);
        });
    }
    // CAS 2 : Il est déjà sur une branche feat/ ou fix/
    else {
        commitAndPush(currentBranch);
    }
};

const commitAndPush = (branchName) => {
    rl.question(`\n📝 ${colors.bright}Message de commit : ${colors.reset}`, (message) => {
        if (!message) { console.log('❌ Message vide.'); process.exit(1); }

        console.log(`\n📦 Ajout des fichiers...`);
        runDirect('git add .');

        console.log(`📸 Commit...`);
        runDirect(`git commit -m "${message}"`);

        console.log(`🚀 Envoi vers GitHub...`);
        try {
            execSync(`git push -u origin ${branchName}`, { stdio: 'inherit' });
        } catch (e) {
            console.log(`${colors.yellow}⚠️  Petit souci au push (conflit ?), essaie de faire un 'git pull' manuellement.${colors.reset}`);
            process.exit(1);
        }

        console.log(`\n${colors.green}✅ SUCCÈS ! Ton code est sur GitHub.${colors.reset}`);
        console.log(`👉 Tu peux aller créer ta Pull Request (PR).`);

        // --- LE RETOUR AUTOMATIQUE SUR MAIN ---
        console.log(`\n🔙 ${colors.cyan}Retour automatique sur la branche main...${colors.reset}`);
        runDirect('git checkout main');
        runDirect('git pull origin main'); // Petit pull pour être sûr d'être à jour

        console.log(`${colors.green}👋 Tu es de nouveau sur main. Prêt pour la prochaine tâche !${colors.reset}`);
        rl.close();
    });
};

startProcess();