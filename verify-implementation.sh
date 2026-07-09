#!/bin/bash

# Script de Verificación - Componentes Modernos CloudBit
# Ejecuta: bash verify-implementation.sh

echo "🔍 Verificando Implementación de Componentes Modernos..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de verificaciones
PASSED=0
FAILED=0

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASSED++))
    else
        echo -e "${RED}❌${NC} $2 - Archivo no encontrado: $1"
        ((FAILED++))
    fi
}

# Función para verificar contenido
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $3"
        ((PASSED++))
    else
        echo -e "${RED}❌${NC} $3 - No encontrado en $1"
        ((FAILED++))
    fi
}

echo "📦 1. Verificando dependencias..."
echo "-----------------------------------"

# Verificar framer-motion
if grep -q '"framer-motion"' package.json; then
    VERSION=$(grep '"framer-motion"' package.json | sed 's/.*": "//;s/".*//')
    echo -e "${GREEN}✅${NC} Framer Motion instalado (${VERSION})"
    ((PASSED++))
else
    echo -e "${RED}❌${NC} Framer Motion NO instalado"
    echo -e "${YELLOW}⚠️${NC}  Ejecuta: npm install framer-motion"
    ((FAILED++))
fi

echo ""
echo "📂 2. Verificando componentes modernos..."
echo "-----------------------------------"

check_file "src/app/components/HeroModern.tsx" "HeroModern.tsx creado"
check_file "src/app/components/ServicesModern.tsx" "ServicesModern.tsx creado"
check_file "src/app/components/AboutModern.tsx" "AboutModern.tsx creado"
check_file "src/app/components/GenkitDemoModern.tsx" "GenkitDemoModern.tsx creado"

echo ""
echo "🔧 3. Verificando hooks de utilidad..."
echo "-----------------------------------"

check_file "src/hooks/useReducedMotion.ts" "useReducedMotion.ts creado"
check_file "src/app/components/HeroModern.optimized.tsx" "HeroModern.optimized.tsx creado (versión optimizada)"

echo ""
echo "📚 4. Verificando documentación..."
echo "-----------------------------------"

check_file "COMPONENTES_MODERNOS_README.md" "README de componentes"
check_file "GUIA_INTEGRACION.md" "Guía de integración"
check_file "PERSONALIZACIONES_AVANZADAS.md" "Guía de personalizaciones"
check_file "COMPARACION_ANTES_DESPUES.md" "Comparación antes/después"
check_file "RESUMEN_IMPLEMENTACION.md" "Resumen de implementación"

echo ""
echo "🎯 5. Verificando características clave..."
echo "-----------------------------------"

check_content "src/app/components/HeroModern.tsx" "framer-motion" "HeroModern usa Framer Motion"
check_content "src/app/components/HeroModern.tsx" "Glow Orb" "HeroModern tiene glow effects"
check_content "src/app/components/ServicesModern.tsx" "featuredIds" "ServicesModern tiene Bento Grid"
check_content "src/app/components/AboutModern.tsx" "AnimatedCounter" "AboutModern usa contadores animados"
check_content "src/app/components/GenkitDemoModern.tsx" "suggestedPrompts" "GenkitDemoModern tiene pills interactivos"

echo ""
echo "🔍 6. Verificando integración en page.tsx..."
echo "-----------------------------------"

if [ -f "src/app/page.tsx" ]; then
    if grep -q "HeroModern\|ServicesModern\|AboutModern\|GenkitDemoModern" "src/app/page.tsx"; then
        echo -e "${GREEN}✅${NC} Componentes modernos ya integrados en page.tsx"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠️${NC}  Componentes modernos NO integrados en page.tsx"
        echo -e "${YELLOW}   👉${NC} Actualiza los imports en src/app/page.tsx"
        echo -e "${YELLOW}   📖${NC} Ver: GUIA_INTEGRACION.md"
    fi
else
    echo -e "${RED}❌${NC} src/app/page.tsx no encontrado"
    ((FAILED++))
fi

echo ""
echo "================================================"
echo "📊 Resumen de Verificación"
echo "================================================"
echo -e "${GREEN}✅ Pasadas:${NC} $PASSED"
echo -e "${RED}❌ Fallidas:${NC} $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Verificación completa! Todo está listo.${NC}"
    echo ""
    echo "🚀 Próximos pasos:"
    echo "   1. Actualiza src/app/page.tsx con los nuevos componentes"
    echo "   2. Ejecuta: npm run dev"
    echo "   3. Abre: http://localhost:3000"
    echo ""
    echo "📖 Lee GUIA_INTEGRACION.md para más detalles"
else
    echo -e "${YELLOW}⚠️  Algunas verificaciones fallaron.${NC}"
    echo ""
    echo "🔧 Soluciones:"
    echo "   - Si falta framer-motion: npm install framer-motion"
    echo "   - Si faltan archivos: Revisa que todos los componentes se hayan creado"
    echo ""
fi

echo ""
echo "================================================"
