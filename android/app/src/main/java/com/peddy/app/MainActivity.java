package com.peddy.app;

import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintJob;
import android.print.PrintManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    private static final String START_PAGE = "file:///android_asset/peddy/index.html";
    private static final String BASE_URL = "file:///android_asset/peddy/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);

        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new AndroidPrintBridge(this), "Android");
        webView.loadUrl(START_PAGE);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    static class AndroidPrintBridge {
        private final Context context;

        AndroidPrintBridge(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public void printHtml(final String html, final String jobName) {
            if (html == null) return;
            final WebView printWebView = new WebView(context);
            printWebView.getSettings().setJavaScriptEnabled(true);
            printWebView.getSettings().setDomStorageEnabled(true);
            printWebView.loadDataWithBaseURL(BASE_URL, html, "text/HTML", "UTF-8", null);
            printWebView.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageFinished(WebView view, String url) {
                    PrintManager printManager = (PrintManager) context.getSystemService(Context.PRINT_SERVICE);
                    String name = (jobName == null || jobName.isEmpty()) ? "Peddy" : jobName;
                    PrintJob printJob = printManager.print(name, view.createPrintDocumentAdapter(name),
                            new PrintAttributes.Builder().build());
                }
            });
        }
    }
}
