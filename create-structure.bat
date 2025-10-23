@echo off
echo 🚀 TAO CAU TRUC Everwell Magazine - TAT CA FILE RONG TRONG src/!
echo 📂 Vi tri hien tai: %CD%
echo.

REM === TAO THU MUC src ===
mkdir src 2>nul
cd src

REM === TAO CAC THU MUC CHINH TRONG src ===
mkdir app components lib public 2>nul

REM === APP ===
cd app
mkdir about api\comments api\search api\subscribe contact search 2>nul
mkdir "(categories)\[slug]\article\[article-slug]" 2>nul
mkdir "(categories)\[slug]\product\[product-slug]" 2>nul

REM File app (RONG)
type nul > about\layout.tsx
type nul > about\page.tsx
type nul > contact\layout.tsx
type nul > contact\page.tsx
type nul > search\layout.tsx
type nul > search\page.tsx
type nul > "(categories)\layout.tsx"
type nul > "(categories)\[slug]\layout.tsx"
type nul > "(categories)\[slug]\page.tsx"
type nul > "(categories)\[slug]\article\[article-slug]\layout.tsx"
type nul > "(categories)\[slug]\article\[article-slug]\page.tsx"
type nul > "(categories)\[slug]\product\[product-slug]\layout.tsx"
type nul > "(categories)\[slug]\product\[product-slug]\page.tsx"
type nul > api\comments\route.ts
type nul > api\search\route.ts
type nul > api\subscribe\route.ts
type nul > error.tsx
type nul > favicon.ico
type nul > globals.css
type nul > layout.tsx
type nul > loading.tsx
type nul > page.tsx
type nul > robots.ts
type nul > sitemap.ts
cd ..

REM === COMPONENTS ===
cd components
mkdir common "content\articles" "content\comments" "content\products" "content\sidebar" "layout\seo" "ui\variants" 2>nul

type nul > common\image-renderer.tsx
type nul > common\markdown-renderer.tsx
type nul > common\share-buttons.tsx

type nul > content\articles\article-card.tsx
type nul > content\articles\article-content.tsx
type nul > content\articles\article-list.tsx
type nul > content\articles\related-articles.tsx

type nul > content\comments\comment-card.tsx
type nul > content\comments\comment-form.tsx
type nul > content\comments\comment-list.tsx
type nul > content\comments\comment-section.tsx

type nul > content\products\product-card.tsx
type nul > content\products\product-detail.tsx
type nul > content\products\product-list.tsx
type nul > content\products\related-products.tsx

type nul > content\sidebar\category-menu.tsx
type nul > content\sidebar\sidebar.tsx
type nul > content\sidebar\trending-content.tsx

type nul > layout\seo\article-schema.tsx
type nul > layout\seo\breadcrumb-schema.tsx
type nul > layout\seo\category-schema.tsx
type nul > layout\seo\product-schema.tsx
type nul > layout\seo\site-schema.tsx
type nul > layout\category-layout.tsx
type nul > layout\footer.tsx
type nul > layout\navbar.tsx

type nul > ui\variants\primary-button.tsx
type nul > ui\variants\secondary-button.tsx
type nul > ui\breadcrumb.tsx
type nul > ui\button.tsx
type nul > ui\card.tsx
type nul > ui\error.tsx
type nul > ui\loading.tsx
type nul > ui\pagination.tsx
type nul > ui\search-bar.tsx
cd ..

REM === LIB ===
cd lib
mkdir "api\internal" "api\strapi" hooks seo types utils 2>nul

type nul > api\internal\analytics.ts
type nul > api\internal\email.ts
type nul > api\strapi\fetch-strapi.ts
type nul > api\strapi\get-article.ts
type nul > api\strapi\get-articles.ts
type nul > api\strapi\get-categories.ts
type nul > api\strapi\get-category.ts
type nul > api\strapi\get-comments.ts
type nul > api\strapi\get-product.ts
type nul > api\strapi\get-products.ts
type nul > api\strapi\post-comment.ts

type nul > hooks\use-pagination.ts
type nul > hooks\use-search.ts
type nul > hooks\use-strapi-query.ts

type nul > seo\generate-article-metadata.ts
type nul > seo\generate-category-metadata.ts
type nul > seo\generate-product-metadata.ts
type nul > seo\generate-site-metadata.ts

type nul > types\api.ts
type nul > types\article.ts
type nul > types\category.ts
type nul > types\comment.ts
type nul > types\product.ts

type nul > utils\constants.ts
type nul > utils\format-date.ts
type nul > utils\get-error-message.ts
type nul > utils\slugify.ts
cd ..

REM === PUBLIC ===
cd public
mkdir "images\categories" "images\icons" "images\og" 2>nul
type nul > images\categories\heart-health.jpg
type nul > images\categories\weight-loss.jpg
type nul > images\icons\facebook.svg
type nul > images\icons\instagram.svg
type nul > images\icons\twitter.svg
type nul > images\og\default.jpg
type nul > images\logo.svg
type nul > images\placeholder.webp
type nul > manifest.json
cd ..

REM === ROOT (middleware ở ngoài src) ===
cd ..
type nul > middleware.ts

echo ✅ HOAN THANH! Da tao DU 120+ file RONG trong src/!
echo 📁 Kiem tra: dir src /s
echo 🚀 Chay: npm run dev
pause