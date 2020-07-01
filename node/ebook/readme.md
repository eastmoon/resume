## 電子書安裝程序

### 必要環境

+ [NVM for Windows](https://github.com/coreybutler/nvm-windows)

+ [Node.js](https://nodejs.org/en/)
> 建議版本 8.10.0 以上
>
> ```nvm install 8.10.0 && nvm use 8.10.0```

+ [yarn](https://yarnpkg.com/zh-Hans/)
> ```npm install -g yarn```

### 安裝

```
yarn install
```
> 相關套件與工具已經導入專案中

### 編譯

```
yarn build
```
> 重新將編譯內容輸出，讓測試檔可以重讀新內容

### 輸出

1. 安裝 [Calibre-ebook](https://calibre-ebook.com/download)
> [Mac OS 需注意官方文件設定](https://toolchain.gitbook.com/ebook.html)

2. 執行輸出命令，並在 BUILD 檔案夾下輸出指定的電子書 (pdf, epub) 檔案
> 若未執行第一步將無法正確輸出電子檔

其執行流程包括一下動作

+ 編譯 MD 檔案，轉換成必要的 JSON 檔案
+ 將 JSON 檔案作為參數檔案經由 next.js 框架並以 React 架構來產生靜態網站 HTML 檔案
+ 將 HTML 檔案經由 Calibre-ebook 轉換為 PDF 檔案

以上步驟分別對應到下述編譯指令

+ ```npm run build-markdown```，編譯 Markdown 檔案
+ ```npm run build-html```，編譯靜態 HTML 檔案
+ ```npm run build-ebook```，編譯電子書 PDF 檔案
