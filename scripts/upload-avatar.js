import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";

const TOKEN = process.env.GITHUB_TOKEN; // tu PAT
const REPO = "KiwiChat/avatars";
const BRANCH = "main";

if (!TOKEN) throw new Error("Trebuie să setezi GITHUB_TOKEN în mediu");

const octokit = new Octokit({ auth: TOKEN });

async function upload(filePath) {
  const content = fs.readFileSync(filePath, { encoding: "base64" });
  const filename = path.basename(filePath);
  const remotePath = `avatars/${Date.now()}_${filename}`;

  await octokit.repos.createOrUpdateFileContents({
    owner: "KiwiChat",
    repo: "avatars-github",
    path: remotePath,
    message: `Subido avatar ${filename}`,
    content,
    branch: BRANCH
  });

  console.log(`Avatar încărcat: https://avatar.showchat.eu.org/${remotePath}`);
}

const file = process.argv[2];
if (!file) {
  console.error("Utilizare: node upload-avatar.js <archivo>");
  process.exit(1);
}

upload(file);
