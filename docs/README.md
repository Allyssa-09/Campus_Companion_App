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
The Campus Companion application uses client-server architecture. This is a system that allows the clients eg. students and lecturers to send a request to the server, which will then process the request to return the data back to the client. The front end of the application will be built using Next.js, this will provide a user interface and page navigation, which allows students to access the system through pages containing events, calendars, reminders, helpdesk support and campus locations. The application uses mock data as well as a CSV file for user authentication. Serverless functions may be used to process actions such as submitting tickets and saving reminders. The frontend and backend of the application communicate using API routes, this is a request from a website to a server in order to send or receive data. User authentication will be essential to allow users to log in and get personalised recommendations such as upcoming events. The Campus Companion application will deploy with Netlify with git automatic deployment, this means when the website will automatically update when new code is pushed to the Git repository. This application architecture is scalable and simple to ensure the system will be able to handle many users and data without crashing.
- by Leah


## Data Design
This application is designed using a conceptual data model made up of a number of key entities. The main entities used in this project were: users, timetables, events, locations and accessibility information. A user, specifically students and professors in this case, has access to their own personal timetable. The system allows users to engage with multiple events at once. An event is strictly linked to one location, although each location can be linked to various pieces of accessibility information. Users can retrieve multiple events, locations and their own timetable data. Each entity is made up of a set of key attributes which stores essential information. A user has user ID, a name and a role eg. students or lecturers. A timetable has a module name, a time and room location. Events have an event ID, a name and also a location. Locations have a location ID, a name and a building ID. Lastly, for accessibility information there is a location, a description and an access ID. For privacy reasons, in the Campus Companion Application, no real data is stored. We limit this to fictional data as our project only requires basic data to function. No sensitive information such as phone numbers or location tracking was collected. Financial or private data is also not stored. 
- by Leah

## Usability and UI Decisions
The Campus Companion application was designed with usability as a priority to ensure the user has a straightforward experience. A navigation bar is included on each page, this provides intuitive navigation between the pages: timetable, events, map and accessibility. A consistent design is maintained across all of the pages, a neutral colour scheme was chosen as this colour imply simplicity which is important to users. These colours also provide a professional feel to the application. The application also uses the same font throughout and the same card layout, this improves visual consistency and reduces cognitive load. Interactive elements such as hover effects also help provide clear visual feedback. Accessibility was considered by designing a well organised interface using a consistent layout by including visual contrast, readable text and simple labels.
- by Leah

## Accessability Plan 

The Campus Companion application was designed with accessibility in mind to provide inclusivity. This was done by using many features such proper headings which helps those who use screen readers to understand the content. Clear labels on the search bar and forms provide descriptions for users that are easy to understand. Hover effects are used to highlight a user’s location on the page, this is extremely important for accessibility. As mentioned before, we used a blue and white theme to ensure visual contrast between the background and text. This was also considered to improve reading for visually impaired users. The font was also considered as simple fonts and font size provide legibility. Our images contained alt text to help screen readers describe images. These features ensures that the Campus Companion App is inclusive and accessible for all users.


- By Leah


## Privacy, Security & GDPR

### Privacy

The Campus Companion application handles sensitive academic information, including user schedules and module grades. To ensure full confidentiality of all campus users during the design and evaluation stages, the application uses exclusively fictional data (`campus_companion_students.csv`). The system does not process or store any actual student names, personal information, or location tracking data.

### Security
To protect user data from unauthorised access, the application implements a login system so students can login securely using their University Email and Student ID as credentials. Furthermore, sensitive pages, such as the personal Timetable, are secured using Protected Routes. If an unauthenticated user attempts to access these private views, the system automatically intercepts the request and redirects them to the login screen.

### GDPR Compliance
The application follows the main principles of the General Data Protection Regulation (GDPR):
 1. **Data Minimization: The system collects and processes only the minimum amount of data needed to provide its services, such as timetables and emails. It completely avoids all highly private information like home addresses or banking details from the dataset.
 2. **Purpose Limitation: Student data is used only for providing personalized campus recommendations and schedule tracking. It is never shared with the third parties.

- By Alia

## Deployment plan
The project on Campus Companion App was deployed using Netlify, connected through the Github repository. It was chosen to use Netlify because it manages well with the GitHub and handles the application we built, also making the process of getting the app online simple.

Every time a change is uploaded to GitHub, Netlify detects it which is automatically updates the live website. This means the URL site are always shows the most recent version of the app without anyone having manually upload one-by-one in files.

When processing the deployment project, one problem was encountered. After a team member pushed the login page to Github, the site failed to update. The error shows in Netlify’s build log and was caused by a small coding that is required that was missed in the login page. The challenges was fixed quickly and the website was restored very well.

Overall, Netlify was straightforward tool that allows us a team to keep our website clean and up to date through the project. 

The application is live and accessible at: campus-companion-app.netlify.app

- Allyssa
