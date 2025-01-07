package com.example.androidapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.HashMap;

public class DoctorDetailsActivity extends AppCompatActivity {
     private  String[][] doctorDetails1 =
             {

                 {"Doctor Name: Neelam Patil", "Hospital Address : Pimpari", "Exp: 10 years", "Mobile: 9876543210"," Fees: 500"},
                 {"Doctor Name: Swati Pawar", "Hospital Address : Nigdi", "Exp: 8 years", "Mobile: 9123456789", "Fees: 600"},
                 {"Doctor Name: Neeraja Kale", "Hospital Address : Pune", "Exp: 15 years", "Mobile: 9876543201", "Fees: 700"},
                 {"Doctor Name: Mayuri Deshmukh", "Hospital Address : Chinchwad", " Exp: 5 years", "Mobile: 9123456798", " Fees: 450"},
                 { "Doctor Name: Minakshi Panda", "Hospital Address : Katraj", "Exp: 12 years", "Mobile: 9876543202", " Fees: 550"}

             };


    private  String[][] doctorDetails2 =
            {
                    {"Doctor Name: Ramesh Kulkarni", "Hospital Address: Baner", "Exp: 7 years", "Mobile: 9876543203", "Fees: 480"},
                    {"Doctor Name: Priya Shah", "Hospital Address: Wakad", "Exp: 9 years", "Mobile: 9123456790", "Fees: 600"},
                    {"Doctor Name: Arjun Joshi", "Hospital Address: Hadapsar", "Exp: 11 years", "Mobile: 9876543204", "Fees: 530"},
                    {"Doctor Name: Pooja Nair", "Hospital Address: Koregaon Park", "Exp: 6 years", "Mobile: 9123456787", "Fees: 490"},
                    {"Doctor Name: Manisha Gupta", "Hospital Address: Kalyani Nagar", "Exp: 10 years", "Mobile: 9876543205", "Fees: 520"}
            };
    private  String[][] doctorDetails3 =
            {
                    {"Doctor Name: Shreya Pandit", "Hospital Address: Magarpatta", "Exp: 14 years", "Mobile: 9123456786", "Fees: 620"},
                    {"Doctor Name: Vikram Shetty", "Hospital Address: Aundh", "Exp: 8 years", "Mobile: 9876543206", "Fees: 540"},
                    {"Doctor Name: Snehal Desai", "Hospital Address: Viman Nagar", "Exp: 13 years", "Mobile: 9123456785", "Fees: 570"},
                    {"Doctor Name: Harshita Reddy", "Hospital Address: Yerwada", "Exp: 6 years", "Mobile: 9876543207", "Fees: 460"},
                    {"Doctor Name: Anil Kumar", "Hospital Address: Pashan", "Exp: 9 years", "Mobile: 9123456784", "Fees: 580"}
            };
    private  String[][] doctorDetails4 =
            {
                    {"Doctor Name: Manish Gupta", "Hospital Address: Balewadi", "Exp: 12 years", "Mobile: 9876543207", "Fees: 580"},
                    {"Doctor Name: Sneha More", "Hospital Address: Kondhwa", "Exp: 10 years", "Mobile: 9123456782", "Fees: 550"},
                    {"Doctor Name: Priya Jadhav", "Hospital Address: Camp", "Exp: 9 years", "Mobile: 9876543208", "Fees: 560"},
                    {"Doctor Name: Abhishek Yadav", "Hospital Address: Swargate", "Exp: 7 years", "Mobile: 9123456781", "Fees: 510"},
                    {"Doctor Name: Shweta Kulkarni", "Hospital Address: Bibwewadi", "Exp: 11 years", "Mobile: 9876543209", "Fees: 640"}
            };
    private  String[][] doctorDetails5 =
            {
                    {"Doctor Name: Kavita Mehta", "Hospital Address: Bavdhan", "Exp: 7 years", "Mobile: 9876543208", "Fees: 510"},
                    {"Doctor Name: Shantanu Rao", "Hospital Address: Kharadi", "Exp: 5 years", "Mobile: 9123456783", "Fees: 490"},
                    {"Doctor Name: Megha Sharma", "Hospital Address: Hinjawadi", "Exp: 12 years", "Mobile: 9876543209", "Fees: 600"},
                    {"Doctor Name: Parth Patel", "Hospital Address: Warje", "Exp: 11 years", "Mobile: 9123456782", "Fees: 530"},
                    {"Doctor Name: Ruchi Tiwari", "Hospital Address: Kondhwa", "Exp: 10 years", "Mobile: 9876543210", "Fees: 550"}
            };


    TextView tv;
    Button btn;
    String [][] doctor_details = {};
    HashMap<String,String> item;
    ArrayList list;
    SimpleAdapter sa;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_doctor_details);
        tv= findViewById(R.id.listViewDe);
        btn = findViewById(R.id.buttonddback);

        Intent it = getIntent();
        String title = it.getStringExtra("title");
        tv.setText(title);

        if(title.compareTo("Family Physicians")==0)
            doctor_details = doctorDetails1;
        else
        if(title.compareTo("Dietician")==0)
            doctor_details = doctorDetails2;
        else
        if(title.compareTo("Dentist")==0)
            doctor_details = doctorDetails3;
        else
        if(title.compareTo("Surgeon")==0)
            doctor_details = doctorDetails4;
        else

            doctor_details = doctorDetails5;

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(DoctorDetailsActivity.this,FindDoctorActivity.class));
            }
        });
        list = new ArrayList();
        for(int i =0;i<doctor_details.length;i++){
            item = new HashMap<String,String>();
            item.put("line1",doctor_details[i][0]);
            item.put("line2",doctor_details[i][1]);
            item.put("line3",doctor_details[i][2]);
            item.put("line4",doctor_details[i][3]);
            item.put("line5","Cons Fees:"+doctor_details[i][4]+"/-");
            list.add(item);

        }
        sa = new SimpleAdapter(this,list,
                R.layout.muliti_lines,
                new String[]{"line1","line2","line3","line4","line5"},
                new int[]{R.id.line_a,R.id.line_b,R.id.line_c,R.id.line_d,R.id.line_e});
        ListView lst = findViewById(R.id.listViewLt);
        lst.setAdapter(sa);

        lst.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent it = new Intent(DoctorDetailsActivity.this,BookAppointmentActivity.class);
                it.putExtra("text1",title);
                it.putExtra("text2",doctor_details[i][0]);
                it.putExtra("text3",doctor_details[i][1]);
                it.putExtra("text4",doctor_details[i][3]);
                it.putExtra("text5",doctor_details[i][4]);
                startActivity(it);

            }
        });

    }
}