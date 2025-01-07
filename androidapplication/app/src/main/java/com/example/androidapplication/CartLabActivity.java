package com.example.androidapplication;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;

public class CartLabActivity extends AppCompatActivity {
    HashMap<String,String> item;
    ArrayList list;
    SimpleAdapter sa;
    TextView tvtotal;
    private DatePickerDialog datePickerDialog;
    private TimePickerDialog timePickerDialog;
    private Button dateButton,timeButton,btncartcheckout,btnBack;
    private String[][] packages = {};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_cart_lab);
        dateButton = findViewById(R.id.buttoncartdate);
        timeButton = findViewById(R.id.buttoncarttime);
        btncartcheckout = findViewById(R.id.btncartcheckout);
        btnBack = findViewById(R.id.btncartback);
        SharedPreferences sharedPreferences = getSharedPreferences("shared_prefs", Context.MODE_PRIVATE);
        String username = sharedPreferences.getString("username","").toString();

        Database db = new Database(getApplicationContext(),"healthcare",null,1);
        float totalAmount =0;
        ArrayList dbData = db.getCartData(username,"lab");
        Toast.makeText(getApplicationContext(),""+dbData,Toast.LENGTH_SHORT).show();

        packages = new String[dbData.size()][];
        for(int i = 0;i<packages.length;i++){
            packages[i] = new String[5];
        }

        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(CartLabActivity.this, LabTestActivity.class));

            }
        });
        initDatePicker();

        dateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                datePickerDialog.show();
            }
        });
        initTimePicker();
        timeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                timePickerDialog.show();
            }
        });
    }

        private void initDatePicker() {
            DatePickerDialog.OnDateSetListener dateSetListener = new DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                    i1 = i1 + 1;
                    dateButton.setText(i2 + "/" + i1 + "/" + 1);
                }
            };

            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH);
            int day = cal.get(Calendar.DAY_OF_MONTH);

            int style = AlertDialog.THEME_HOLO_DARK;
            datePickerDialog = new DatePickerDialog(this, style, dateSetListener, year, month, day);
            datePickerDialog.getDatePicker().setMinDate(cal.getTimeInMillis() + 86400000);
        }

            private void initTimePicker(){
                TimePickerDialog.OnTimeSetListener timeSetListener = new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker timePicker, int i, int i1) {
                        timeButton.setText(i+":"+i1);
                    }
                };
                Calendar cal = Calendar.getInstance();
                int hrs = cal.get(Calendar.HOUR);
                int mins = cal.get(Calendar.MINUTE);

                int style = AlertDialog.THEME_HOLO_DARK;
                timePickerDialog = new TimePickerDialog(this,style,timeSetListener,hrs,mins,true);






            }
}