# Campus_Companion_App

## Project overview and problem statement
The Campus Companion application will solve the digital fragmentation (too many apps) that tends to make university life more complicated. This project combines web development techniques, deployment via Netlify, and machine learning to set up all-in-one app for students.  

The main issue that we identify is the fact that students have to operate within several unconnected applications of academic records, schedules and campus news. This application allows it to do so, offering a single dashboard, which enables the clear management  of the academic lifestyle of a student. The website is planned to be a centralised data source, which is aimed towards data for predictions to affect important student outcomes. 
- by Allyssa and Alia

##  Target users and user need (personas): 

The user base is profiles after the different types of student records of the university. The first group consists of commuter students who need real-time access to schedule changes and campus alerts through mobile friendly. Another personality is those who high-achievers, such as Amara Lynch, who require viewing their module grades and attendance in all in one place in order to track their academic performance. Also, foreign students like Mia Williams need convenient access to extracurricular activities and integration services. It is these personas that lead to a design of high usability and fast information retrieval.  

The system uses particular student profiles from campus_companion_students.csv data to provide international student services, which help Mia Williams access extracurricular activities and campus life support. The system uses student profiles from structured university datasets to create integration services, which help international users transition smoothly into campus life.  

- by Allyssa

##  Architecture Overview:
The Campus Companion application uses client-server architecture. This is a system that allows the clients (in this case students) to send a request to the server, which will then process the request to give an output of data back to the client (Anon., n.d.). The front end of the application will be built using Next.js, this will provide user interface and page navigation, which allows students access the system through pages containing events, calendars, reminders, helpdesk support and campus locations. The application uses a database which stores information such as events, locations and user actions. Serverless functions may be used to process actions such as submitting tickets and saving reminders. The front and back end of the application communicate using API requests, this is a request from a website to a server in order to send or receive data (Anon., n.d.). User authentication will be essential to allow users to log in and get personalised recommendations such as upcoming events. The Campus Companion application will deploy with Netlify with git automatic deployment, this means when the website will automatically update when new code is pushed to the Git repository (Anon., n.d.). This application architecture is scalable and simple to ensure the system will be able to handle many users/ data without crashing.
1-	Client-Server Architecture - System Design - GeeksforGeeks
2-	What is an API and How Does it Work? APIs for Beginners
3-	Git Auto Deployment: How to Set It Up, Best Practices & When to Avoid It
(Will harvard reference in final draft)
- by Leah
