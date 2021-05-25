# QCFirst Website
* Live website: https://qcfirst-ejs.bibihassan.repl.co

## Contributors
* Bibi Hassan & Navsangeet Kaur
* We both splitted the pages in half. We came togther before the day of the due date of the deliverables and helped each other out, and also discusses the changes and updates that are needed and evalutae each others work.
* Bibi Hassan: Created the homepage, student homepage, student search page, and admin page that display users, courses, and sessions as well as setting up the ejs framework (in both main directory and server.js), worked on the post methods: search class, query class, add class, and prof_roster.
* Navsangeet kaur: Created log in pages for both professor and student, sign up page, professor homepage and add course page, worked on post methods: sign up, log in's , session, sign out, delete course, add professor courses to the homepage as well as to the user model as array, and added functionalities for the admin page to display the enrolled and added courses collections.

## Features
 * Responsive Design for mobile, tablet, and desktop
 * Links to get more information about how to use the website 
 * Clear Navigation
 * Geographic information
 * Images

## Pupose of the Website
The website lets the students to view the classes that they are enrolled in and add more classes to their schedule.
It also lets the instructors view the classes that they are teaching, add more classes to their course management and they can also delete the courses.

## EJS code for the QCFirst Website
  * The following link is where our website is published https://bhassan6621.github.io/qcfirst/src/Index.html
  * There are 8 pages in total in our website:
  * First is homepage where we have the logo and it contains the log in button for the students that redirects the students to the student homepage, log in button for the professors that redirects the professors to the professor homepage, sign up button that will let the professors as well as students to sign up for the account. It also contains the links to the IT help desk and other helpful links as well as contact submission.
  * Sign Up page let the students and the professors to create an account if they don't have one.
  * The log in page for students let the students access their account and the information. When the log in button is clicked the students will be redirected to the students homepage.
  * The student page contains the table with the classes that students are already enrolled in and the one of the column contains info button which will show a pop window with the description about the course. It also consists the sign out button which will log out the user and redirect to the log in, and has add course button available on the same page that redirects the students to the search class page.
  * The search class page has the input where students can input the course they want to search with it's respective semester and will show the information in the table of that specific searched course on the same page. The table also contains a column where the student can click the box of specic section to select course section and then click the enroll button to add class.
  * The other log page for professors contains log in button that redirects the professor to the professor homepage that only instructors can access when it's clicked.
  * The professor homepage contains the table with the classes that professors are already decided to teach and one of the column contains delete button which will delete the course and remove it from the table. It also consists the sign out button which will log out the user and redirect to the log in, and has add course button available on the same page that redirects the professors to the add course page.
  * The add course page has the inputs where professor can input the course info that they want to show up on the student's search window search, and after entering the whole information they can click the add button and that course will show up on the professor courses teaching table that is on the professor homepage as well as in the students search table. 
  * We converted html files to the ejs framework to make it easier for displaying the data from backend to the front end.
  * After converting html to ejs, now we have the following ejs files: 
     * Index.ejs (main page)
     * Sign_up.ejs (sign up for an account here)
     * Login_professor.ejs (log in if you are an instructor)
     * Login_student.ejs (log in if you are a student)
     * Login_admin.ejs (log in for admin only)
     * professor_homepage.ejs (all the functionalities that are only used by professor-view table that you are teaching, important links, and link to add more classes, link to view roster for each course that you are teaching, and delete a course)
     * Add_course.ejs (add course here)
     * student_homepage.ejs (all the functionalities for students such as view courses that you are enrolled in, link to search more classes)
     * Student_seachClass.ejs (search for courses and enroll here)
     * Admin_page.ejs (view links for all the collections that are stored in teh database)
     * admin_user.ejs (view a collection of all users who created account for QCFirst)
     * admin_course.ejs (view a collection of all the added courses by the professors)
     * admin_prof_addedCourse.ejs (view collection of courses added by specific professors that they are teaching)
     * admin_session.ejs ( view a collection of all the sessions of users)
     * admin_user_courses.ejs (view a collection of courses that spcific students are enrolled in)
     * roster.ejs (view roster of course that you selected in the professor homepage)
     * sign_out.js (provide extra functionality)

## Backend

