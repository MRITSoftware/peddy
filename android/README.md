# Android WebView (Peddy)

## Como rodar
1. Abra a pasta `android/` no Android Studio.
2. Sincronize o Gradle.
3. Rode no dispositivo ou emulador.

## Conteúdo do sistema
Os arquivos HTML/JS/CSS do projeto são copiados para `app/src/main/assets/peddy` automaticamente no build.

## Impressão
O WebView expõe a ponte `Android.printHtml(html, titulo)` usada no `pdv.html` para imprimir direto no Android.
