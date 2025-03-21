import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './index.css';

const schema = yup.object().shape({
  Company_Name: yup.string().required("Company Name is required"),
  Website_URL: yup.string().url("Invalid URL format"),
  Year_of_Establishment: yup
    .number()
    .required("Year of Establishment is required"),
  Headquaters: yup.string().required("Headquarters is required"),
  Contact_Persons_name: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
  }),
  Designation: yup.string().required("Designation is required"),
  Email: yup.string().email("Invalid email format").required("Email is required"),
  Number: yup.number().required("Number is required"),
  Category: yup
    .string()
    .oneOf(["Identity", "Authentication", "Cybersecurity", "GenAI", "Blockchain"], "Invalid category")
    .required("Category is required"),
    Operations: yup
    .array()
    .of(
      yup.string().oneOf([
        "Banking & Finance",
        "Healthcare",
        "Logistic & Supply Chain",
        "Agriculture",
        "Retail",
      ])
    )
    .min(1, "At least one operation must be selected")
    .required("Operations is required"),
  Innonation: yup
    .string()
    .required("Innovation is required")
    .min(50, "Minimum 50 characters required")
    .max(500, "Maximum 500 characters allowed"),
  Problems: yup.string().required("Problems field is required").max(500),
  Impactful: yup.string().max(500),
  websiteUrl: yup.string().url("Invalid URL format").required("Website URL is required"),
});

const CompanyForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Company added successfully!");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <form className="grid justify-items-center" onSubmit={handleSubmit(onSubmit)}>
      <label className="text-sm font-semibold">Company Name:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("Company_Name")}  />
      </div>
      <p>{errors.Company_Name?.message}</p>
      <label className="text-sm font-semibold">Website URL:</label>      
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("Website_URL")}  />
      </div>
      <p>{errors.Website_URL?.message}</p>
      <label  className="text-sm font-semibold">Year of Establishment:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input type="number" className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Year_of_Establishment")}  />
      </div>
      <p>{errors.Year_of_Establishment?.message}</p>
      <label  className="text-sm font-semibold">Headquarters:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Headquaters")} />
      </div>
      <p>{errors.Headquaters?.message}</p>

      <label className="text-sm font-semibold">Contact Person First Name:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Contact_Persons_name.firstName")}  />
      </div>
      <label className="text-sm font-semibold">Contact Person Last Name:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Contact_Persons_name.lastName")}  />
      </div>
      <label className="text-sm font-semibold">Contact Person's Designation:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("Designation")}  />
      </div>
      <p>{errors.Designation?.message}</p>

      <label className="text-sm font-semibold">Contact Email:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("Email")}  />
      </div>
      <p>{errors.Email?.message}</p>

      <label className="text-sm font-semibold">Contact Phone Number:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("Number")}  />
      </div>
      
      <p>{errors.Number?.message}</p>

      <label className="text-sm font-semibold underline">Innovation Category:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <select className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" {...register("Category")}>
          <option value="Identity">Identity</option>
          <option value="Authentication">Authentication</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="GenAI">GenAI</option>
          <option value="Blockchain">Blockchain</option>
        </select>
      </div>
      <p>{errors.Category?.message}</p>

      <label  className="text-sm font-semibold">Sector Of Operations:</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <select className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" multiple {...register("Operations")} onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, (option) => option.value);
          setValue("Operations", values); // Manually update field value
        }}>
          <option value="Banking & Finance">Banking & Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Logistic & Supply Chain">Logistic & Supply Chain</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Retail">Retail</option>
        </select>
      </div>
      <p>{errors.Operations?.message}</p>

      <label className="text-sm font-semibold underline">What is your innovation? (50-500 characters) *</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <textarea className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Innonation")} />
      </div>
      
      <p>{errors.Innonation?.message}</p>

      <label className="text-sm font-semibold underline">What problem does it solve? (50-1500 characters) *</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <textarea className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Problems")} />
      </div>
      <p>{errors.Problems?.message}</p>

      <label className="text-sm font-semibold ">How is it unique and impactful? (25-500 characters)</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <textarea className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." {...register("Impactful")} />
      </div>
      <p>{errors.Impactful?.message}</p>

      <label className="text-sm font-semibold">Upload Demo/Video Link (YouTube/Vimeo/Drive link)</label>
      <div className="w-full max-w-sm min-w-[200px]">
        <input className="w-full bg-transparent  text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..."  {...register("websiteUrl")}  />
      </div>
      <p>{errors.websiteUrl?.message}</p>

      <button type="submit" className="w-48 h-12 border-4 border-solid bg-green-500 text-black-900">Submit</button>
    </form>
  );
};

export default CompanyForm;
