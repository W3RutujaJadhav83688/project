package com.example.androidapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class RegisterActivity extends AppCompatActivity {
    EditText edUsername, edPassword, edConfirm, edEmail;
    Button bt;
    TextView tv;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_register);

        edUsername = findViewById(R.id.editbookappname);
        edPassword = findViewById(R.id.editappcontact);
        edConfirm = findViewById(R.id.editappfees);
        edEmail = findViewById(R.id.editbookAddress);
        bt = findViewById(R.id.btback);
        tv = findViewById(R.id.textviewexistingRegister);

        tv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
            }
        });

        bt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String UserName = edUsername.getText().toString();
                String email = edEmail.getText().toString();
                String Password = edPassword.getText().toString();
                String Confirm = edConfirm.getText().toString();
                Database db = new Database(getApplicationContext(),"healthcare",null,1);
                if (UserName.length() == 0 || email.length() == 0 || Password.length() == 0 || Confirm.length() == 0) {
                    Toast.makeText(getApplicationContext(), "Please Fill All Details", Toast.LENGTH_SHORT).show();
                } else {
                    if (Password.compareTo(Confirm) == 0) {
                        if(isValid(Password)){
                            db.register(UserName,email,Password);
                            Toast.makeText(getApplicationContext(), "Record Inserted", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(RegisterActivity.this, LoginActivity.class));

                        }else {
                            Toast.makeText(getApplicationContext(), "Password must contain 8 charcter having letter,digit and special symbol ", Toast.LENGTH_SHORT).show();
                        }

                    } else {
                        Toast.makeText(getApplicationContext(), "Password and Confirm didn't match", Toast.LENGTH_SHORT).show();
                    }
                }

            }
        });


    }

    public static boolean isValid(String passwordhere) {
        int f1 = 0, f2 = 0, f3 = 0;

        if (passwordhere.length() < 8) {
            return false;
        } else {
            for (int p = 0; p < passwordhere.length(); p++) {
                if (Character.isLetter(passwordhere.charAt(p))) {
                    f1 = 1;
                }
            }
            for (int r = 0; r < passwordhere.length(); r++) {
                if (Character.isDigit(passwordhere.charAt(r))) {
                    f2 = 1;
                }
            }
            for (int s = 0; s < passwordhere.length(); s++) {
                char c = passwordhere.charAt(s);
                if (c >= 33 && c <= 46 || c == 64) {
                    f3 = 1;
                }
            }
            if (f1 == 1 && f2 == 1 && f3 == 1)
                  return true;
            return false;

        }
    }
}