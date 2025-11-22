// scripts/push-pro-max.js
// Sistema PRO MAX para despliegue automático

const { execSync } = require("child_process");
const fs = require("fs");

// =======================
// 1. Crear versión nueva
// =======================
const pkgPath = "./package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

function bumpVersion(v) {
  let [major, minor, patch] = v.split(".").map(Number);
  patch++;
  return `${major}.${minor}.${patch}`;
}

const newVersion = bumpVersion(pkg.version);
pkg.version = newVersion;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`\n🔵 Nueva versión: ${newVersion}\n`);

// =======================
// 2. Generar tag PRO MAX
// =======================
const now = new Date();
const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);

const tagName = `v${newVersion}-${timestamp}`;

console.log(`🏷  Tag generado: ${tagName}\n`);

// =======================
// 3. Limpieza dist
// =======================
console.log("🧹 Limpiando carpeta dist...");
if (fs.existsSync("./dist")) {
  fs.rmSync("./dist", { recursive: true, force: true });
}

// =======================
// 4. Build del proyecto
// =======================
console.log("⚙️  Compilando proyecto...");
execSync("npm run build", { stdio: "inherit" });

// =======================
// 5. Git add
// =======================
console.log("📦 Añadiendo cambios a Git...");
execSync("git add .");

// =======================
// 6. Commit automático
// =======================
console.log("📝 Generando commit automático...");
execSync(
  `git commit -m "auto(PRO-MAX): versión ${newVersion} — ${now.toLocaleString()}" || echo "Sin cambios para commitear"`
);

// =======================
// 7. Crear tag
// =======================
console.log("🏷  Creando tag...");
try {
  execSync(`git tag ${tagName}`);
} catch (e) {
  console.log("El tag ya existía, saltado.");
}

// =======================
// 8. Git push + push tags
// =======================
console.log("⤴️  Subiendo a GitHub...");
execSync("git push", { stdio: "inherit" });
execSync("git push --tags", { stdio: "inherit" });

// =======================
// 9. Deploy GitHub Pages
// =======================
console.log("🚀 Deploy en GitHub Pages...");
execSync("npm run deploy", { stdio: "inherit" });

// =======================
// 10. Final
// =======================
console.log(`
==============================
🎉 PRO MAX COMPLETADO 🎉

Versión:    ${newVersion}
Tag:        ${tagName}

La app está desplegada y lista.
==============================
`);