* We have worked on the user management functionalities. 
* We created the database that has users, sessions, courses models.
* Collections:
   * Users collection has all the users who signed up for an account and also has their user type: student, professor, and admin. 
   * Student and professor user types in user model has a courses as an array, for student it contains the courses that students enrolled in, and for professor courses array it contains the courses that a specific professor added. 
   * Courses collection has all the courses that are added by the professors.
   * The sessions model contains the cookies, session id, and expired date and time information.
   * Both instructor and student sign up information is in the same model. Then, the log in form match the provided email and password with the stored information and let the user log in or alert them if it fails. 
* Server.js files
   * We installed express, dotenv, ejs, path, bycrypt, mongoose, express-session, body-parser, mongodb, connect-mongo, session packages.
   * We used Mongodb to store backend information. 
   * For majority of of ejs files, we created post functions that render the page, store information in teh databse and send information back to the front-end page.
      * For students, the returned courses will come from the courses schema that we created.
      * Since a professor is responsible for creating a course, the course will be placed in the courses schema and also in the users schema as courses array so we can display the courses for specific professor in the table for professor homepage. 
      * Also, for both users, there are error messages that will be displayed to user, in case no courses are found in a specific schema.
   * We also created get functions that render the page and send information to the page, like the name of the user or a message.
   * Professor can delete the course from their hoempage by clicking teh radio button in specific row and then click the delete button.
   * Professor can also view roster for each session and course where all the students enrolled in his/her class are displayed that can be done by clicing the radio button corresponding to the course and then click roster button that will redirect them to the roster page.
   * For course search, whenever a student searches for a course, the search terms (Couse Name, Course Number, and Semester) will search the course schema and during the search, and display the course and all the section sof that course in the table inside Student_seachCourse.ejs
* We used replit to host our website and used mongodb atlas databse. 
* For front-end technologies, we used github, and bootstrap. 
* For backend, we used node, express, mongodb, mongoose, path, and body-parser.
* This is the live link to our replit: https://qcfirst-ejs.bibihassan.repl.co
* The link to view code and website: https://replit.com/@bibihassan/qcfirst-ejs#src/server.js
* Github Repo: https://github.com/bhassan6621/qcfirst
* The link to our package.json: https://github.com/bhassan6621/qcfirst/blob/main/package.json
* The link to our main server.js: https://github.com/bhassan6621/qcfirst/blob/main/src/server.js

## CSS styling for the QCFirst Website

* We have created style.css where the css styling for all the pages are included. The id's and classes are unique and distinguished from each other so the styling can be easier to implemented and don't clash with each other.
* After implementing the html nd css documents, we see that the website and the visual of the website are quite similar, we tried to implement all the features and content to the website that we put on the visuals. The only difference we see on our homepage, we wanted to provide more information however during implementation it looked so clustered and we had to remove few things in order to highlight the features. 

## Visuals of the QCFirst Website

The three visuals of website on desktop, tablet, and mobile respectively:
These UI's can also be found here: https://github.com/bhassan6621/qcfirst/tree/main/QCFirst_UI-UX

#### Desktop Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/Homepage.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SigninPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SignupPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/StudentHomepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SearchClass.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/PopupCourseDetails.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/TeacherHomepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/AddCoursePage.png" height="400" width="200"> </td>
  </tr>
</table>

#### Tablet Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/Homepage.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SigninPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SignupPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/StudentHomepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SearchClasses.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/classInfoPopUpScreen.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/TeacherHomepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/TeacherAddCoursePage.png" height="400" width="200"> </td>
  </tr>
</table>

#### Mobile Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/QC%20first%20Home%20page.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Sign%20Up%20page.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/log%20In%20page.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Student%20homepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Enrollemnt%20page-2.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Course%20info%20pop%20screen.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Professor%20Homepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Add%20course.png" height="400" width="200"> </td>
  </tr>
</table>



* We have qcFirst Homepage
* Sign up page to sign up for the account
* Log in page 
* Student homepage that is visible to teh student in a certain format
* Enrollment page where students can search for classes as well a table with the different sections of seached course appears
* Info page pops up when a student clicks on info that is in the enrollment table while choosing classes and also included in the table that students are already enrolled in 
* Professor homepage that is visible to professor with different format and features
* Add courses page is where an instructor can add courses for students to view
