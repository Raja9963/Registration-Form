import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose, { Schema } from 'mongoose';
import cors from 'cors';


const app = express();

const port = 5000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



mongoose.connect("mongodb+srv://raja143:raja143@cluster0.glkwfqv.mongodb.net/register");

const schema=new Schema({
    Company_Name:{
        type:String,
        required:true
    },
    Website_URL:{
        type:String
    },
    Year_of_Establishment:{
        type:Number,
        required:true
    },
    Headquaters:{
        type:String,
        required:true
    },
    Contact_Persons_name:{
        firstName:{
            type:String,
        },
        lastName:{
            type:String
        }
    },
    Designation:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Number:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
        enum:['Identity','Authentication','Cybersecurity','GenAI','Blockchain'],
        required:true
    },
    Operations:{
        type:[String],
        enum:['Banking & Finance', 'Healthcare', 'Logistic & Supply Chain', 'Agriculture','Retail']

    },
    Innonation:{
        type:String,
        required:true,
        minlength: 50,
        maxlength: 500
    },
    Problems:{
        type:String,
        required:true,
        maxlength: 500
    },
    Impactful:{
        type:String,
        maxlength:500
    },
    websiteUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
            },
            message: 'Invalid URL format'
        }
    },

})

const Doc=mongoose.model('Doc',schema);

// const ra=new Doc({
//     Company_Name:"Raj Company",
//     Website_URL:"grrhrdjytdjtyj",
//     Year_of_Establishment:2023,
//     Headquaters:"Banglore",
//     Contact_Persons_name:{
//         firstName:"Raj",
//         lastName:"Sekhar"
//     },
//     Designation:"Software",
//     Email:"thappettarejasekharreddy@gmail.com",
//     Number:868873747,
//     Category:'Authentication',
//     Operations:['Banking & Finance', 'Healthcare', 'Logistic & Supply Chain', 'Agriculture','Retail'],
//     Innonation:"bfvjrfgbsjbgfjngf",
//     Problems:"qwvjqbfolenfdwebfiewu",
//     Impactful:"iugrwgiuernga rjiefgniergnietgujn",
//     // pdfFile:{ binData: 'test'},
//     websiteUrl:"https://forms.zohopublic.in/messemunchenindia/form/InnovationCarnival2025NominationForm/formperma/3rE62kcFNMLWsFfWOuSuQDR1wyfpm18XpCnhOOWU9Fs",

// });

// ra.save();

app.get("/",(req,res)=>{
    res.send("Hihjgdhgldkj")
})

app.post("/api/companies", async (req, res) => {
    try {
      const newCompany = new Doc(req.body);
      await newCompany.save();
      res.status(201).json({ message: "Company added successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})