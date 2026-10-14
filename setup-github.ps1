# ============================================
# Script de Setup do GitHub para HUWAG
# ============================================

Write-Host "🔥 HUWAG - Setup do GitHub" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 1. Inicializar Git
Write-Host "📦 Inicializando repositório Git..." -ForegroundColor Yellow
git init

# 2. Adicionar arquivos
Write-Host "📝 Adicionando arquivos ao staging..." -ForegroundColor Yellow
git add .

# 3. Primeiro commit
Write-Host "💾 Criando commit inicial..." -ForegroundColor Yellow
git commit -m "feat: setup inicial do projeto HUWAG

- Adiciona quarto do protagonista (Map001)
- Adiciona cidade filipina (Map002)  
- Adiciona quartel dos bombeiros (Map003)
- Adiciona NPCs com diálogos em português/tagalog
- Adiciona GDD completo em .kiro/steering/
- Configura .gitignore para RPG Maker MZ
- Adiciona README.md com documentação"

Write-Host ""
Write-Host "✅ Git inicializado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Criar repositório PRIVADO no GitHub:" -ForegroundColor White
Write-Host "   → Acesse: https://github.com/new" -ForegroundColor Gray
Write-Host "   → Nome: HUWAG" -ForegroundColor Gray
Write-Host "   → Visibilidade: Private ✓" -ForegroundColor Gray
Write-Host "   → NÃO inicialize com README (já temos um)" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Conectar ao repositório remoto:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/SEU-USUARIO/HUWAG.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Adicionar colaborador:" -ForegroundColor White
Write-Host "   → Settings → Collaborators → Add people" -ForegroundColor Gray
Write-Host "   → Digite o username do GitHub do seu colega" -ForegroundColor Gray
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎮 Pronto para colaborar!" -ForegroundColor Green
