package io.ionic.chat;


import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        WebView webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);  // Habilita JavaScript si es necesario
        webView.loadUrl("file:///android_asset/splash-screen/index.html");

        // Añadir lógica para iniciar MainActivity después de unos segundos o cuando termine la animación.
        webView.postDelayed(() -> {
            // Lanza la actividad principal después de la duración del splash screen
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
            finish();
        }, 6000); // Esperar 3 segundos antes de pasar a la siguiente actividad
    }
}

