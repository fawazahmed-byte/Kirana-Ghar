Kirana Ghar
a) Problem Statement Reference

Problem Statement Chosen:
Helping small Kirana store owners manage inventory, discover products, and compete effectively in a digital retail ecosystem.

Reason to Choose the Problem Statement:
Small shopkeepers face challenges with stock management, understanding local demand, and competing with supermarkets. Kirana Ghar aims to empower them through technology, giving them actionable insights and a smart platform to grow their business.

b) Solution Overview

Proposed Approach:
Kirana Ghar is a full-stack B2B retail platform connecting retailers with distributors. It provides smart suggestions, inventory management, and analytics to help shopkeepers make data-driven decisions.

Key Features / Modules:

Smart Product Recommendations

Real-time Sales Analytics

Inventory Management

Local Demand Insights

Order Management for Retailers

User Roles: Retailer & Distributor

c) System Architecture

Architecture Diagram / Workflow:

Retailer/Distributor
        |
   Frontend (React / React Native)
        |
    Backend (Node.js + Express.js)
        |
   Database (MongoDB)
        |
   Analytics & Recommendations Engine
        |
   Data Insights / Reports


Data Flow Explanation:

Retailers place orders and manage stock via the frontend.

Backend processes requests and interacts with MongoDB for data storage.

Sales data is analyzed to provide insights and smart product suggestions.

Recommendations and analytics are displayed back to the retailer in real-time.

d) Technology Stack

Backend: Node.js, Express.js
Frontend: React, React Native, HTML, CSS, JavaScript
Databases: MongoDB
ML/AI Frameworks: TensorFlow / Scikit-learn (for recommendation engine)
APIs / Libraries: Axios, Chart.js (for analytics), JWT (authentication)

e) Algorithms & Models

Algorithm(s) Chosen:

Collaborative Filtering for product recommendations

Basic Sales Prediction using Linear Regression

Reason for Choice:

Collaborative Filtering provides personalized product suggestions based on customer behavior.

Linear Regression allows predicting future demand trends to help with inventory management.

Model Training & Testing Approach:

Training on historical sales and purchase data.

Testing using split datasets to validate recommendation accuracy and prediction performance.

f) Data Handling

Data Sources Used (APIs/Datasets):

Retailers’ historical sales data

Distributor product catalogs

Local market trends from publicly available datasets

Preprocessing Methods:

Cleaning missing or inconsistent data

Normalizing sales quantities

Encoding categorical data (product types, categories)

Storage / Pipeline Setup:

Data stored in MongoDB collections

ETL pipeline to process new sales and update recommendations daily

g) Implementation Plan

Initial Setup & Environment:

Install Node.js, React, MongoDB

Set up project repository and folder structure

Core Module Development:

Retailer & distributor dashboards

Inventory management module

Recommendation engine and analytics module

Integration & Testing:

Connect frontend and backend

Unit testing for modules

Integration testing for complete workflow

Final Deployment-ready Build:

Host backend on a cloud server (Heroku / AWS)

Deploy frontend as a responsive web app

h) Performance & Validation

Evaluation Metrics:

Recommendation Accuracy (Precision, Recall)

Inventory Prediction Error (RMSE / MAE)

System Response Time & Load Handling

Testing Strategy:

Unit tests for each module

Integration tests for end-to-end workflow

Beta testing with sample retailers for feedback

i) Deployment & Scalability

Deployment Plan:

Backend: Node.js on cloud (Heroku / AWS EC2)

Frontend: React hosted on Vercel / Netlify

MongoDB Atlas for database

Scalability Considerations:

Horizontal scaling for backend services

Caching frequent queries for faster response

Cloud-based database ensures high availability and storage flexibility
